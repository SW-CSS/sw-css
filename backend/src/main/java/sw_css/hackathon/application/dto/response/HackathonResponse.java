package sw_css.hackathon.application.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonResponse;
import sw_css.hackathon.domain.Hackathon;

public record HackathonResponse(
        Long id,
        String name,
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
    public static Page<HackathonResponse> from(Page<Hackathon> hackathons) {
        return new PageImpl<>(hackathons.stream()
                .map(hackathon -> new HackathonResponse(
                        hackathon.getId(),
                        hackathon.getName(),
                        hackathon.getApplyStartDate(),
                        hackathon.getApplyEndDate(),
                        hackathon.getHackathonStartDate(),
                        hackathon.getHackathonEndDate(),
                        hackathon.getImageUrl()
                ))
                .toList(), hackathons.getPageable(), hackathons.getTotalElements());
    }
}
