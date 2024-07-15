package sw_css.admin.milestone.persistence;

import sw_css.milestone.domain.MilestoneGroup;

public record StudentAndMilestoneScoreInfo(
        Long studentId,
        String studentName,
        Long categoryId,
        String categoryName,
        MilestoneGroup milestoneGroup,
        int score
) {
}
