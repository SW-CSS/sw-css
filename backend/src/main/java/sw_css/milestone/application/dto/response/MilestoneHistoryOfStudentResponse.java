package sw_css.milestone.application.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.domain.MilestoneStatus;

public record MilestoneHistoryOfStudentResponse(
        Long id,
        MilestoneReferenceResponse milestone,
        String description,
        String fileUrl,
        MilestoneStatus status,
        String rejectReason,
        int count,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate activatedAt,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime createdAt
) {
    public static List<MilestoneHistoryOfStudentResponse> from(List<MilestoneHistory> milestoneHistories) {
        return milestoneHistories.stream()
                .map(milestoneHistory -> new MilestoneHistoryOfStudentResponse(
                        milestoneHistory.getId(),
                        MilestoneReferenceResponse.from(milestoneHistory.getMilestone()),
                        milestoneHistory.getDescription(),
                        milestoneHistory.getFileUrl(),
                        milestoneHistory.getStatus(),
                        milestoneHistory.getRejectReason(),
                        milestoneHistory.getCount(),
                        milestoneHistory.getActivatedAt(),
                        milestoneHistory.getCreatedAt()
                ))
                .toList();
    }
}
