package sw_css.milestone.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.milestone.domain.MilestoneHistory;

public interface MilestoneHistoryRepository extends JpaRepository<MilestoneHistory, Long> {
}
