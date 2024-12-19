package sw_css.hackathon.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.hackathon.domain.HackathonTeamMember;

public interface HackathonTeamMemberRepository extends JpaRepository<HackathonTeamMember, Long> {
}
