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
            + "mh.id, m, m.category, mh.studentId, COALESCE(m2.name, ''), mh.description, mh.fileUrl, mh.status, mh.rejectReason, mh.count, mh.activatedAt, mh.createdAt) "
            + "FROM MilestoneHistory mh "
            + "LEFT JOIN mh.milestone m "
            + "LEFT JOIN StudentMember sm on sm.id = mh.studentId "
            + "LEFT JOIN sm.member m2 ")
    List<MilestoneHistoryWithStudentInfo> findAllMilestoneHistoriesWithStudentInfo();

    @Query("SELECT new sw_css.milestone.persistence.dto.MilestoneHistoryInfo("
            + "mh.id, mc, m, mh.description, mh.fileUrl, mh.status, mh.rejectReason, mh.count, mh.activatedAt, mh.createdAt) "
            + "FROM MilestoneCategory mc "
            + "LEFT JOIN Milestone m on m.category=mc "
            + "LEFT JOIN MilestoneHistory mh on mh.milestone=m AND mh.studentId=:studentId AND mh.activatedAt <= :endDate AND mh.activatedAt >= :startDate")
    List<MilestoneHistoryInfo> findAllMilestoneHistoriesInfoByStudentIdAndPeriod(final Long studentId,
                                                                                 final LocalDate startDate,
                                                                                 final LocalDate endDate);

    // GROUP BY로 최적화시킬 여지가 있음
    @Query("SELECT new sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo("
            + "mh.id, m, m.category, s2.studentId, s2.studentName, mh.description, mh.fileUrl, mh.status, mh.rejectReason, mh.count, mh.activatedAt, mh.createdAt) "
            + "FROM (SELECT DISTINCT(COALESCE(mh.studentId, sm.id)) as studentId, COALESCE(m.name,'') as studentName FROM StudentMember sm "
            + "LEFT JOIN MilestoneHistory mh on mh.studentId=sm.id "
            + "LEFT JOIN sm.member m "
            + "UNION "
            + "SELECT DISTINCT(COALESCE(mh.studentId, sm.id)) as studentId, COALESCE(m.name,'') as studentName FROM StudentMember sm "
            + "RIGHT JOIN MilestoneHistory mh on mh.studentId=sm.id "
            + "LEFT JOIN sm.member m ) s2 "
            + "CROSS JOIN Milestone m "
            + "LEFT JOIN MilestoneHistory mh on m=mh.milestone and mh.studentId=s2.studentId and mh.activatedAt <= :endDate AND mh.activatedAt >= :startDate")
    List<MilestoneHistoryWithStudentInfo> findAllMilestoneHistoriesWithStudentInfoByPeriod(final LocalDate startDate,
                                                                                           final LocalDate endDate);
}
