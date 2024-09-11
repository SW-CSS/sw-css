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
    private final MilestoneRepository milestoneRepository;
    private final MilestoneHistoryRepository milestoneHistoryRepository;

    public Long registerMilestoneHistory(final StudentMember student, final MultipartFile file,
                                         final MilestoneHistoryCreateRequest request) {
        validateFileType(file);

        final Milestone milestone = milestoneRepository.findById(request.milestoneId())
                .orElseThrow(() -> new MilestoneException(MilestoneExceptionType.NOT_FOUND_MILESTONE));

        final String newFilePath = generateFilePath(file);
        final MilestoneHistory newMilestoneHistory = new MilestoneHistory(milestone, student, request.description(),
                newFilePath, request.count(), request.activatedAt());
        final Long newMilestoneHistoryId = milestoneHistoryRepository.save(newMilestoneHistory).getId();
        uploadFile(file, newFilePath);
        return newMilestoneHistoryId;
    }

    private void validateFileType(final MultipartFile file) {
        if (file == null) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.NOT_EXIST_FILE);
        }
        final String contentType = file.getContentType();
        if (!isSupportedContentType(contentType)) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.UNSUPPORTED_FILE_TYPE);
        }
    }


    private boolean isSupportedContentType(final String contentType) {
        return contentType != null && (
                contentType.equals("application/pdf") ||
                        contentType.equals("image/png") ||
                        contentType.equals("image/jpeg") ||
                        contentType.equals("image/jpg")
        );
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

    public void deleteMilestoneHistory(final StudentMember student, final Long historyId) {
        final MilestoneHistory history = milestoneHistoryRepository.findById(historyId)
                .orElseThrow(
                        () -> new MilestoneHistoryException(MilestoneHistoryExceptionType.NOT_FOUND_MILESTONE_HISTORY));
        if (!history.getStudentId().equals(student.getId())) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.REMOVE_NOT_ALLOWED);
        }
        history.delete();
    }
}
