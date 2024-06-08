package sw_css.milestone.application;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.member.domain.StudentMember;
import sw_css.member.domain.repository.StudentMemberRepository;
import sw_css.member.exception.MemberException;
import sw_css.member.exception.MemberExceptionType;
import sw_css.milestone.application.dto.response.MilestoneHistoryOfStudentResponse;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.domain.MilestoneStatus;
import sw_css.milestone.domain.repository.MilestoneHistoryRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MilestoneHistoryQueryService {
    private final StudentMemberRepository studentMemberRepository;
    private final MilestoneHistoryRepository milestoneHistoryRepository;

    // TODO 페이지네이션
    public List<MilestoneHistoryOfStudentResponse> findAllMilestoneHistories(final Long memberId,
                                                                             final MilestoneStatus filter) {
        final StudentMember student = studentMemberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND_STUDENT));
        return MilestoneHistoryOfStudentResponse.from(
                generateMilestoneHistories(milestoneHistoryRepository.findMilestoneHistoriesByStudent(student),
                        filter));
    }

    private List<MilestoneHistory> generateMilestoneHistories(final List<MilestoneHistory> milestoneHistories,
                                                              final MilestoneStatus filter) {
        if (filter == MilestoneStatus.APPROVED) {
            return milestoneHistories.stream()
                    .filter(milestoneHistory -> milestoneHistory.getStatus() == MilestoneStatus.APPROVED)
                    .sorted(Comparator.comparing(MilestoneHistory::getCreatedAt).reversed())
                    .toList();
        }
        return sortAllMilestoneHistories(milestoneHistories);
    }

    private List<MilestoneHistory> sortAllMilestoneHistories(final List<MilestoneHistory> milestoneHistories) {
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
