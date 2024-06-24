package sw_css.milestone.persistence.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import sw_css.member.application.dto.response.StudentMemberReferenceResponse;
import sw_css.milestone.domain.Milestone;
import sw_css.milestone.domain.MilestoneCategory;
import sw_css.milestone.domain.MilestoneStatus;

public record MilestoneHistoryWithStudentInfo(
        Long id,
        Milestone milestone,
        MilestoneCategory category,
        StudentMemberReferenceResponse student,
        String description,
        String fileUrl,
        MilestoneStatus status,
        String rejectReason,
        Integer count,
        LocalDate activatedAt,
        LocalDateTime createdAt
) {
    public MilestoneHistoryWithStudentInfo(
            final Long id, final Milestone milestone, final MilestoneCategory category,
            final Long studentId, final String studentName, final String description, final String fileUrl,
            final MilestoneStatus status, final String rejectReason, final Integer count,
            final LocalDate activatedAt, final LocalDateTime createdAt
    ) {
        this(id, milestone, category, new StudentMemberReferenceResponse(studentId, studentName), description, fileUrl,
                status, rejectReason, count, activatedAt, createdAt);
    }
}
