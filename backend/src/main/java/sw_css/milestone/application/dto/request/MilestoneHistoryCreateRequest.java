package sw_css.milestone.application.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record MilestoneHistoryCreateRequest(
        @NotNull(message = "마일스톤 유형이 선택되지 않았습니다.")
        Long milestoneId,
        @NotBlank(message = "활동 상세를 기재해주세요.")
        String description,
        String fileUrl,
        @NotNull(message = "활동 횟수를 기재해주세요.")
        Integer count,
        @NotNull(message = "활동일을 기재해주세요")
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate activatedAt
) {
}
