package sw_css.hackathon.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.hackathon.domain.Hackathon;

public interface HackathonRepository  extends JpaRepository<Hackathon, Long>{
}
