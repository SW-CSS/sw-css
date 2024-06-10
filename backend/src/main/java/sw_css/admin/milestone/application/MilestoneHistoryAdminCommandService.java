package sw_css.admin.milestone.application;

import java.io.IOException;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import sw_css.admin.milestone.application.dto.request.MilestoneHistoryRejectRequest;
import sw_css.admin.milestone.domain.MilestoneHistoryExcelData;
import sw_css.milestone.domain.Milestone;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.domain.MilestoneStatus;
import sw_css.milestone.domain.repository.MilestoneHistoryRepository;
import sw_css.milestone.domain.repository.MilestoneRepository;
import sw_css.milestone.exception.MilestoneException;
import sw_css.milestone.exception.MilestoneExceptionType;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;

@Service
@RequiredArgsConstructor
@Transactional
public class MilestoneHistoryAdminCommandService {
    // TODO 테스트 작성
    private final MilestoneRepository milestoneRepository;
    private final MilestoneHistoryRepository milestoneHistoryRepository;

    public void registerMilestoneHistoriesInBatches(final MultipartFile file) {
        final List<MilestoneHistoryExcelData> datas = new ArrayList<>();
        final String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (extension == null || !(extension.equals("xlsx") || extension.equals("xls"))) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.NO_MATCH_EXTENSION);
        }
        final Workbook workbook = generateWorkbook(file, extension);
        final Sheet worksheet = workbook.getSheetAt(0);
        for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) { // 4
            final Row row = worksheet.getRow(i);
            final MilestoneHistoryExcelData data = new MilestoneHistoryExcelData(
                    (long) row.getCell(0).getNumericCellValue(),
                    (long) row.getCell(1).getNumericCellValue(),
                    row.getCell(2).getStringCellValue(),
                    (int) row.getCell(3).getNumericCellValue(),
                    row.getCell(4).getDateCellValue().toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
            );
            datas.add(data);
        }
        final List<MilestoneHistory> milestoneHistories = datas.stream()
                .map(excelData -> {
                    final Milestone milestone = milestoneRepository.findById(excelData.getMilestoneId())
                            .orElseThrow(() -> new MilestoneException(MilestoneExceptionType.NOT_FOUND_MILESTONE));
                    return MilestoneHistory.of(excelData, milestone, MilestoneStatus.APPROVED);
                }).toList();
        milestoneHistoryRepository.saveAll(milestoneHistories);
    }

    private Workbook generateWorkbook(final MultipartFile file, String extension) {
        try {
            if (extension.equals("xlsx")) {
                return new XSSFWorkbook(file.getInputStream());
            }
            return new HSSFWorkbook(file.getInputStream());
        } catch (final IOException exception) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.CANNOT_OPEN_FILE);
        }
    }

    public void approveMilestoneHistory(final Long historyId) {
        final MilestoneHistory history = milestoneHistoryRepository.findById(historyId)
                .orElseThrow(
                        () -> new MilestoneHistoryException(MilestoneHistoryExceptionType.NOT_FOUND_MILESTONE_HISTORY));
        history.approve();
    }

    public void rejectMilestoneHistory(final Long historyId, final MilestoneHistoryRejectRequest request) {
        final MilestoneHistory history = milestoneHistoryRepository.findById(historyId)
                .orElseThrow(
                        () -> new MilestoneHistoryException(MilestoneHistoryExceptionType.NOT_FOUND_MILESTONE_HISTORY));
        history.reject(request.reason());
    }
}
