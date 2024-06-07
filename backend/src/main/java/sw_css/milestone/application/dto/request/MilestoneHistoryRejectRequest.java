package sw_css.milestone.application.dto.request;

import jakarta.validation.constraints.NotBlank;

public record MilestoneHistoryRejectRequest(
        @NotBlank(message = "반려 사유를 작성해주세요.")
        String reason
) {
}
