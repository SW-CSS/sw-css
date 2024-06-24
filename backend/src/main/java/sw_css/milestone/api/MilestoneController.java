package sw_css.milestone.api;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.milestone.application.MilestoneQueryService;
import sw_css.milestone.application.dto.response.MilestonesByCategoryResponse;

@Validated
@RequestMapping("/milestones")
@RestController
@RequiredArgsConstructor
public class MilestoneController {
    private final MilestoneQueryService milestoneQueryService;

    @GetMapping
    public ResponseEntity<List<MilestonesByCategoryResponse>> findMilestones() {
        return ResponseEntity.ok(milestoneQueryService.findMilestones());
    }
}
