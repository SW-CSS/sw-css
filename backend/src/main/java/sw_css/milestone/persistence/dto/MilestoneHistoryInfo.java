package sw_css.milestone.persistence.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import sw_css.milestone.domain.Milestone;
import sw_css.milestone.domain.MilestoneCategory;
import sw_css.milestone.domain.MilestoneStatus;

public record MilestoneHistoryInfo(
        Long id,
        MilestoneCategory category,
        Milestone milestone,
        String description,
        String fileUrl,
        MilestoneStatus status,
        String rejectReason,
        Integer count,
        LocalDate activatedAt,
        LocalDateTime createdAt
) {
}
