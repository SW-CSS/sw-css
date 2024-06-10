package sw_css.member.application.dto.response;

import sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo;

public record StudentMemberReferenceResponse(
        Long id,
        String name
) {
    public static StudentMemberReferenceResponse of(
            final MilestoneHistoryWithStudentInfo milestoneHistoryWithStudentInfo) {
        return new StudentMemberReferenceResponse(milestoneHistoryWithStudentInfo.studentId(),
                milestoneHistoryWithStudentInfo.studentName());
    }
}
