package sw_css.milestone.domain.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.member.domain.StudentMember;
import sw_css.milestone.domain.MilestoneHistory;

public interface MilestoneHistoryRepository extends JpaRepository<MilestoneHistory, Long> {
    List<MilestoneHistory> findMilestoneHistoriesByStudent(final StudentMember studentMember);
}
