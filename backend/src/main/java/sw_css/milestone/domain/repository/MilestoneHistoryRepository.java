package sw_css.milestone.domain.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.persistence.dto.MilestoneHistoryInfo;
import sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo;

public interface MilestoneHistoryRepository extends JpaRepository<MilestoneHistory, Long> {
    List<MilestoneHistory> findMilestoneHistoriesByStudentId(final Long studentId);

    @Query("SELECT new sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo("
            + "mh.id, m, m.category, sm, mh.description, mh.fileUrl, mh.status, mh.rejectReason, mh.count, mh.activatedAt, mh.createdAt) "
            + "FROM MilestoneHistory mh "
            + "JOIN mh.milestone m "
            + "LEFT JOIN StudentMember sm on sm.id = mh.studentId")
    List<MilestoneHistoryWithStudentInfo> findAllMilestoneHistoriesWithStudentInfo();

    @Query("SELECT new sw_css.milestone.persistence.dto.MilestoneHistoryInfo("
            + "mh.id, mc, m, mh.description, mh.fileUrl, mh.status, mh.rejectReason, mh.count, mh.activatedAt, mh.createdAt) "
            + "FROM MilestoneCategory mc "
            + "LEFT JOIN Milestone m on m.category=mc "
            + "LEFT JOIN MilestoneHistory mh on mh.milestone=m AND mh.studentId=:studentId AND mh.activatedAt <= :endDate AND mh.activatedAt >= :startDate")
    List<MilestoneHistoryInfo> findAllMilestoneHistoriesInfoByStudentIdAndPeriod(final Long studentId,
                                                                                 final LocalDate startDate,
                                                                                 final LocalDate endDate);

    @Query("SELECT new sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo("
            + "mh.id, m, mc, sm, mh.description, mh.fileUrl, mh.status, mh.rejectReason, mh.count, mh.activatedAt, mh.createdAt) "
            + "FROM MilestoneCategory mc "
            + "LEFT JOIN Milestone m on m.category=mc "
            + "LEFT JOIN MilestoneHistory mh on mh.milestone=m "
            + "LEFT JOIN StudentMember sm on sm.id=mh.studentId AND mh.activatedAt <= :endDate AND mh.activatedAt >= :startDate")
    List<MilestoneHistoryWithStudentInfo> findAllMilestoneHistoriesWithStudentInfoByPeriod(final LocalDate startDate,
                                                                                           final LocalDate endDate);
}
