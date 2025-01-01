package sw_css.hackathon.application.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import sw_css.hackathon.domain.Hackathon;

public record HackathonDetailResponse(
        Long id,
        String name,
        String description,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate applyStartDate,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate applyEndDate,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate hackathonStartDate,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate hackathonEndDate,
        String imageUrl
) {
    public static HackathonDetailResponse of(Hackathon hackathon) {
        return new HackathonDetailResponse(
                hackathon.getId(),
                hackathon.getName(),
                hackathon.getDescription(),
                hackathon.getApplyStartDate(),
                hackathon.getApplyEndDate(),
                hackathon.getHackathonStartDate(),
                hackathon.getHackathonEndDate(),
                hackathon.getImageUrl()
        );
    }
}
