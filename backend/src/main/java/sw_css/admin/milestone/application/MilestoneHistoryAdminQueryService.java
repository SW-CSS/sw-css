package sw_css.admin.milestone.application;

import static java.util.stream.Collectors.groupingBy;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.admin.milestone.application.dto.response.MilestoneHistoryResponse;
import sw_css.admin.milestone.application.dto.response.MilestoneScoreResponse;
import sw_css.member.application.dto.response.StudentMemberReferenceResponse;
import sw_css.member.domain.StudentMember;
import sw_css.milestone.application.dto.response.MilestoneScoreOfStudentResponse;
import sw_css.milestone.domain.MilestoneStatus;
import sw_css.milestone.domain.repository.MilestoneHistoryRepository;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;
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

    public List<MilestoneScoreResponse> findAllMilestoneHistoryScores(final String startDate, final String endDate) {
        final LocalDate parsedStartDate = parseDate(startDate);
        final LocalDate parsedEndDate = parseDate(endDate);
        final List<MilestoneHistoryWithStudentInfo> milestoneHistoryInfos = milestoneHistoryRepository.findAllMilestoneHistoriesWithStudentInfoByPeriod(
                parsedStartDate, parsedEndDate);
        final Map<StudentMember, List<MilestoneHistoryWithStudentInfo>> groupedMilestoneHistoriesByStudentId = milestoneHistoryInfos.stream()
                .collect(groupingBy((MilestoneHistoryWithStudentInfo::student)));
        return groupedMilestoneHistoriesByStudentId.entrySet().stream()
                .map(entry -> {
                    List<MilestoneScoreOfStudentResponse> milestoneScoreOfStudentResponses = entry.getValue().stream()
                            .collect(groupingBy((MilestoneHistoryWithStudentInfo::category)))
                            .entrySet()
                            .stream()
                            .map(entry2 -> {
                                int totalScore = entry2.getValue().stream()
                                        .collect(groupingBy(MilestoneHistoryWithStudentInfo::milestone))
                                        .values().stream()
                                        .map(historyInfos -> {
                                                    int score = 0;
                                                    int count = 0;
                                                    for (MilestoneHistoryWithStudentInfo info : historyInfos) {
                                                        if (info.id() == null) {
                                                            continue;
                                                        }
                                                        count += info.count();
                                                        score += info.milestone().getScore() * info.count();
                                                        if (count >= info.milestone().getLimitCount()
                                                                || score >= info.milestone()
                                                                .getCategory().getLimitScore()) {
                                                            return Math.min(score, info.category().getLimitScore());
                                                        }
                                                    }
                                                    return score;
                                                }
                                        ).mapToInt(score -> score).sum();
                                return MilestoneScoreOfStudentResponse.of(entry2.getKey(),
                                        Math.min(entry2.getKey().getLimitScore(), totalScore));
                            }).sorted(Comparator.comparing(MilestoneScoreOfStudentResponse::id))
                            .toList();
                    return new MilestoneScoreResponse(StudentMemberReferenceResponse.from(entry.getKey()),
                            milestoneScoreOfStudentResponses);
                })
                .sorted(Comparator.comparing(response ->
                        -(response.milestoneScores().stream()
                                .mapToInt(MilestoneScoreOfStudentResponse::score)
                                .sum())
                ))
                .sorted().toList();

    }

    private LocalDate parseDate(String startDate) {
        try {
            return LocalDate.parse(startDate);
        } catch (final DateTimeParseException exception) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.INVALID_DATE_FORMAT);
        }
    }
}
