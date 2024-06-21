package sw_css.milestone.application.dto.response;

import java.util.List;
import sw_css.milestone.domain.Milestone;

public record MilestoneResponse(
        Long id,
        String name,
        Integer score,
        Integer limitCount
) {
    public static List<MilestoneResponse> from(final List<Milestone> milestones) {
        return milestones.stream()
                .map(milestone -> new MilestoneResponse(milestone.getId(), milestone.getName(),
                        milestone.getScore(), milestone.getLimitCount())
                ).toList();
    }
}
