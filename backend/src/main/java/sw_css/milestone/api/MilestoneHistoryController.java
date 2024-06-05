package sw_css.milestone.api;

import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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

    @PostMapping
    public ResponseEntity<Void> registerMilestoneHistory(@RequestBody final MilestoneHistoryCreateRequest request) {
        final Long registeredMilestoneHistoryId = milestoneHistoryCommandService.registerMilestoneHistory(request);
        return ResponseEntity.created(URI.create("/milestones/histories/" + registeredMilestoneHistoryId)).build();
    }
}
