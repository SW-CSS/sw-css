package sw_css.milestone.api;

import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.milestone.application.MilestoneQueryService;
import sw_css.milestone.application.dto.response.MilestonesByCategoryResponse;
import sw_css.milestone.domain.MilestoneGroup;

@Validated
@RequestMapping("/milestones")
@RestController
@RequiredArgsConstructor
public class MilestoneController {
    private final MilestoneQueryService milestoneQueryService;

    @GetMapping
    public ResponseEntity<Map<MilestoneGroup, List<MilestonesByCategoryResponse>>> findMilestones() {
        return ResponseEntity.ok(milestoneQueryService.findMilestones());
    }
}
