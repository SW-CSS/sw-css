package sw_css.admin.milestone.persistence;

import java.time.LocalDate;
import java.time.LocalDateTime;
import sw_css.milestone.domain.Milestone;
import sw_css.milestone.domain.MilestoneCategory;
import sw_css.milestone.domain.MilestoneStatus;

public record StudentAndMilestoneHistoryInfo(
        Long studentId,
        String studentName,
        Long milestoneHistoryId,
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
