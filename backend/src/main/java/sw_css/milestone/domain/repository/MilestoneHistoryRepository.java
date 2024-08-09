package sw_css.milestone.domain.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.persistence.dto.MilestoneHistoryInfo;
import sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo;

public interface MilestoneHistoryRepository extends JpaRepository<MilestoneHistory, Long> {
    @Query("SELECT new sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo("
            + "mh.id, m, m.category, mh.studentId, COALESCE(m2.name, ''), mh.description, mh.fileUrl, mh.status, mh.rejectReason, mh.count, mh.activatedAt, mh.createdAt) "
            + "FROM MilestoneHistory mh "
            + "LEFT JOIN mh.milestone m "
            + "LEFT JOIN StudentMember sm on sm.id = mh.studentId "
            + "LEFT JOIN sm.member m2 "
            + "WHERE mh.isDeleted=false AND mh.id=:historyId")
    Optional<MilestoneHistoryWithStudentInfo> findMilestoneHistoriesWithStudentInfoById(final Long historyId);

    @Query("SELECT new sw_css.milestone.persistence.dto.MilestoneHistoryInfo("
            + "mh.id, mc, m, mh.description, mh.fileUrl, mh.status, mh.rejectReason, mh.count, mh.activatedAt, mh.createdAt) "
            + "FROM MilestoneCategory mc "
            + "LEFT JOIN Milestone m on m.category=mc "
            + "LEFT JOIN MilestoneHistory mh on mh.milestone=m AND mh.studentId=:studentId AND mh.activatedAt <= :endDate AND mh.activatedAt >= :startDate AND mh.status = 'APPROVED' AND mh.isDeleted=false")
    List<MilestoneHistoryInfo> findAllMilestoneHistoriesInfoByStudentIdAndPeriod(final Long studentId,
                                                                                 final LocalDate startDate,
                                                                                 final LocalDate endDate);
}
