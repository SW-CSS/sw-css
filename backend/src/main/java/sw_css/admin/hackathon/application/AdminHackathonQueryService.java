package sw_css.admin.hackathon.application;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonDetailResponse;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonResponse;
import sw_css.admin.hackathon.domain.HackathonStatus;
import sw_css.admin.hackathon.exception.AdminHackathonException;
import sw_css.admin.hackathon.exception.AdminHackathonExceptionType;
import sw_css.hackathon.domain.Hackathon;
import sw_css.hackathon.domain.HackathonTeam;
import sw_css.hackathon.domain.repository.HackathonRepository;
import sw_css.hackathon.domain.repository.HackathonTeamRepository;
import sw_css.hackathon.domain.repository.HackathonTeamVoteRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminHackathonQueryService {
    private final HackathonRepository hackathonRepository;
    private final HackathonTeamRepository hackathonTeamRepository;
    private final HackathonTeamVoteRepository hackathonTeamVoteRepository;

    public Page<AdminHackathonResponse> findAllHackathons(Pageable pageable,
                                                          final String name,
                                                          final String visibleStatus) {
        Sort sort = Sort.by(Sort.Order.desc("hackathonStartDate"));
        Pageable pageableWithSort = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        if(name != null && visibleStatus != null) {
            Page<Hackathon> hackathons =  hackathonRepository.findByNameContainingAndVisibleStatus(name, visibleStatus.equals(HackathonStatus.ACTIVE.toString()), pageableWithSort);
            return AdminHackathonResponse.from(hackathons);
        }
        if(name != null) {
            Page<Hackathon> hackathons = hackathonRepository.findByNameContaining(name, pageableWithSort);
            return AdminHackathonResponse.from(hackathons);
        }
        if(visibleStatus != null) {
            Page<Hackathon> hackathons =  hackathonRepository.findByVisibleStatus(visibleStatus.equals(HackathonStatus.ACTIVE.toString()), pageableWithSort);
            return AdminHackathonResponse.from(hackathons);
        }
        Page<Hackathon> hackathons = hackathonRepository.findAll(pageableWithSort);
        return AdminHackathonResponse.from(hackathons);
    }

    public AdminHackathonDetailResponse findHackathonById(final Long id) {
        Hackathon hackathon = hackathonRepository.findById(id).orElseThrow(
                () -> new AdminHackathonException(AdminHackathonExceptionType.NOT_FOUND_HACKATHON));

        return AdminHackathonDetailResponse.of(hackathon);
    }

    public byte[] downloadHackathonVotesById(final Long id) {
        Hackathon hackathon = hackathonRepository.findById(id).orElseThrow(
                () -> new AdminHackathonException(AdminHackathonExceptionType.NOT_FOUND_HACKATHON));

        final List<HackathonTeam> hackathonTeams = hackathonTeamRepository.findByHackathonIdSorted(hackathon.getId());

        return generateHackathonVoteExcelFile(hackathonTeams);
    }

    private byte[] generateHackathonVoteExcelFile(final List<HackathonTeam> hackathonTeams){
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("해커톤 투표 현황");
        sheet.setDefaultColumnWidth(20);

        XSSFFont headerXSSFFont = createHeaderFont(workbook);
        XSSFCellStyle headerXssfCellStyle = createHeaderStyle(workbook, headerXSSFFont);
        XSSFCellStyle bodyXssfCellStyle = createBodyStyle(workbook);

        int rowCount = 0; // 데이터가 저장될 행
        List<String> headerNames = new ArrayList<>(List.of("순위", "득표수", "팀명", "서비스명"));

        Row headerRow = sheet.createRow(rowCount++);
        Cell headerCell;
        for (int i = 0; i < headerNames.size(); i++) {
            headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headerNames.get(i)); // 데이터 추가
            headerCell.setCellStyle(headerXssfCellStyle); // 스타일 추가
        }

        Row bodyRow;
        Cell bodyCell;
        for (int i = 0; i < hackathonTeams.size(); i++) {
            bodyRow = sheet.createRow(rowCount++);

            for (int j = 0; j < headerNames.size(); j++) {
                bodyCell = bodyRow.createCell(j);
                bodyCell.setCellStyle(bodyXssfCellStyle);
            }
            bodyRow.getCell(0).setCellValue(i+1);
            Long voteCount = hackathonTeamVoteRepository.countByHackathonIdAndTeamId(
                    hackathonTeams.get(i).getHackathon().getId(), hackathonTeams.get(i).getId());
            bodyRow.getCell(1).setCellValue(voteCount);
            bodyRow.getCell(2).setCellValue(hackathonTeams.get(i).getName());
            bodyRow.getCell(3).setCellValue(hackathonTeams.get(i).getWork());
        }

        try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            workbook.write(bos);
            workbook.close();
            return bos.toByteArray();
        } catch (IOException e) {
            throw new AdminHackathonException(AdminHackathonExceptionType.CANNOT_OPEN_FILE);
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

}
