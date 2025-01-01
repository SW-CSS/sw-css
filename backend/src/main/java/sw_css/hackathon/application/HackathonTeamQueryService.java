package sw_css.hackathon.application;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.hackathon.application.dto.response.HackathonTeamResponse;
import sw_css.hackathon.application.dto.response.HackathonTeamResponse.HackathonTeamMemberResponse;
import sw_css.hackathon.domain.HackathonRole;
import sw_css.hackathon.domain.HackathonTeam;
import sw_css.hackathon.domain.HackathonTeamMember;
import sw_css.hackathon.domain.HackathonTeamWithVote;
import sw_css.hackathon.domain.repository.HackathonRepository;
import sw_css.hackathon.domain.repository.HackathonTeamMemberRepository;
import sw_css.hackathon.domain.repository.HackathonTeamRepository;
import sw_css.hackathon.domain.repository.HackathonTeamVoteRepository;
import sw_css.hackathon.exception.HackathonException;
import sw_css.hackathon.exception.HackathonExceptionType;
import sw_css.member.domain.StudentMember;
import sw_css.member.domain.repository.StudentMemberRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HackathonTeamQueryService {

    private final HackathonTeamRepository hackathonTeamRepository;
    private final HackathonRepository hackathonRepository;
    private final HackathonTeamMemberRepository hackathonTeamMemberRepository;
    private final StudentMemberRepository studentMemberRepository;
    private final HackathonTeamVoteRepository hackathonTeamVoteRepository;

    public Page<HackathonTeamResponse> findAllHackathonTeam(final Pageable pageable, final Long hackathonId) {
        validateHackathonId(hackathonId);

        Page<HackathonTeamWithVote> teams = hackathonTeamRepository.findByHackathonIdWithPageable(hackathonId, pageable);

        List<HackathonTeamResponse> teamResponses = teams.getContent().stream().map(
                this::convertHackathonTeamToHackathonTeamResponse).toList();

        return new PageImpl<>(teamResponses, teams.getPageable(), teams.getTotalElements());
    }

    public HackathonTeamResponse findHackathonTeam(final Long hackathonId, final Long teamId) {
        validateHackathonId(hackathonId);

        HackathonTeam team = hackathonTeamRepository.findByHackathonIdAndId(hackathonId, teamId).orElseThrow(() -> new HackathonException(HackathonExceptionType.NOT_FOUND_HACKATHON_TEAM));
        final Long vote = hackathonTeamVoteRepository.countByHackathonIdAndTeamId(hackathonId, teamId);

        return convertHackathonTeamToHackathonTeamResponse(HackathonTeamWithVote.of(team, vote));
    }

    private void validateHackathonId(final Long hackathonId) {
        hackathonRepository.findById(hackathonId).orElseThrow(() -> new HackathonException(HackathonExceptionType.NOT_FOUND_HACKATHON));
    }

    private HackathonTeamResponse convertHackathonTeamToHackathonTeamResponse(HackathonTeamWithVote team) {
        List<HackathonTeamMemberResponse> developers = findTeamMemberByRole(team.hackathonId(), team.id(), HackathonRole.DEVELOPER.toString());
        List<HackathonTeamMemberResponse> designers = findTeamMemberByRole(team.hackathonId(), team.id(), HackathonRole.DESIGNER.toString());
        List<HackathonTeamMemberResponse> planners = findTeamMemberByRole(team.hackathonId(), team.id(), HackathonRole.PLANNER.toString());
        List<HackathonTeamMemberResponse> others = findTeamMemberByRole(team.hackathonId(), team.id(), HackathonRole.OTHER.toString());

        Map<String, List<HackathonTeamMemberResponse>> members = new HashMap<>();
        members.put(HackathonRole.DEVELOPER.toString(), developers);
        members.put(HackathonRole.DESIGNER.toString(), designers);
        members.put(HackathonRole.PLANNER.toString(), planners);
        members.put(HackathonRole.OTHER.toString(), others);

        return HackathonTeamResponse.of(team, members);
    }

    private List<HackathonTeamMemberResponse> findTeamMemberByRole(Long hackathonId, Long teamId, String role){
        List<HackathonTeamMember> teamMember = hackathonTeamMemberRepository.findAllByHackathonIdAndTeamIdAndRole(hackathonId, teamId, role);
        return teamMember.stream().map(this::convertHackathonTeamMemberToHackathonTeamMemberResponse).toList();
    }

    private HackathonTeamMemberResponse convertHackathonTeamMemberToHackathonTeamMemberResponse(HackathonTeamMember teamMember) {
        StudentMember member = studentMemberRepository.findById(teamMember.getStudentId()).orElse(null);
        if(member == null) return new HackathonTeamMemberResponse(teamMember.getStudentId(), "", "", teamMember.getIsLeader());
        return new HackathonTeamMemberResponse(member.getId(), member.getMember().getName(), member.getMajor().getName(), teamMember.getIsLeader());
    }
}
