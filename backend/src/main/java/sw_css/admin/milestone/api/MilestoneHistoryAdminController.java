package sw_css.admin.milestone.api;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sw_css.admin.milestone.application.MilestoneHistoryAdminCommandService;
import sw_css.admin.milestone.application.MilestoneHistoryAdminQueryService;
import sw_css.admin.milestone.application.dto.request.MilestoneHistoryRejectRequest;
import sw_css.admin.milestone.application.dto.response.MilestoneHistoryResponse;
import sw_css.admin.milestone.application.dto.response.MilestoneScoreResponse;

@Validated
@RequestMapping("/admin/milestones/histories")
@RestController
@RequiredArgsConstructor
public class MilestoneHistoryAdminController {
    private final MilestoneHistoryAdminCommandService milestoneHistoryAdminCommandService;
    private final MilestoneHistoryAdminQueryService milestoneHistoryAdminQueryService;

    // TODO 관리자만 호출할 수 있도록 권한 설정

    @GetMapping
    public ResponseEntity<List<MilestoneHistoryResponse>> findAllMilestoneHistory() {
        return ResponseEntity.ok(milestoneHistoryAdminQueryService.findAllMilestoneHistories());
    }

    @PostMapping
    public ResponseEntity<Void> registerMilestoneHistoriesInBatches(
            @RequestPart(value = "file") final MultipartFile file) {
        milestoneHistoryAdminCommandService.registerMilestoneHistoriesInBatches(file);
        return ResponseEntity.created(URI.create("/milestones/histories")).build();
    }

    @PatchMapping("/{historyId}/approve")
    public ResponseEntity<Void> approveMilestoneHistory(@PathVariable("historyId") final Long historyId) {
        milestoneHistoryAdminCommandService.approveMilestoneHistory(historyId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{historyId}/reject")
    public ResponseEntity<Void> approveMilestoneHistory(@PathVariable("historyId") final Long historyId,
                                                        @RequestBody @Valid final MilestoneHistoryRejectRequest request) {
        milestoneHistoryAdminCommandService.rejectMilestoneHistory(historyId, request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/scores")
    public ResponseEntity<List<MilestoneScoreResponse>> findAllMilestoneHistoryScores(
            @RequestParam(value = "start_date") final String startDate,
            @RequestParam(value = "end_date") final String endDate) {
        return ResponseEntity.ok(
                milestoneHistoryAdminQueryService.findAllMilestoneHistoryScores(startDate, endDate));
    }
}
