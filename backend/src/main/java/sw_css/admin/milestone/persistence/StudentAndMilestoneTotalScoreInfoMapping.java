package sw_css.admin.milestone.persistence;

import jakarta.persistence.ColumnResult;
import java.lang.reflect.Array;
import java.util.List;
import sw_css.milestone.domain.MilestoneGroup;

public record StudentAndMilestoneTotalScoreInfoMapping(
        Long studentId,
        String studentName,
        String categoryIds,
        String categoryNames,
        String milestoneGroups,
        String limitScores,
        String scores,
        Long totalScore) {
}
