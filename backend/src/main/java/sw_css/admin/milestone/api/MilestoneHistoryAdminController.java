package sw_css.admin.milestone.api;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.admin.milestone.application.MilestoneHistoryAdminCommandService;
import sw_css.admin.milestone.application.MilestoneHistoryAdminQueryService;
import sw_css.admin.milestone.application.dto.request.MilestoneHistoryRejectRequest;
import sw_css.admin.milestone.application.dto.response.MilestoneHistoryResponse;

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

    @PatchMapping("/{historyId}/approve")
    public ResponseEntity<Void> approveMilestoneHistory(@PathVariable("historyId") final Long historyId) {
        milestoneHistoryAdminCommandService.approveMilestoneHistory(historyId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{historyId}/reject")
    public ResponseEntity<Void> approveMilestoneHistory(@PathVariable("historyId") final Long historyId,
                                                        @RequestBody final MilestoneHistoryRejectRequest request) {
        milestoneHistoryAdminCommandService.rejectMilestoneHistory(historyId, request);
        return ResponseEntity.noContent().build();
    }
}
