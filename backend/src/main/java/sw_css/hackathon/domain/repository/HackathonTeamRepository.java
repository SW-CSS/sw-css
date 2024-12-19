package sw_css.hackathon.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.hackathon.domain.HackathonTeam;

public interface HackathonTeamRepository extends JpaRepository<HackathonTeam, Long> {
}
