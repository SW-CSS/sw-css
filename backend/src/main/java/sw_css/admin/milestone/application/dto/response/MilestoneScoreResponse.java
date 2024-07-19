package sw_css.admin.milestone.application.dto.response;

import java.util.List;
import java.util.Map;
import sw_css.member.application.dto.response.StudentMemberReferenceResponse;
import sw_css.milestone.application.dto.response.MilestoneScoreOfStudentResponse;
import sw_css.milestone.domain.MilestoneGroup;

public record MilestoneScoreResponse(
        StudentMemberReferenceResponse student,
        Map<MilestoneGroup, List<MilestoneScoreOfStudentResponse>> milestoneScores
) {

}
