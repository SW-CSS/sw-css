package sw_css.admin.milestone.application;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.admin.milestone.application.dto.response.MilestoneHistoryResponse;
import sw_css.milestone.domain.MilestoneStatus;
import sw_css.milestone.domain.repository.MilestoneHistoryRepository;
import sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MilestoneHistoryAdminQueryService {
    private final MilestoneHistoryRepository milestoneHistoryRepository;

    //TODO 페이지네이션
    public List<MilestoneHistoryResponse> findAllMilestoneHistories() {
        final List<MilestoneHistoryWithStudentInfo> milestoneHistories = milestoneHistoryRepository.findAllMilestoneHistoriesWithStudentInfo();
        return MilestoneHistoryResponse.from(sortMilestoneHistories(milestoneHistories));
    }

    private List<MilestoneHistoryWithStudentInfo> sortMilestoneHistories(
            List<MilestoneHistoryWithStudentInfo> milestoneHistories) {
        final List<MilestoneHistoryWithStudentInfo> processedMilestoneHistories = milestoneHistories.stream()
                .filter(milestoneHistory -> milestoneHistory.status() == MilestoneStatus.PENDING)
                .sorted(Comparator.comparing(MilestoneHistoryWithStudentInfo::createdAt))
                .toList();
        final List<MilestoneHistoryWithStudentInfo> unprocessedMilestoneHistories = milestoneHistories.stream()
                .filter(milestoneHistory -> milestoneHistory.status() != MilestoneStatus.PENDING)
                .sorted(Comparator.comparing(MilestoneHistoryWithStudentInfo::createdAt).reversed())
                .toList();
        return Stream.of(processedMilestoneHistories, unprocessedMilestoneHistories)
                .flatMap(List<MilestoneHistoryWithStudentInfo>::stream)
                .toList();
    }
}
