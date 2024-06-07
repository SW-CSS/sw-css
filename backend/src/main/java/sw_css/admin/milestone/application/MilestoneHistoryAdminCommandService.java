package sw_css.admin.milestone.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.admin.milestone.application.request.MilestoneHistoryRejectRequest;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.domain.repository.MilestoneHistoryRepository;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;

@Service
@RequiredArgsConstructor
@Transactional
public class MilestoneHistoryAdminCommandService {
    // TODO 테스트 작성
    private final MilestoneHistoryRepository milestoneHistoryRepository;

    public void approveMilestoneHistory(final Long historyId) {
        final MilestoneHistory history = milestoneHistoryRepository.findById(historyId)
                .orElseThrow(
                        () -> new MilestoneHistoryException(MilestoneHistoryExceptionType.NOT_FOUND_MILESTONE_HISTORY));
        history.approve();
    }

    public void rejectMilestoneHistory(final Long historyId, final MilestoneHistoryRejectRequest request) {
        final MilestoneHistory history = milestoneHistoryRepository.findById(historyId)
                .orElseThrow(
                        () -> new MilestoneHistoryException(MilestoneHistoryExceptionType.NOT_FOUND_MILESTONE_HISTORY));
        history.reject(request.reason());
    }
}
