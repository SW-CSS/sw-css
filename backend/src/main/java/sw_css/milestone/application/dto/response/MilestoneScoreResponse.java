package sw_css.milestone.application.dto.response;

import sw_css.milestone.domain.MilestoneCategory;
import sw_css.milestone.domain.MilestoneGroup;

public record MilestoneScoreResponse(
        Long id,
        String name,
        MilestoneGroup group,
        Integer limitScore,
        Integer score
) {
    public static MilestoneScoreResponse of(final MilestoneCategory category, final Integer score) {
        return new MilestoneScoreResponse(category.getId(), category.getName(), category.getMilestoneGroup(),
                category.getLimitScore(), score);
    }
}
