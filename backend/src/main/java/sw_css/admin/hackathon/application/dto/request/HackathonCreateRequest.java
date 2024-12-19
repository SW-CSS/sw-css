package sw_css.admin.hackathon.application.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record HackathonCreateRequest(
        @NotBlank(message = "해커톤 명을 기재해주세요.")
        String name,
        @NotBlank(message = "해커톤 상세 내용를 기재해주세요.")
        String description,
        @NotBlank(message = "해커톤 비밀번호를 기재해주세요.")
        String password,
        @NotNull(message = "해커톤 신청 시작일을 기재해주세요")
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate applyStartDate,
        @NotNull(message = "해커톤 신청 마지막일을 기재해주세요")
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate applyEndDate,
        @NotNull(message = "해커톤 대회 시작일을 기재해주세요")
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate hackathonStartDate,
        @NotNull(message = "해커톤 대회 마지막일을 기재해주세요")
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate hackathonEndDate
) {
}
