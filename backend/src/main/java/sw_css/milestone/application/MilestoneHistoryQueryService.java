package sw_css.milestone.application;

import static java.util.stream.Collectors.groupingBy;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.member.domain.repository.StudentMemberRepository;
import sw_css.member.exception.MemberException;
import sw_css.member.exception.MemberExceptionType;
import sw_css.milestone.application.dto.response.MilestoneHistoryOfStudentResponse;
import sw_css.milestone.application.dto.response.MilestoneScoreOfStudentResponse;
import sw_css.milestone.domain.MilestoneCategory;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.domain.MilestoneHistorySortCriteria;
import sw_css.milestone.domain.MilestoneStatus;
import sw_css.milestone.domain.repository.MilestoneHistoryCustomRepository;
import sw_css.milestone.domain.repository.MilestoneHistoryRepository;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;
import sw_css.milestone.persistence.dto.MilestoneHistoryInfo;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MilestoneHistoryQueryService {
    private final StudentMemberRepository studentMemberRepository;
    private final MilestoneHistoryRepository milestoneHistoryRepository;
    private final MilestoneHistoryCustomRepository milestoneHistoryCustomRepository;

    public Page<MilestoneHistoryOfStudentResponse> findAllMilestoneHistories(final Long memberId,
                                                                             final String startDate,
                                                                             final String endDate,
                                                                             final MilestoneStatus filter,
                                                                             final MilestoneHistorySortCriteria sortBy,
                                                                             final Sort.Direction sortDirection,
                                                                             final Pageable pageable) {
        final LocalDate parsedStartDate = startDate != null ? parseDate(startDate) : null;
        final LocalDate parsedEndDate = endDate != null ? parseDate(endDate) : null;
        if (!studentMemberRepository.existsById(memberId)) {
            throw new MemberException(MemberExceptionType.NOT_FOUND_STUDENT);
        }

        final Page<MilestoneHistory> milestoneHistories = milestoneHistoryCustomRepository.findMilestoneHistoriesByStudentId(
                memberId, parsedStartDate, parsedEndDate, filter, sortBy, sortDirection, pageable);

        return MilestoneHistoryOfStudentResponse.from(milestoneHistories);
    }

    public List<MilestoneScoreOfStudentResponse> findAllMilestoneHistoryScores(final Long memberId,
                                                                               final String startDate,
                                                                               final String endDate) {
        final LocalDate parsedStartDate = parseDate(startDate);
        final LocalDate parsedEndDate = parseDate(endDate);
        final List<MilestoneHistoryInfo> milestoneHistoryInfos = milestoneHistoryRepository.findAllMilestoneHistoriesInfoByStudentIdAndPeriod(
                memberId, parsedStartDate, parsedEndDate);
        final Map<MilestoneCategory, List<MilestoneHistoryInfo>> groupedMilestoneHistoriesByCategory = milestoneHistoryInfos.stream()
                .collect(groupingBy((MilestoneHistoryInfo::category)));
        return groupedMilestoneHistoriesByCategory.entrySet()
                .stream()
                .map(entry -> {
                    int totalScore = entry.getValue().stream()
                            .collect(groupingBy(MilestoneHistoryInfo::milestone))
                            .values().stream()
                            .map(historyInfos -> {
                                        int score = 0;
                                        int count = 0;
                                        for (MilestoneHistoryInfo info : historyInfos) {
                                            if (info.id() == null) {
                                                continue;
                                            }
                                            count += info.count();
                                            score += info.milestone().getScore() * info.count();
                                            if (count >= info.milestone().getLimitCount() || score >= info.milestone()
                                                    .getCategory().getLimitScore()) {
                                                return Math.min(score, info.category().getLimitScore());
                                            }
                                        }
                                        return score;
                                    }
                            ).mapToInt(score -> score).sum();
                    return MilestoneScoreOfStudentResponse.of(entry.getKey(),
                            Math.min(entry.getKey().getLimitScore(), totalScore));
                }).sorted(Comparator.comparing(MilestoneScoreOfStudentResponse::id))
                .toList();
    }

    private LocalDate parseDate(String date) {
        try {
            return LocalDate.parse(date);
        } catch (final DateTimeParseException exception) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.INVALID_DATE_FORMAT);
        }
    }
}
