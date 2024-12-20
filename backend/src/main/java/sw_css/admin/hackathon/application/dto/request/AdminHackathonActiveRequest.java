package sw_css.admin.hackathon.application.dto.request;

import jakarta.validation.constraints.NotBlank;

public record AdminHackathonActiveRequest(
        @NotBlank(message="활성 여부를 기재해주세요.")
        String visibleStatus
) {
}
