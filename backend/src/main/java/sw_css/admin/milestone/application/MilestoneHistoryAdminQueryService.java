package sw_css.admin.milestone.application;

import static java.util.stream.Collectors.groupingBy;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
import sw_css.milestone.domain.MilestoneCategory;
import sw_css.milestone.domain.MilestoneGroup;
import sw_css.milestone.domain.repository.MilestoneCategoryRepository;
import sw_css.milestone.domain.repository.MilestoneHistoryCustomRepository;
import sw_css.milestone.domain.repository.MilestoneHistoryRepository;
import sw_css.milestone.domain.repository.MilestoneScoreRepository;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;
import sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MilestoneHistoryAdminQueryService {
    private final MilestoneCategoryRepository milestoneCategoryRepository;
    private final MilestoneScoreRepository milestoneScoreRepository;
    private final MilestoneHistoryCustomRepository milestoneHistoryCustomRepository;
    private final MilestoneHistoryRepository milestoneHistoryRepository;


    public Page<MilestoneHistoryResponse> findAllMilestoneHistories(final Integer field,
                                                                    final String keyword, final Pageable pageable) {
        final Page<MilestoneHistoryWithStudentInfo> milestoneHistories = milestoneHistoryCustomRepository.findMilestoneHistories(
                field, keyword, pageable);
        return MilestoneHistoryResponse.from(milestoneHistories, pageable);
    }

    public byte[] downloadMilestoneHistory(final Integer field, final String keyword) {
        final List<MilestoneHistoryWithStudentInfo> milestoneHistories = milestoneHistoryCustomRepository.findAllMilestoneHistories(
                field, keyword);
        return generateMilestoneHistoryExcelFile(milestoneHistories);
    }

    private byte[] generateMilestoneHistoryExcelFile(final List<MilestoneHistoryWithStudentInfo> milestoneHistories) {

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("마일스톤 실적 내역 목록"); // 엑셀 sheet 이름
        sheet.setDefaultColumnWidth(20); // 디폴트 너비 설정

        XSSFFont headerXSSFFont = createHeaderFont(workbook);
        XSSFCellStyle headerXssfCellStyle = createHeaderStyle(workbook, headerXSSFFont);
        XSSFCellStyle bodyXssfCellStyle = createBodyStyle(workbook);

        /**
         * header data
         */
        int rowCount = 0; // 데이터가 저장될 행
        List<String> headerNames = new ArrayList<>(
                List.of("No", "이름", "학번", "활동 코드", "활동명", "건당 점수", "활동횟수(건)", "활동일", "등록일", "승인여부"));

        Cell headerCell;

        Row headerRow = sheet.createRow(rowCount++);
        for (int i = 0; i < headerNames.size(); i++) {
            headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headerNames.get(i)); // 데이터 추가
            headerCell.setCellStyle(headerXssfCellStyle); // 스타일 추가
        }

        /**
         * body data
         */

        Row bodyRow;
        Cell bodyCell;

        DateTimeFormatter pattern = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (int i = 0; i < milestoneHistories.size(); i++) {
            bodyRow = sheet.createRow(rowCount++);

            for (int j = 0; j < headerNames.size(); j++) {
                bodyCell = bodyRow.createCell(j);
                bodyCell.setCellStyle(bodyXssfCellStyle); // 스타일 추가
            }
            bodyRow.getCell(0).setCellValue(i + 1);
            bodyRow.getCell(1).setCellValue(milestoneHistories.get(i).student().name());
            bodyRow.getCell(2).setCellValue(milestoneHistories.get(i).student().id());
            bodyRow.getCell(3).setCellValue(milestoneHistories.get(i).milestone().getCategory().getId());
            bodyRow.getCell(4).setCellValue(milestoneHistories.get(i).description());
            bodyRow.getCell(5).setCellValue(milestoneHistories.get(i).milestone().getScore());
            bodyRow.getCell(6).setCellValue(milestoneHistories.get(i).count());
            bodyRow.getCell(7).setCellValue(milestoneHistories.get(i).activatedAt().format(pattern));
            bodyRow.getCell(8).setCellValue(milestoneHistories.get(i).createdAt().format(pattern));
            bodyRow.getCell(9).setCellValue(milestoneHistories.get(i).status().name());
        }
        try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            workbook.write(bos);
            workbook.close();
            return bos.toByteArray();
        } catch (IOException e) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.CANNOT_OPEN_FILE);
        }
    }

    private XSSFFont createHeaderFont(Workbook workbook) {
        XSSFFont headerXSSFFont = (XSSFFont) workbook.createFont();
        headerXSSFFont.setColor(new XSSFColor(new byte[]{(byte) 255, (byte) 255, (byte) 255}));
        return headerXSSFFont;
    }

    private XSSFCellStyle createHeaderStyle(Workbook workbook, XSSFFont headerXSSFFont) {
        XSSFCellStyle headerXssfCellStyle = (XSSFCellStyle) workbook.createCellStyle();

        // 테두리 설정
        headerXssfCellStyle.setBorderLeft(BorderStyle.THIN);
        headerXssfCellStyle.setBorderRight(BorderStyle.THIN);
        headerXssfCellStyle.setBorderTop(BorderStyle.THIN);
        headerXssfCellStyle.setBorderBottom(BorderStyle.THIN);

        headerXssfCellStyle.setFillForegroundColor(new XSSFColor(new byte[]{(byte) 34, (byte) 37, (byte) 41}));
        headerXssfCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerXssfCellStyle.setFont(headerXSSFFont);

        return headerXssfCellStyle;
    }

    private XSSFCellStyle createBodyStyle(Workbook workbook) {
        XSSFCellStyle bodyXssfCellStyle = (XSSFCellStyle) workbook.createCellStyle();

        // 테두리 설정
        bodyXssfCellStyle.setBorderLeft(BorderStyle.THIN);
        bodyXssfCellStyle.setBorderRight(BorderStyle.THIN);
        bodyXssfCellStyle.setBorderTop(BorderStyle.THIN);
        bodyXssfCellStyle.setBorderBottom(BorderStyle.THIN);
        return bodyXssfCellStyle;
    }


    public MilestoneHistoryResponse findMilestoneHistory(final Long historyId) {
        final MilestoneHistoryWithStudentInfo history = milestoneHistoryRepository.findMilestoneHistoriesWithStudentInfoById(
                historyId).orElseThrow(
                () -> new MilestoneHistoryException(MilestoneHistoryExceptionType.NOT_FOUND_MILESTONE_HISTORY)
        );
        return MilestoneHistoryResponse.from(history);
    }

    public Page<MilestoneScoreResponse> findAllMilestoneHistoryScores(final String startDate, final String endDate,
                                                                      final Pageable pageable) {
        final LocalDate parsedStartDate = parseDate(startDate);
        final LocalDate parsedEndDate = parseDate(endDate);
        final long categoryCount = milestoneCategoryRepository.count();
        final List<StudentAndMilestoneScoreInfo> milestoneHistoryInfos = milestoneScoreRepository.findMilestoneScoresWithStudentInfoByPeriod(
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
                                .collect(groupingBy(MilestoneScoreOfStudentResponse::group))))
                .sorted(Comparator.comparing(
                        (MilestoneScoreResponse response) -> response.milestoneScores().entrySet().stream()
                                .flatMap(entry -> entry.getValue().stream())
                                .mapToInt(MilestoneScoreOfStudentResponse::score)
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

    public byte[] downloadMilestoneHistoryScore(final String startDate, final String endDate) {
        final LocalDate parsedStartDate = parseDate(startDate);
        final LocalDate parsedEndDate = parseDate(endDate);
        final List<StudentAndMilestoneScoreInfo> milestoneHistoryInfos = milestoneScoreRepository.findAllMilestoneScoresWithStudentInfoByPeriod(
                parsedStartDate, parsedEndDate);
        final Map<StudentMemberReferenceResponse, List<StudentAndMilestoneScoreInfo>> groupedMilestoneScoresByStudentId = milestoneHistoryInfos.stream()
                .collect(groupingBy(
                        (info -> new StudentMemberReferenceResponse(info.studentId(), info.studentName()))));
        final List<MilestoneScoreResponse> milestoneHistoryScores = groupedMilestoneScoresByStudentId.entrySet()
                .stream()
                .map(entry -> new MilestoneScoreResponse(
                        entry.getKey(),
                        entry.getValue()
                                .stream()
                                .map(info -> new MilestoneScoreOfStudentResponse(
                                        info.categoryId(), info.categoryName(), info.milestoneGroup(),
                                        info.limitScore(), info.score()))
                                .collect(groupingBy(MilestoneScoreOfStudentResponse::group))))
                .sorted(Comparator.comparing(
                        (MilestoneScoreResponse response) -> response.milestoneScores().entrySet().stream()
                                .flatMap(entry -> entry.getValue().stream())
                                .mapToInt(MilestoneScoreOfStudentResponse::score)
                                .sum()
                ).reversed())
                .toList();
        return generateMilestoneHistoryScoreExcelFile(milestoneHistoryScores);
    }

    private byte[] generateMilestoneHistoryScoreExcelFile(final List<MilestoneScoreResponse> milestoneHistoryScores) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("마일스톤 점수 현황"); // 엑셀 sheet 이름
        sheet.setDefaultColumnWidth(20); // 디폴트 너비 설정

        XSSFFont headerXSSFFont = createHeaderFont(workbook);
        XSSFCellStyle headerXssfCellStyle = createHeaderStyle(workbook, headerXSSFFont);
        XSSFCellStyle bodyXssfCellStyle = createBodyStyle(workbook);

        XSSFCellStyle totalScoreStyle = createTotalScoreStyle(workbook);
        XSSFCellStyle subTotalScoreStyle = createSubTotalScoreStyle(workbook);

        /**
         * header data
         */
        int rowCount = 0; // 데이터가 저장될 행

        List<String> headerNames = new ArrayList<>(List.of("순위", "이름", "학번", "총점"));
        final Map<MilestoneGroup, List<MilestoneCategory>> categoriesByGroup = milestoneCategoryRepository.findAll()
                .stream()
                .collect(groupingBy(MilestoneCategory::getMilestoneGroup));
        categoriesByGroup.forEach((key, value) -> {
            headerNames.addAll(value.stream()
                    .map(MilestoneCategory::getName)
                    .toList());
            headerNames.add(key.getLabel() + " SW역량 소계");
        });

        Cell headerCell;

        Row headerRow = sheet.createRow(rowCount++);
        for (int i = 0; i < headerNames.size(); i++) {
            headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headerNames.get(i)); // 데이터 추가
            headerCell.setCellStyle(headerXssfCellStyle); // 스타일 추가
        }

        /**
         * body data
         */

        Row bodyRow;
        Cell bodyCell;

        for (int i = 0; i < milestoneHistoryScores.size(); i++) {
            bodyRow = sheet.createRow(rowCount++);

            for (int j = 0; j < headerNames.size(); j++) {
                bodyCell = bodyRow.createCell(j);
                bodyCell.setCellStyle(bodyXssfCellStyle); // 스타일 추가
            }
            bodyRow.getCell(0).setCellValue(i + 1);
            bodyRow.getCell(1).setCellValue(milestoneHistoryScores.get(i).student().name());
            bodyRow.getCell(2).setCellValue(milestoneHistoryScores.get(i).student().id());
            final int totalScore = milestoneHistoryScores.get(i).milestoneScores().values().stream()
                    .flatMapToInt(
                            scores -> scores.stream().mapToInt(score -> Math.min(score.score(), score.limitScore())))
                    .sum();
            bodyRow.getCell(3).setCellStyle(totalScoreStyle);
            bodyRow.getCell(3).setCellValue(totalScore);

            int number = 4;
            for (Map.Entry<MilestoneGroup, List<MilestoneScoreOfStudentResponse>> entry : milestoneHistoryScores.get(i)
                    .milestoneScores().entrySet()) {
                for (MilestoneScoreOfStudentResponse milestoneScore : entry.getValue()) {
                    bodyRow.getCell(number++)
                            .setCellValue(Math.min(milestoneScore.score(), milestoneScore.limitScore()));
                }
                bodyRow.getCell(number).setCellStyle(subTotalScoreStyle);
                bodyRow.getCell(number++).setCellValue(entry.getValue().stream()
                        .mapToInt(milestoneScore -> Math.min(milestoneScore.score(), milestoneScore.limitScore()))
                        .sum());
            }
        }

        try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            workbook.write(bos);
            workbook.close();
            return bos.toByteArray();
        } catch (IOException e) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.CANNOT_OPEN_FILE);
        }
    }

    private XSSFCellStyle createTotalScoreStyle(Workbook workbook) {
        XSSFCellStyle highlightedCellStyle = (XSSFCellStyle) workbook.createCellStyle();

        highlightedCellStyle.setBorderLeft(BorderStyle.THIN);
        highlightedCellStyle.setBorderRight(BorderStyle.THIN);
        highlightedCellStyle.setBorderTop(BorderStyle.THIN);
        highlightedCellStyle.setBorderBottom(BorderStyle.THIN);

        highlightedCellStyle.setFillForegroundColor(
                new XSSFColor(new byte[]{(byte) 9, (byte) 93, (byte) 179}, null)); // Light yellow color
        highlightedCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFFont highlightedFont = (XSSFFont) workbook.createFont();
        highlightedFont.setColor(new XSSFColor(new byte[]{(byte) 255, (byte) 255, (byte) 255}, null)); // Red color
        highlightedFont.setBold(true); // Optional: Make the font bold
        highlightedCellStyle.setFont(highlightedFont);
        return highlightedCellStyle;
    }

    private XSSFCellStyle createSubTotalScoreStyle(Workbook workbook) {
        XSSFCellStyle highlightedCellStyle = (XSSFCellStyle) workbook.createCellStyle();

        highlightedCellStyle.setBorderLeft(BorderStyle.THIN);
        highlightedCellStyle.setBorderRight(BorderStyle.THIN);
        highlightedCellStyle.setBorderTop(BorderStyle.THIN);
        highlightedCellStyle.setBorderBottom(BorderStyle.THIN);

        highlightedCellStyle.setFillForegroundColor(
                new XSSFColor(new byte[]{(byte) 227, (byte) 242, (byte) 253}, null)); // Light yellow color
        highlightedCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return highlightedCellStyle;
    }
}
