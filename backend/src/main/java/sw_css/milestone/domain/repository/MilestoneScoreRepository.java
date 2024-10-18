package sw_css.milestone.domain.repository;

import java.time.LocalDate;
import java.util.List;
import sw_css.admin.milestone.persistence.StudentAndMilestoneScoreInfo;
import sw_css.admin.milestone.persistence.StudentAndMilestoneTotalScoreInfoMapping;

public interface MilestoneScoreRepository {
    List<StudentAndMilestoneTotalScoreInfoMapping> findMilestoneScoresWithStudentInfoByPeriod(LocalDate startDate,
                                                                                              LocalDate endDate, Long page,
                                                                                              Long pageSize);

    List<StudentAndMilestoneScoreInfo> findAllMilestoneScoresWithStudentInfoByPeriod(LocalDate startDate,
                                                                                     LocalDate endDate);

    Long countAllMilestoneScoresWithStudentInfoByPeriod();

}
