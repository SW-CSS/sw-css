package sw_css.admin.hackathon.application;


import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
import sw_css.member.domain.embedded.StudentId;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminHackathonTeamCommandService {
    private final HackathonRepository hackathonRepository;
    private final HackathonTeamRepository hackathonTeamRepository;
    private final HackathonTeamMemberRepository hackathonTeamMemberRepository;

    public void updateHackathonTeam(Long hackathonId, Long teamId, HackathonTeamRequest request) {
        final Hackathon hackathon = hackathonRepository.findById(hackathonId).orElseThrow(
                () -> new AdminHackathonException(AdminHackathonExceptionType.NOT_FOUND_HACKATHON));
        final HackathonTeam hackathonTeam = hackathonTeamRepository.findByHackathonIdAndId(hackathonId, teamId).orElseThrow(
                () -> new AdminHackathonException(AdminHackathonExceptionType.NOT_FOUND_HACKATHON_TEAM));

        hackathonTeam.setName(request.name());
        hackathonTeam.setWork(request.work());
        hackathonTeam.setGithubUrl(request.githubUrl());

        hackathonTeamRepository.save(hackathonTeam);

        final HackathonTeamMember teamLeader = hackathonTeamMemberRepository.findAllByHackathonIdAndTeamIdAndIsLeaderTrue(hackathonId, teamId);
        final List<HackathonTeamMember> teamMembers = hackathonTeamMemberRepository.findAllByHackathonIdAndTeamIdAndIsLeaderFalseOrderByStudentIdAsc(hackathonId, teamId);

        final HackathonTeamMemberRequest leader = request.leader();
        final List<HackathonTeamMemberRequest> members = request.members().stream()
                .sorted(Comparator.comparingLong(HackathonTeamRequest.HackathonTeamMemberRequest::id))
                .toList();

        checkLeaderAndUpdate(teamLeader, leader, hackathon, hackathonTeam);

        for (HackathonTeamMember originMember : teamMembers) {
            boolean found = false;

            Iterator<HackathonTeamMemberRequest> iterator = members.iterator();
            while (iterator.hasNext()) {
                HackathonTeamMemberRequest member = iterator.next();

                if ( !originMember.getStudentId().equals(member.id()) ) continue;

                checkMemberAndUpdate(originMember, member);
                found = true;
                break;
            }

            if( found ) iterator.remove();
            else {
                originMember.setIsDeleted(true);
                hackathonTeamMemberRepository.save(originMember);
            }
        }

        for (HackathonTeamMemberRequest member : members) {
            validateTeamMember(member);
            HackathonTeamMember newMember = new HackathonTeamMember(hackathon, hackathonTeam, member.id(), member.role());
            hackathonTeamMemberRepository.save(newMember);
        }
    }

    public void deleteHackathonTeam(Long hackathonId, Long teamId) {
        hackathonRepository.findById(hackathonId).orElseThrow(
                () -> new AdminHackathonException(AdminHackathonExceptionType.NOT_FOUND_HACKATHON));
        final HackathonTeam hackathonTeam = hackathonTeamRepository.findByHackathonIdAndId(hackathonId, teamId).orElseThrow(
                () -> new AdminHackathonException(AdminHackathonExceptionType.NOT_FOUND_HACKATHON_TEAM));

        hackathonTeam.delete();
        hackathonTeamRepository.save(hackathonTeam);
    }

    private void checkMemberAndUpdate(HackathonTeamMember originMember, HackathonTeamMemberRequest member) {
        validateTeamMember(member);
        if ( !originMember.getRole().equals(member.role()) ) {
            originMember.setRole(member.role());
            hackathonTeamMemberRepository.save(originMember);
        }
    }

    private void checkLeaderAndUpdate(HackathonTeamMember originLeader, HackathonTeamMemberRequest leader, Hackathon hackathon, HackathonTeam team) {
        validateTeamMember(leader);
        if ( !originLeader.getStudentId().equals(leader.id()) ) {
            originLeader.setIsDeleted(true);
            HackathonTeamMember newLeader = new HackathonTeamMember(hackathon, team, leader.id(), leader.role(), true);
            hackathonTeamMemberRepository.save(originLeader);
            hackathonTeamMemberRepository.save(newLeader);
        } else if ( !originLeader.getRole().equals(leader.role()) ) {
            originLeader.setRole(leader.role());
            hackathonTeamMemberRepository.save(originLeader);
        }
    }

    private void validateTeamMember(HackathonTeamMemberRequest teamMember) {
        validateStudentId(teamMember.id());
        validateRole(teamMember.role());
    }

    private void validateRole(String role){
        try {
            HackathonRole.valueOf(role);
        } catch (IllegalArgumentException e) {
            throw new AdminHackathonException(AdminHackathonExceptionType.INVALID_ROLE_STATUS);
        }
    }

    private void validateStudentId(Long studentId){
        if ( !studentId.toString().matches(StudentId.STUDENT_ID_REGEX) )
            throw new AdminHackathonException(AdminHackathonExceptionType.INVALID_STUDENT_ID);
    }

}
