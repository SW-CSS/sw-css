package sw_css.hackathon.application;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import sw_css.admin.hackathon.exception.AdminHackathonException;
import sw_css.admin.hackathon.exception.AdminHackathonExceptionType;
import sw_css.hackathon.application.dto.request.HackathonTeamRequest;
import sw_css.hackathon.application.dto.request.HackathonTeamRequest.HackathonTeamMemberRequest;
import sw_css.hackathon.domain.Hackathon;
import sw_css.hackathon.domain.HackathonRole;
import sw_css.hackathon.domain.HackathonTeam;
import sw_css.hackathon.domain.HackathonTeamMember;
import sw_css.hackathon.domain.repository.HackathonRepository;
import sw_css.hackathon.domain.repository.HackathonTeamMemberRepository;
import sw_css.hackathon.domain.repository.HackathonTeamRepository;
import sw_css.hackathon.exception.HackathonException;
import sw_css.hackathon.exception.HackathonExceptionType;
import sw_css.member.domain.Member;
import sw_css.member.domain.StudentMember;
import sw_css.member.domain.embedded.StudentId;
import sw_css.member.domain.repository.StudentMemberRepository;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;

@Service
@RequiredArgsConstructor
@Transactional
public class HackathonTeamCommandService {

    private final HackathonRepository hackathonRepository;
    private final HackathonTeamRepository hackathonTeamRepository;
    private final HackathonTeamMemberRepository hackathonTeamMemberRepository;
    private final StudentMemberRepository studentMemberRepository;

    @Value("${data.file-path-prefix}")
    private String filePathPrefix;

    public Long registerHackathonTeam(final Member me, final Long hackathonId, final MultipartFile file, final HackathonTeamRequest request) {
        validateFileType(file);
        Hackathon hackathon = hackathonRepository.findById(hackathonId).orElseThrow(() -> new HackathonException(
                HackathonExceptionType.NOT_FOUND_HACKATHON));

        final String newFilePath = generateFilePath(file);
        final HackathonTeam team = new HackathonTeam(hackathon, request.name(), request.work(), request.githubUrl(), newFilePath, me);

        final HackathonTeam newTeam = hackathonTeamRepository.save(team);
        uploadFile(file, newFilePath);

        validateAllHackathonTeamMember(me, request.leader(), request.members());

        HackathonTeamMember leader = new HackathonTeamMember(hackathon, newTeam, request.leader().id(), request.leader().role(), true);
        hackathonTeamMemberRepository.save(leader);

        request.members().forEach(member -> {
            HackathonTeamMember newMember = new HackathonTeamMember(hackathon, newTeam, member.id(), member.role(), false);
            hackathonTeamMemberRepository.save(newMember);
        });

        return newTeam.getId();
    }

    public void updateHackathonTeam(final Member me, final Long hackathonId, final Long teamId, final HackathonTeamRequest request) {
        final Hackathon hackathon = hackathonRepository.findById(hackathonId).orElseThrow(
                () -> new AdminHackathonException(AdminHackathonExceptionType.NOT_FOUND_HACKATHON));
        final HackathonTeam team = hackathonTeamRepository.findByHackathonIdAndId(hackathonId, teamId).orElseThrow(
                () -> new AdminHackathonException(AdminHackathonExceptionType.NOT_FOUND_HACKATHON_TEAM));

        validateTeamUpdater(me, team);

        team.setName(request.name());
        team.setWork(request.work());
        team.setGithubUrl(request.githubUrl());

        hackathonTeamRepository.save(team);

        validateAllHackathonTeamMember(me, request.leader(), request.members());

        // 리더가 변경되었는지 확인 및 갱신
        final HackathonTeamMember leader = hackathonTeamMemberRepository.findAllByHackathonIdAndTeamIdAndIsLeaderTrue(hackathonId, teamId);
        checkLeaderAndUpdate(leader, request.leader(), hackathon, team);


        final List<HackathonTeamMember> originMembers = hackathonTeamMemberRepository.findAllByHackathonIdAndTeamIdAndIsLeaderFalseOrderByStudentIdAsc(hackathonId, teamId);
        final List<HackathonTeamMemberRequest> newMembers = request.members();

        boolean found = false;
        // 기존에 존재하던 팀원인지 확인
        for (HackathonTeamMember originMember : originMembers) {
            Iterator<HackathonTeamMemberRequest> iterator = newMembers.iterator();
            while (iterator.hasNext()) {
                HackathonTeamMemberRequest newMember = iterator.next();
                if ( !originMember.getStudentId().equals(newMember.id()) ) continue;

                checkMemberAndUpdate(originMember, newMember);
                // 변경 확인이 끝난 팀원이므로 배열에서 삭제
                found = true; iterator.remove();
                break;
            }

            // 새로운 팀원에 존재하지 않으므로, 삭제된 팀원임.
            if( !found ) {
                originMember.delete();
                hackathonTeamMemberRepository.save(originMember);
            }
            found = false;
        }

        // 삭제되지 않은 회원은 추가되어야할 팀원들임.
        for (HackathonTeamMemberRequest member : newMembers) {
            HackathonTeamMember newMember = new HackathonTeamMember(hackathon, team, member.id(), member.role());
            hackathonTeamMemberRepository.save(newMember);
        }
    }

    private void checkLeaderAndUpdate(HackathonTeamMember originLeader, HackathonTeamMemberRequest leader, Hackathon hackathon, HackathonTeam team) {
        if ( !originLeader.getStudentId().equals(leader.id()) ) {
            originLeader.delete();
            HackathonTeamMember newLeader = new HackathonTeamMember(hackathon, team, leader.id(), leader.role(), true);
            hackathonTeamMemberRepository.save(originLeader);
            hackathonTeamMemberRepository.save(newLeader);
        } else if ( !originLeader.getRole().equals(leader.role()) ) {
            originLeader.setRole(leader.role());
            hackathonTeamMemberRepository.save(originLeader);
        }
    }

    private void checkMemberAndUpdate(HackathonTeamMember originMember, HackathonTeamMemberRequest member) {
        if ( !originMember.getRole().equals(member.role()) ) {
            originMember.setRole(member.role());
            hackathonTeamMemberRepository.save(originMember);
        }
    }

    private void validateTeamUpdater(final Member me, final HackathonTeam team){
        if( !team.getCreatedBy().getId().equals(me.getId()) )
            throw new HackathonException(HackathonExceptionType.INVALID_TEAM_UPDATER);
    }

    private void validateAllHackathonTeamMember(Member me, HackathonTeamMemberRequest leader, List<HackathonTeamMemberRequest> members) {
        StudentMember student = studentMemberRepository.findByMemberId(me.getId()).orElseThrow(() -> new HackathonException(HackathonExceptionType.INVALID_TEAM_UPDATER));

        Set<Long> uniqueIds = new HashSet<>();

        uniqueIds.add(leader.id());
        validateHackathonTeamMember(leader);

        members.forEach(member -> {
            validateHackathonTeamMember(member);
            if( !uniqueIds.add(member.id()) ) throw new HackathonException(HackathonExceptionType.INVALID_TEAM_MEMBER);
        });

        if(student != null && !uniqueIds.contains(student.getId())) {
            throw new HackathonException(HackathonExceptionType.INVALID_TEAM_CREATOR);
        }
    }

    private void validateHackathonTeamMember(HackathonTeamMemberRequest teamMember) {
        validateHackathonTeamMemberId(teamMember.id());
        validateHackathonTeamMemberRole(teamMember.role());
    }

    private void validateHackathonTeamMemberId(Long studentId){
        if ( !studentId.toString().matches(StudentId.STUDENT_ID_REGEX) )
            throw new HackathonException(HackathonExceptionType.INVALID_STUDENT_ID);
    }

    private void validateHackathonTeamMemberRole(String role){
        try {
            HackathonRole.valueOf(role);
        } catch (IllegalArgumentException e) {
            throw new AdminHackathonException(AdminHackathonExceptionType.INVALID_ROLE_STATUS);
        }
    }

    private void validateFileType(final MultipartFile file) {
        if (file == null) {
            throw new AdminHackathonException(AdminHackathonExceptionType.NOT_EXIST_FILE);
        }
        final String contentType = file.getContentType();
        if (!isSupportedContentType(contentType)) {
            throw new AdminHackathonException(AdminHackathonExceptionType.UNSUPPORTED_FILE_TYPE);
        }
    }

    private boolean isSupportedContentType(final String contentType) {
        return contentType != null && (
                contentType.equals("image/png") ||
                        contentType.equals("image/jpeg") ||
                        contentType.equals("image/jpg")
        );
    }

    private String generateFilePath(final MultipartFile file) {
        if (file == null) {
            return null;
        }
        return UUID.randomUUID() + "_" + file.getOriginalFilename().replaceAll("\\[|\\]", "");
    }

    private void uploadFile(final MultipartFile file, final String newFilePath) {
        if (file == null) {
            return;
        }
        final Path filePath = Paths.get(System.getProperty("user.dir") + filePathPrefix)
                .resolve(Paths.get(newFilePath)).normalize().toAbsolutePath();
        try (final InputStream inputStream = file.getInputStream()) {
            if (Files.notExists(filePath.getParent())) {
                Files.createDirectories(filePath.getParent());
            }
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (final IOException e) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.CANNOT_OPEN_FILE);
        }
    }
}
