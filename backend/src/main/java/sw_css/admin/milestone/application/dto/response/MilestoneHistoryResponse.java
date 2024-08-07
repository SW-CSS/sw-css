package sw_css.admin.milestone.application.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
    public static MilestoneHistoryResponse from(final MilestoneHistoryWithStudentInfo milestoneHistory) {
        return new MilestoneHistoryResponse(
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
        );
    }

    public static Page<MilestoneHistoryResponse> from(final Page<MilestoneHistoryWithStudentInfo> milestoneHistories,
                                                      final Pageable pageable) {
        return new PageImpl<>(milestoneHistories.stream()
                .map(MilestoneHistoryResponse::from)
                .toList(), pageable, milestoneHistories.getTotalElements());
    }
}
