package sw_css.milestone.api;

import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.milestone.application.MilestoneHistoryCommandService;
import sw_css.milestone.application.dto.request.MilestoneHistoryCreateRequest;

@Validated
@RequestMapping("/milestones/histories")
@RestController
@RequiredArgsConstructor
public class MilestoneHistoryController {
    private final MilestoneHistoryCommandService milestoneHistoryCommandService;

    // TODO 학생만 호출할 수 있도록 권한 설정
    @PostMapping
    public ResponseEntity<Void> registerMilestoneHistory(@RequestBody final MilestoneHistoryCreateRequest request) {
        final Long registeredMilestoneHistoryId = milestoneHistoryCommandService.registerMilestoneHistory(request);
        return ResponseEntity.created(URI.create("/milestones/histories/" + registeredMilestoneHistoryId)).build();
    }

    // TODO 학생만 호출할 수 있도록 권한 설정
    @DeleteMapping("/{historyId}")
    public ResponseEntity<Void> deleteMilestoneHistory(@PathVariable("historyId") final Long historyId) {
        milestoneHistoryCommandService.deleteMilestoneHistory(historyId);
        return ResponseEntity.noContent().build();
    }
}
