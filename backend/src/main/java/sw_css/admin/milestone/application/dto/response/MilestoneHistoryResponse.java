package sw_css.admin.milestone.application.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import sw_css.member.application.dto.response.StudentMemberReferenceResponse;
import sw_css.milestone.application.dto.response.MilestoneReferenceResponse;
import sw_css.milestone.domain.MilestoneStatus;
import sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo;

public record MilestoneHistoryResponse(
        Long id,
        MilestoneReferenceResponse milestone,
        StudentMemberReferenceResponse student,
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
    public static Page<MilestoneHistoryResponse> from(Page<MilestoneHistoryWithStudentInfo> milestoneHistories) {
        return new PageImpl<>(milestoneHistories.stream()
                .map(milestoneHistory -> new MilestoneHistoryResponse(
                        milestoneHistory.id(),
                        MilestoneReferenceResponse.from(milestoneHistory.milestone()),
                        milestoneHistory.student(),
                        milestoneHistory.description(),
                        milestoneHistory.fileUrl(),
                        milestoneHistory.status(),
                        milestoneHistory.rejectReason(),
                        milestoneHistory.count(),
                        milestoneHistory.activatedAt(),
                        milestoneHistory.createdAt()
                ))
                .toList());
    }
}
