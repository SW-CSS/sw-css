package sw_css.milestone.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import sw_css.admin.milestone.persistence.StudentAndMilestoneScoreInfo;
import sw_css.milestone.domain.repository.MilestoneScoreRepository;

@Repository
public class MilestoneScoreRepositoryImpl implements MilestoneScoreRepository {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<StudentAndMilestoneScoreInfo> findAllMilestoneScoresWithStudentInfoByPeriod(LocalDate startDate,
                                                                                            LocalDate endDate,
                                                                                            Long page, Long pageSize) {

        String sql =
                "select  test.studentId, test.studentName, test.category_id as categoryId, test.name as categoryName ,test.milestone_group as milestoneGroup, ifNull(least(if(sum(test.limit_count)=0,max(test.milestone_score),sum(test.milestone_score)),test.limit_score),0) as score from "
                        + "    (SELECT s2.studentId, s2.studentName,mc.limit_score,m.category_id,mc.name,mc.milestone_group, m.limit_count,m.score,least(sum(mh.count), greatest(m.limit_count,1)), least(sum(mh.count), greatest(m.limit_count,1))*m.score as milestone_score "
                        + "FROM (SELECT DISTINCT(COALESCE(mh.student_id, sm.id)) as studentId, COALESCE(m.name,'') as studentName FROM student_member sm "
                        + "LEFT JOIN milestone_history mh on mh.student_id=sm.id "
                        + "LEFT JOIN member m on sm.member_id=m.id "
                        + "UNION "
                        + "SELECT DISTINCT(COALESCE(mh.student_id, sm.id)) as studentId, COALESCE(m.name,'') as studentName FROM student_member sm "
                        + "RIGHT JOIN milestone_history mh on mh.student_id=sm.id "
                        + "LEFT JOIN member m on sm.member_id=m.id ) s2 "
                        + "CROSS JOIN milestone m "
                        + "LEFT JOIN milestone_category mc on m.category_id=mc.id "
                        + "LEFT JOIN milestone_history mh on m.id=mh.milestone_id and mh.student_id=s2.studentId and mh.activated_at <= :endDate AND mh.activated_at >= :startDate AND mh.is_deleted=false AND mh.status='APPROVED' "
                        + "group by s2.studentId, studentName, m.id) as test "
                        + "group by test.studentId, test.studentName, test.category_id "
                        + "order by test.studentId, test.category_id "
                        + "LIMIT :page, :pageSize";

        Query query = entityManager.createNativeQuery(sql, "StudentAndMilestoneScoreInfoMapping");
        query.setParameter("startDate", startDate);
        query.setParameter("endDate", endDate);
        query.setParameter("page", page);
        query.setParameter("pageSize", pageSize);

        return query.getResultList();
    }

}
