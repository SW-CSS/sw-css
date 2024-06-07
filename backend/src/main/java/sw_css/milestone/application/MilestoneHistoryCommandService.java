package sw_css.milestone.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.milestone.application.dto.request.MilestoneHistoryCreateRequest;
import sw_css.milestone.application.dto.request.MilestoneHistoryRejectRequest;
import sw_css.milestone.domain.Milestone;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.domain.repository.MilestoneHistoryRepository;
import sw_css.milestone.domain.repository.MilestoneRepository;
import sw_css.milestone.exception.MilestoneException;
import sw_css.milestone.exception.MilestoneExceptionType;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;

@Service
@RequiredArgsConstructor
@Transactional
public class MilestoneHistoryCommandService {
    // TODO 테스트 작성
    private final MilestoneRepository milestoneRepository;
    private final MilestoneHistoryRepository milestoneHistoryRepository;

    public Long registerMilestoneHistory(final MilestoneHistoryCreateRequest request) {
        // TODO 요청으로 fileUrl 대신 파일을 받도록 수정
        final Milestone milestone =
                milestoneRepository.findById(request.milestoneId())
                        .orElseThrow(() -> new MilestoneException(MilestoneExceptionType.NOT_FOUND_MILESTONE));
        // TODO 요청자의 학번을 불러오는 로직 추가
        final int studentId = 202055558;
        final MilestoneHistory newMilestoneHistory = new MilestoneHistory(milestone, studentId, request.description(),
                request.fileUrl(), request.count(), request.activatedAt());
        return milestoneHistoryRepository.save(newMilestoneHistory).getId();
    }

    public void deleteMilestoneHistory(final Long historyId) {
        final MilestoneHistory history = milestoneHistoryRepository.findById(historyId)
                .orElseThrow(
                        () -> new MilestoneHistoryException(MilestoneHistoryExceptionType.NOT_FOUND_MILESTONE_HISTORY));
        history.delete();
    }

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
