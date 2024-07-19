package sw_css.admin.milestone.application;

import static java.util.stream.Collectors.groupingBy;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.admin.milestone.application.dto.response.MilestoneHistoryResponse;
import sw_css.admin.milestone.application.dto.response.MilestoneScoreResponse;
import sw_css.admin.milestone.persistence.StudentAndMilestoneScoreInfo;
import sw_css.member.application.dto.response.StudentMemberReferenceResponse;
import sw_css.milestone.application.dto.response.MilestoneScoreOfStudentResponse;
import sw_css.milestone.domain.repository.MilestoneCategoryRepository;
import sw_css.milestone.domain.repository.MilestoneHistoryRepository;
import sw_css.milestone.domain.repository.MilestoneScoreRepository;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;
import sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MilestoneHistoryAdminQueryService {
    private final MilestoneHistoryRepository milestoneHistoryRepository;
    private final MilestoneCategoryRepository milestoneCategoryRepository;
    private final MilestoneScoreRepository milestoneScoreRepository;

    public Page<MilestoneHistoryResponse> findAllMilestoneHistories(final Pageable pageable) {
        final Page<MilestoneHistoryWithStudentInfo> milestoneHistories = milestoneHistoryRepository.findAllMilestoneHistoriesWithStudentInfo(
                pageable);
        return MilestoneHistoryResponse.from(milestoneHistories);
    }

    //TODO 페이지네이션
    public Page<MilestoneScoreResponse> findAllMilestoneHistoryScores(final String startDate, final String endDate,
                                                                      final Pageable pageable) {
        final LocalDate parsedStartDate = parseDate(startDate);
        final LocalDate parsedEndDate = parseDate(endDate);
        final long categoryCount = milestoneCategoryRepository.count();
        final List<StudentAndMilestoneScoreInfo> milestoneHistoryInfos = milestoneScoreRepository.findAllMilestoneScoresWithStudentInfoByPeriod(
                parsedStartDate, parsedEndDate, pageable.getPageNumber() * pageable.getPageSize() * categoryCount,
                pageable.getPageSize() * categoryCount);
        final Long totalMilestoneHistoryInfoCount = milestoneScoreRepository.countAllMilestoneScoresWithStudentInfoByPeriod();
        final Map<StudentMemberReferenceResponse, List<StudentAndMilestoneScoreInfo>> groupedMilestoneScoresByStudentId = milestoneHistoryInfos.stream()
                .collect(groupingBy(
                        (info -> new StudentMemberReferenceResponse(info.studentId(), info.studentName()))));
        final List<MilestoneScoreResponse> content = groupedMilestoneScoresByStudentId.entrySet()
                .stream()
                .map(entry -> new MilestoneScoreResponse(
                        entry.getKey(),
                        entry.getValue()
                                .stream()
                                .map(info -> new MilestoneScoreOfStudentResponse(
                                        info.categoryId(), info.categoryName(), info.milestoneGroup(),
                                        info.limitScore(), info.score()))
                                .toList()))
                .sorted(Comparator.comparing(
                        (MilestoneScoreResponse response) -> response.milestoneScores().stream().
                                mapToInt(MilestoneScoreOfStudentResponse::score)
                                .sum()
                ).reversed())
                .toList();
        return new PageImpl<>(content, pageable, totalMilestoneHistoryInfoCount);
    }

    private LocalDate parseDate(String startDate) {
        try {
            return LocalDate.parse(startDate);
        } catch (final DateTimeParseException exception) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.INVALID_DATE_FORMAT);
        }
    }
}
