package sw_css.admin.milestone.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.admin.milestone.application.MilestoneHistoryAdminCommandService;
import sw_css.admin.milestone.application.request.MilestoneHistoryRejectRequest;

@Validated
@RequestMapping("/admin/milestones/histories")
@RestController
@RequiredArgsConstructor
public class MilestoneHistoryAdminController {
    private final MilestoneHistoryAdminCommandService milestoneHistoryAdminCommandService;

    // TODO 관리자만 호출할 수 있도록 권한 설정
    @PatchMapping("/{historyId}/approve")
    public ResponseEntity<Void> approveMilestoneHistory(@PathVariable("historyId") final Long historyId) {
        milestoneHistoryAdminCommandService.approveMilestoneHistory(historyId);
        return ResponseEntity.noContent().build();
    }

    // TODO 관리자만 호출할 수 있도록 권한 설정
    @PatchMapping("/{historyId}/reject")
    public ResponseEntity<Void> approveMilestoneHistory(@PathVariable("historyId") final Long historyId,
                                                        @RequestBody final MilestoneHistoryRejectRequest request) {
        milestoneHistoryAdminCommandService.rejectMilestoneHistory(historyId, request);
        return ResponseEntity.noContent().build();
    }
}
