package sw_css.milestone.application;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import sw_css.member.domain.StudentMember;
import sw_css.member.domain.repository.StudentMemberRepository;
import sw_css.member.exception.MemberException;
import sw_css.member.exception.MemberExceptionType;
import sw_css.milestone.application.dto.request.MilestoneHistoryCreateRequest;
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

    @Value("${data.file-path-prefix}")
    private String filePathPrefix;

    // TODO 테스트 작성
    private final StudentMemberRepository studentMemberRepository;
    private final MilestoneRepository milestoneRepository;
    private final MilestoneHistoryRepository milestoneHistoryRepository;

    public Long registerMilestoneHistory(final MultipartFile file, final MilestoneHistoryCreateRequest request) {
        final Milestone milestone = milestoneRepository.findById(request.milestoneId())
                .orElseThrow(() -> new MilestoneException(MilestoneExceptionType.NOT_FOUND_MILESTONE));
        // TODO 요청자의 학번을 불러오는 로직 추가
        final StudentMember student = studentMemberRepository.findById(202055558L).orElseThrow(
                () -> new MemberException(MemberExceptionType.NOT_FOUND_STUDENT)
        );

        final String newFilePath = generateFilePath(file);
        final MilestoneHistory newMilestoneHistory = new MilestoneHistory(milestone, student, request.description(),
                newFilePath, request.count(), request.activatedAt());
        final Long newMilestoneHistoryId = milestoneHistoryRepository.save(newMilestoneHistory).getId();
        uploadFile(file, newFilePath);
        return newMilestoneHistoryId;
    }

    private String generateFilePath(final MultipartFile file) {
        if (file == null) {
            return null;
        }
        return UUID.randomUUID() + "_" + file.getOriginalFilename();
    }

    private void uploadFile(final MultipartFile file, final String newFilePath) {
        if (file == null) {
            return;
        }
        final Path filePath = Paths.get(System.getProperty("user.dir") + filePathPrefix)
                .resolve(Paths.get(newFilePath)).normalize().toAbsolutePath();
        try (final InputStream inputStream = file.getInputStream()) {
            if (Files.notExists(filePath.getParent())) {
                Files.createDirectories(filePath.getParent());
            }
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (final IOException e) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.CANNOT_OPEN_FILE);
        }
    }

    public void deleteMilestoneHistory(final Long historyId) {
        final MilestoneHistory history = milestoneHistoryRepository.findById(historyId)
                .orElseThrow(
                        () -> new MilestoneHistoryException(MilestoneHistoryExceptionType.NOT_FOUND_MILESTONE_HISTORY));

        history.delete();
    }
}
