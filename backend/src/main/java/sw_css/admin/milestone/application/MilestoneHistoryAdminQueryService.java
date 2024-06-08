package sw_css.admin.milestone.application;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.admin.milestone.application.dto.response.MilestoneHistoryResponse;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.domain.MilestoneStatus;
import sw_css.milestone.domain.repository.MilestoneHistoryRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MilestoneHistoryAdminQueryService {
    private final MilestoneHistoryRepository milestoneHistoryRepository;

    //TODO 페이지네이션
    public List<MilestoneHistoryResponse> findAllMilestoneHistories() {
        final List<MilestoneHistory> milestoneHistories = milestoneHistoryRepository.findAll();
        return MilestoneHistoryResponse.from(sortMilestoneHistories(milestoneHistories));
    }

    private List<MilestoneHistory> sortMilestoneHistories(List<MilestoneHistory> milestoneHistories) {
        final List<MilestoneHistory> processedMilestoneHistories = milestoneHistories.stream()
                .filter(milestoneHistory -> milestoneHistory.getStatus() == MilestoneStatus.PENDING)
                .sorted(Comparator.comparing(MilestoneHistory::getCreatedAt))
                .toList();
        final List<MilestoneHistory> unprocessedMilestoneHistories = milestoneHistories.stream()
                .filter(milestoneHistory -> milestoneHistory.getStatus() != MilestoneStatus.PENDING)
                .sorted(Comparator.comparing(MilestoneHistory::getCreatedAt).reversed())
                .toList();
        return Stream.of(processedMilestoneHistories, unprocessedMilestoneHistories)
                .flatMap(List<MilestoneHistory>::stream)
                .toList();
    }
}
