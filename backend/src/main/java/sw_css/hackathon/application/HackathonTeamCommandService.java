package sw_css.hackathon.application;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
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
import sw_css.member.domain.embedded.StudentId;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;

@Service
@RequiredArgsConstructor
@Transactional
public class HackathonTeamCommandService {

    private final HackathonRepository hackathonRepository;
    private final HackathonTeamRepository hackathonTeamRepository;
    private final HackathonTeamMemberRepository hackathonTeamMemberRepository;
    @Value("${data.file-path-prefix}")
    private String filePathPrefix;

    public Long registerHackathonTeam(final Long hackathonId, final MultipartFile file, final HackathonTeamRequest request) {
        validateFileType(file);
        Hackathon hackathon = hackathonRepository.findById(hackathonId).orElseThrow(() -> new HackathonException(
                HackathonExceptionType.NOT_FOUND_HACKATHON));

        final String newFilePath = generateFilePath(file);
        final HackathonTeam team = new HackathonTeam(hackathon, request.name(), request.work(), request.githubUrl(), newFilePath);

        final HackathonTeam newTeam = hackathonTeamRepository.save(team);
        uploadFile(file, newFilePath);

        validateAllHackathonTeamMember(request.leader(), request.members());

        HackathonTeamMember leader = new HackathonTeamMember(hackathon, newTeam, request.leader().id(), request.leader().role(), true);
        hackathonTeamMemberRepository.save(leader);

        request.members().forEach(member -> {
            HackathonTeamMember newMember = new HackathonTeamMember(hackathon, newTeam, member.id(), member.role(), false);
            hackathonTeamMemberRepository.save(newMember);
        });

        return newTeam.getId();
    }

    private void validateAllHackathonTeamMember(HackathonTeamMemberRequest leader, List<HackathonTeamMemberRequest> members) {
        Set<Long> uniqueIds = new HashSet<>();

        uniqueIds.add(leader.id());
        validateHackathonTeamMember(leader);

        members.forEach(member -> {
            validateHackathonTeamMember(member);
            if( !uniqueIds.add(member.id()) ) throw new HackathonException(HackathonExceptionType.INVALID_TEAM_MEMBER);
        });
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
