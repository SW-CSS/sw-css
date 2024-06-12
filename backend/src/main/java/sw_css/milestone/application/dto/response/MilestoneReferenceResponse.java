package sw_css.milestone.application.dto.response;

import sw_css.milestone.domain.Milestone;
import sw_css.milestone.domain.MilestoneGroup;

public record MilestoneReferenceResponse(
        Long id,
        String name,
        String categoryName,
        MilestoneGroup categoryGroup,
        int score
) {
    public static MilestoneReferenceResponse from(Milestone milestone) {
        return new MilestoneReferenceResponse(milestone.getId(), milestone.getName(), milestone.getCategory().getName(),
                milestone.getCategory().getMilestoneGroup(), milestone.getScore());
    }
}
