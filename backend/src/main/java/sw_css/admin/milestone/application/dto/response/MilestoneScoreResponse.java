package sw_css.admin.milestone.application.dto.response;

import java.util.List;
import sw_css.member.application.dto.response.StudentMemberReferenceResponse;
import sw_css.milestone.application.dto.response.MilestoneScoreOfStudentResponse;

public record MilestoneScoreResponse(
        StudentMemberReferenceResponse student,
        List<MilestoneScoreOfStudentResponse> milestoneScores
) {

}
