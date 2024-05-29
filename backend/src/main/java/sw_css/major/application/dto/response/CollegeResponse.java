package sw_css.major.application.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import sw_css.major.domain.College;

public record CollegeResponse(
        Long id,
        String name,
        LocalDateTime createdAt
) {
    public static List<CollegeResponse> of(final List<College> colleges) {
        return colleges.stream()
                .map(college -> new CollegeResponse(
                        college.getId(),
                        college.getName(),
                        college.getCreatedAt()
                )).toList();
    }
}
