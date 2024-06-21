package sw_css.milestone.application.dto.response;

import java.util.List;
import sw_css.milestone.domain.MilestoneCategory;
import sw_css.milestone.domain.MilestoneGroup;

public record MilestonesByCategoryResponse(
        Long id,
        String name,
        MilestoneGroup group,
        Integer limitScore,
        List<MilestoneResponse> milestones
) {
    public static List<MilestonesByCategoryResponse> from(final List<MilestoneCategory> categories) {
        return categories.stream()
                .map(category -> new MilestonesByCategoryResponse(category.getId(),
                        category.getName(), category.getMilestoneGroup(), category.getLimitScore(),
                        MilestoneResponse.from(category.getMilestones())))
                .toList();
    }
}
