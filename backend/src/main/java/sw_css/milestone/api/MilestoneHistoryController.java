package sw_css.milestone.api;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sw_css.milestone.application.MilestoneHistoryCommandService;
import sw_css.milestone.application.MilestoneHistoryQueryService;
import sw_css.milestone.application.dto.request.MilestoneHistoryCreateRequest;
import sw_css.milestone.application.dto.response.MilestoneHistoryOfStudentResponse;
import sw_css.milestone.application.dto.response.MilestoneScoreOfStudentResponse;
import sw_css.milestone.domain.MilestoneStatus;

@Validated
@RequestMapping("/milestones/histories")
@RestController
@RequiredArgsConstructor
public class MilestoneHistoryController {
    private final MilestoneHistoryCommandService milestoneHistoryCommandService;
    private final MilestoneHistoryQueryService milestoneHistoryQueryService;

    // TODO 학생만 호출할 수 있도록 권한 설정
    @PostMapping
    public ResponseEntity<Void> registerMilestoneHistory(
            @RequestPart(value = "file", required = false) final MultipartFile file,
            @RequestPart(value = "request") @Valid final MilestoneHistoryCreateRequest request) {
        final Long registeredMilestoneHistoryId = milestoneHistoryCommandService.registerMilestoneHistory(file,
                request);
        return ResponseEntity.created(URI.create("/milestones/histories/" + registeredMilestoneHistoryId)).build();
    }

    // TODO 학생만 호출할 수 있도록 권한 설정
    @DeleteMapping("/{historyId}")
    public ResponseEntity<Void> deleteMilestoneHistory(@PathVariable("historyId") final Long historyId) {
        milestoneHistoryCommandService.deleteMilestoneHistory(historyId);
        return ResponseEntity.noContent().build();
    }

    // TODO 학생 본인 혹은 관리자만 호출할 수 있도록 권한 설정
    @GetMapping("/members/{memberId}")
    public ResponseEntity<List<MilestoneHistoryOfStudentResponse>> findAllMilestoneHistories(
            @PathVariable("memberId") final Long memberId,
            @RequestParam(value = "start_date", required = false) final String startDate,
            @RequestParam(value = "end_date", required = false) final String endDate,
            @RequestParam(value = "filter", required = false) final MilestoneStatus filter) {
        return ResponseEntity.ok(
                milestoneHistoryQueryService.findAllMilestoneHistories(memberId, startDate, endDate, filter));
    }


    // TODO 학생 본인 혹은 관리자만 호출할 수 있도록 권한 설정
    @GetMapping("/scores/members/{memberId}")
    public ResponseEntity<List<MilestoneScoreOfStudentResponse>> findAllMilestoneHistoryScores(
            @PathVariable("memberId") final Long memberId,
            @RequestParam(value = "start_date") final String startDate,
            @RequestParam(value = "end_date") final String endDate) {
        return ResponseEntity.ok(
                milestoneHistoryQueryService.findAllMilestoneHistoryScores(memberId, startDate, endDate));
    }
}
