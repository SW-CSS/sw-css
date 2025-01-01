package sw_css.hackathon.domain.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.hackathon.domain.HackathonTeamVote;

public interface HackathonTeamVoteRepository  extends JpaRepository<HackathonTeamVote, Long> {
    Long countByHackathonIdAndTeamId(Long hackathonId, Long teamId);

    boolean existsByHackathonIdAndTeamIdAndMemberId(Long hackathonId, Long teamId, Long memberId);

    Optional<HackathonTeamVote> findByHackathonIdAndTeamIdAndMemberId(Long hackathonId, Long teamId, Long memberId);
}
