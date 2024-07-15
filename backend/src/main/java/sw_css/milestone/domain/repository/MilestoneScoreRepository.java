package sw_css.milestone.domain.repository;

import java.time.LocalDate;
import java.util.List;
import sw_css.admin.milestone.persistence.StudentAndMilestoneScoreInfo;

public interface MilestoneScoreRepository {
    List<StudentAndMilestoneScoreInfo> findAllMilestoneScoresWithStudentInfoByPeriod(LocalDate startDate,
                                                                                     LocalDate endDate, Long page,
                                                                                     Long pageSize);

}
