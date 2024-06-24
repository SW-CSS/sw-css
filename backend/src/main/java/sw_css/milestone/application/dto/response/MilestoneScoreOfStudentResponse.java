package sw_css.milestone.application.dto.response;

import sw_css.milestone.domain.MilestoneCategory;
import sw_css.milestone.domain.MilestoneGroup;

public record MilestoneScoreOfStudentResponse(
        Long id,
        String name,
        MilestoneGroup group,
        Integer limitScore,
        Integer score
) {
    public static MilestoneScoreOfStudentResponse of(final MilestoneCategory category, final Integer score) {
        return new MilestoneScoreOfStudentResponse(category.getId(), category.getName(), category.getMilestoneGroup(),
                category.getLimitScore(), score);
    }
}
