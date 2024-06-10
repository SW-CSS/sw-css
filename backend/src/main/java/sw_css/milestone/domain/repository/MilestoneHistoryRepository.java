package sw_css.milestone.domain.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo;

public interface MilestoneHistoryRepository extends JpaRepository<MilestoneHistory, Long> {
    List<MilestoneHistory> findMilestoneHistoriesByStudentId(final Long studentId);

    @Query("SELECT new sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo("
            + "mh.id, m, mh.studentId, COALESCE(m2.name, ''), mh.description, mh.fileUrl, mh.status, mh.rejectReason, mh.count, mh.activatedAt, mh.createdAt) "
            + "FROM MilestoneHistory mh "
            + "JOIN mh.milestone m "
            + "LEFT JOIN StudentMember sm on sm.id = mh.studentId "
            + "LEFT JOIN sm.member m2")
    List<MilestoneHistoryWithStudentInfo> findAllMilestoneHistoriesWithStudentInfo();
}
