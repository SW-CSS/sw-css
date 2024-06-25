package sw_css.milestone.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.milestone.domain.MilestoneCategory;

public interface MilestoneCategoryRepository extends JpaRepository<MilestoneCategory, Long> {
}
