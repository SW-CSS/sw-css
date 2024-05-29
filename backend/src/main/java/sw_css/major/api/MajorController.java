package sw_css.major.api;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import sw_css.major.application.MajorQueryService;
import sw_css.major.application.dto.response.CollegeResponse;
import sw_css.major.application.dto.response.MajorResponse;

@Validated
@RestController
@RequiredArgsConstructor
public class MajorController {
    private final MajorQueryService majorQueryService;

    @GetMapping("/college")
    public ResponseEntity<List<CollegeResponse>> getMajors() {
        final List<CollegeResponse> colleges = majorQueryService.findColleges();
        return ResponseEntity.ok(colleges);
    }

    @GetMapping("/college/{collegeId}/major")
    public ResponseEntity<List<MajorResponse>> getMajors(@PathVariable Long collegeId) {
        final List<MajorResponse> majors = majorQueryService.findMajors(collegeId);
        return ResponseEntity.ok(majors);
    }
}
