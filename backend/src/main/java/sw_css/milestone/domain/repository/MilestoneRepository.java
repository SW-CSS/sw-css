package sw_css.milestone.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.milestone.domain.Milestone;

public interface MilestoneRepository extends JpaRepository<Milestone, Long> {

}
