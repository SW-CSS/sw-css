package sw_css.hackathon.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.hackathon.domain.HackathonTeamVote;

public interface HackathonTeamVoteRepository  extends JpaRepository<HackathonTeamVote, Long> {
    Long countByHackathonIdAndTeamId(Long hackathonId, Long teamId);
}
