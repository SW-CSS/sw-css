package sw_css.admin.hackathon.application.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import sw_css.hackathon.domain.Hackathon;

public record AdminHackathonDetailResponse(
        Long id,
        String name,
        String description,
        String imageUrl,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate applyStartDate,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate applyEndDate,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate hackathonStartDate,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate hackathonEndDate,
        String password,
        Boolean visibleStatus) {
    public static AdminHackathonDetailResponse of(Hackathon hackathon) {
        return new AdminHackathonDetailResponse(
                hackathon.getId(),
                hackathon.getName(),
                hackathon.getDescription(),
                hackathon.getImageUrl(),
                hackathon.getApplyStartDate(),
                hackathon.getApplyEndDate(),
                hackathon.getHackathonStartDate(),
                hackathon.getHackathonEndDate(),
                hackathon.getPassword(),
                hackathon.isVisibleStatus()
        );
    }
}
