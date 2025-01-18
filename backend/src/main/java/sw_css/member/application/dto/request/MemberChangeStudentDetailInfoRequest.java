package sw_css.member.application.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MemberChangeStudentDetailInfoRequest(
        @NotNull(message = "전공을 선택해주세요.")
        Long majorId,
        Long minorId,
        Long doubleMajorId,
        @NotBlank(message = "진로 계획 유형을 선택해주세요.")
        String career,
        @NotBlank(message = "진로 상세 계획을 입력해주세요.")
        String careerDetail ) {
}
