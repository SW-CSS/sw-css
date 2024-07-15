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
import sw_css.admin.milestone.persistence.StudentAndMilestoneScoreInfo;
import sw_css.member.application.dto.response.StudentMemberReferenceResponse;
import sw_css.milestone.application.dto.response.MilestoneScoreOfStudentResponse;
import sw_css.milestone.domain.MilestoneStatus;
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

    public List<MilestoneScoreResponse> findAllMilestoneHistoryScores(final String startDate, final String endDate,
                                                                      final String page, final String size) {
        final LocalDate parsedStartDate = parseDate(startDate);
        final LocalDate parsedEndDate = parseDate(endDate);
        final long categoryCount = milestoneCategoryRepository.count();
        final List<StudentAndMilestoneScoreInfo> milestoneHistoryInfos = milestoneScoreRepository.findAllMilestoneScoresWithStudentInfoByPeriod(
                parsedStartDate, parsedEndDate, Integer.parseInt(page) * categoryCount,
                Integer.parseInt(size) * categoryCount);
        final Map<StudentMemberReferenceResponse, List<StudentAndMilestoneScoreInfo>> groupedMilestoneScoresByStudentId = milestoneHistoryInfos.stream()
                .collect(groupingBy(
                        (info -> new StudentMemberReferenceResponse(info.studentId(), info.studentName()))));
        return groupedMilestoneScoresByStudentId.entrySet()
                .stream()
                .map(entry -> new MilestoneScoreResponse(
                        entry.getKey(),
                        entry.getValue()
                                .stream()
                                .map(info -> new MilestoneScoreOfStudentResponse(
                                        info.categoryId(), info.categoryName(), info.milestoneGroup(), info.score()))
                                .toList()))
                .toList();

    }

    private LocalDate parseDate(String startDate) {
        try {
            return LocalDate.parse(startDate);
        } catch (final DateTimeParseException exception) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.INVALID_DATE_FORMAT);
        }
    }
}
