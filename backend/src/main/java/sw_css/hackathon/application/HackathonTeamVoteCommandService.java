package sw_css.hackathon.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.hackathon.domain.Hackathon;
import sw_css.hackathon.domain.HackathonTeam;
import sw_css.hackathon.domain.HackathonTeamVote;
import sw_css.hackathon.domain.repository.HackathonRepository;
import sw_css.hackathon.domain.repository.HackathonTeamRepository;
import sw_css.hackathon.domain.repository.HackathonTeamVoteRepository;
import sw_css.hackathon.exception.HackathonException;
import sw_css.hackathon.exception.HackathonExceptionType;

import sw_css.member.domain.Member;

@Service
@RequiredArgsConstructor
@Transactional
public class HackathonTeamVoteCommandService {

    private final HackathonTeamVoteRepository hackathonTeamVoteRepository;
    private final HackathonRepository hackathonRepository;
    private final HackathonTeamRepository hackathonTeamRepository;

    public void registerHackathonTeamVote(final Member me, final Long hackathonId, final Long teamId) {
        final Hackathon hackathon = hackathonRepository.findById(hackathonId).orElseThrow(
                () -> new HackathonException(HackathonExceptionType.NOT_FOUND_HACKATHON));
        final HackathonTeam team = hackathonTeamRepository.findByHackathonIdAndId(hackathonId, teamId).orElseThrow(
                () -> new HackathonException(HackathonExceptionType.NOT_FOUND_HACKATHON_TEAM));

        boolean voted = hackathonTeamVoteRepository.existsByHackathonIdAndTeamIdAndMemberId(hackathonId, teamId, me.getId());
        if ( !voted ) {
            HackathonTeamVote vote = new HackathonTeamVote(hackathon, team, me);
            hackathonTeamVoteRepository.save(vote);
        } else {
            throw new HackathonException(HackathonExceptionType.CANNOT_DUPLICATE_VOTE);
        }
    }

    public void deleteHackathonTeamVote(final Member me, final Long hackathonId, final Long teamId) {
        final Hackathon hackathon = hackathonRepository.findById(hackathonId).orElseThrow(
                () -> new HackathonException(HackathonExceptionType.NOT_FOUND_HACKATHON));
        final HackathonTeam team = hackathonTeamRepository.findByHackathonIdAndId(hackathonId, teamId).orElseThrow(
                () -> new HackathonException(HackathonExceptionType.NOT_FOUND_HACKATHON_TEAM));

        HackathonTeamVote vote = hackathonTeamVoteRepository.findByHackathonIdAndTeamIdAndMemberId(hackathonId, teamId, me.getId()).orElse(null);
        if ( vote != null ) {
            vote.delete();
            hackathonTeamVoteRepository.save(vote);
        }

    }
}
