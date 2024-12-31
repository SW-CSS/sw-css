package sw_css.hackathon.domain.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.hackathon.domain.HackathonTeamMember;

public interface HackathonTeamMemberRepository extends JpaRepository<HackathonTeamMember, Long> {
    List<HackathonTeamMember> findAllByHackathonIdAndTeamIdAndIsLeaderFalseOrderByStudentIdAsc(Long hackathonId, Long teamId);

    HackathonTeamMember findAllByHackathonIdAndTeamIdAndIsLeaderTrue(Long hackathonId, Long teamId);

    Long countByHackathonIdAndTeamId(Long hackathonId, Long teamId);
}
