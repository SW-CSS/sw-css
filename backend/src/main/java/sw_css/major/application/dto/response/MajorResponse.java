package sw_css.major.application.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import sw_css.major.domain.Major;

public record MajorResponse(
        Long id,
        String name,
        LocalDateTime createdAt
) {
    public static List<MajorResponse> of(final List<Major> majors) {
        return majors.stream()
                .map(major -> new MajorResponse(
                        major.getId(),
                        major.getName(),
                        major.getCreatedAt()
                )).toList();
    }
}
