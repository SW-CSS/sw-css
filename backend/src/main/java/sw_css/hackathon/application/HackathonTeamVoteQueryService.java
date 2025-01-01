package sw_css.hackathon.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.hackathon.application.dto.response.HackathonTeamVoteResponse;
import sw_css.hackathon.domain.repository.HackathonRepository;
import sw_css.hackathon.domain.repository.HackathonTeamRepository;
import sw_css.hackathon.domain.repository.HackathonTeamVoteRepository;
import sw_css.hackathon.exception.HackathonException;
import sw_css.hackathon.exception.HackathonExceptionType;
import sw_css.member.domain.Member;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HackathonTeamVoteQueryService {

    private final HackathonRepository hackathonRepository;
    private final HackathonTeamRepository hackathonTeamRepository;
    private final HackathonTeamVoteRepository hackathonTeamVoteRepository;

    public HackathonTeamVoteResponse findHackathonTeamVote(final Member me, final Long hackathonId, final Long teamId) {
        validateHackathonIdAndTeamId(hackathonId, teamId);

        boolean voted = hackathonTeamVoteRepository.existsByHackathonIdAndTeamIdAndMemberId(hackathonId, teamId, me.getId());

        return new HackathonTeamVoteResponse(voted);
    }

    private void validateHackathonIdAndTeamId(final Long hackathonId, final Long teamId) {
        hackathonRepository.findById(hackathonId).orElseThrow(
                () -> new HackathonException(HackathonExceptionType.NOT_FOUND_HACKATHON));
        hackathonTeamRepository.findByHackathonIdAndId(hackathonId, teamId).orElseThrow(
                () -> new HackathonException(HackathonExceptionType.NOT_FOUND_HACKATHON_TEAM));
    }
}
