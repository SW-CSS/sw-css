package sw_css.milestone.domain.repository;

import java.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.domain.MilestoneHistorySortCriteria;
import sw_css.milestone.domain.MilestoneStatus;

public interface MilestoneHistoryCustomRepository {
    Page<MilestoneHistory> findMilestoneHistoriesByStudentId(final Long studentId,
                                                             @Nullable final LocalDate startDate,
                                                             @Nullable final LocalDate endDate,
                                                             @Nullable final MilestoneStatus filter,
                                                             @Nullable final MilestoneHistorySortCriteria sortBy,
                                                             @Nullable final Sort.Direction sortDirection,
                                                             final Pageable pageable);
}
