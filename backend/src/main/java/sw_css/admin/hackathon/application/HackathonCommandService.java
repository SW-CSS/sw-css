package sw_css.admin.hackathon.application;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import sw_css.admin.hackathon.application.dto.request.HackathonCreateRequest;
import sw_css.admin.hackathon.exception.HackathonException;
import sw_css.admin.hackathon.exception.HackathonExceptionType;
import sw_css.hackathon.domain.Hackathon;
import sw_css.hackathon.domain.repository.HackathonRepository;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;

@Service
@RequiredArgsConstructor
@Transactional
public class HackathonCommandService {

    @Value("${data.file-path-prefix}")
    private String filePathPrefix;

    private final HackathonRepository hackathonRepository;

    public Long registerHackathon(final MultipartFile file, final HackathonCreateRequest request) {
        validateFileType(file);
        validateDate(request.applyStartDate(), request.applyEndDate(), HackathonExceptionType.INVALID_APPLY_DATE);
        validateDate(request.hackathonStartDate(), request.hackathonEndDate(), HackathonExceptionType.INVALID_HACKATHON_DATE);

        final String newFilePath = generateFilePath(file);
        final Hackathon newHackathon = new Hackathon(request.name(), request.description(), request.password(), request.applyStartDate(), request.applyEndDate(), request.hackathonStartDate(), request.hackathonEndDate(), newFilePath);

        final Long newHackathonId = hackathonRepository.save(newHackathon).getId();
        uploadFile(file, newFilePath);
        return newHackathonId;
    }

    private void validateDate(LocalDate startDate, LocalDate endDate, HackathonExceptionType exceptionType) {
        if (startDate.isAfter(endDate)) throw new HackathonException(exceptionType);
    }

    private void validateFileType(final MultipartFile file) {
        System.out.println(file.getOriginalFilename());
        if (file == null) {
            throw new HackathonException(HackathonExceptionType.NOT_EXIST_FILE);
        }
        final String contentType = file.getContentType();
        if (!isSupportedContentType(contentType)) {
            throw new HackathonException(HackathonExceptionType.UNSUPPORTED_FILE_TYPE);
        }
    }

    private boolean isSupportedContentType(final String contentType) {
        return contentType != null && (
                        contentType.equals("image/png") ||
                        contentType.equals("image/jpeg") ||
                        contentType.equals("image/jpg")
        );
    }

    private String generateFilePath(final MultipartFile file) {
        if (file == null) {
            return null;
        }
        return UUID.randomUUID() + "_" + file.getOriginalFilename().replaceAll("\\[|\\]", "");
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
}
