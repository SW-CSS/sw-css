package sw_css.admin.auth.application;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import sw_css.admin.auth.application.dto.request.RegisterRequest;
import sw_css.admin.auth.exception.AdminAuthException;
import sw_css.admin.auth.exception.AdminAuthExceptionType;
import sw_css.auth.application.AuthCheckDuplicateService;
import sw_css.member.domain.FacultyMember;
import sw_css.member.domain.Member;
import sw_css.member.domain.embedded.EmailAddress;
import sw_css.member.domain.embedded.Password;
import sw_css.member.domain.embedded.RealName;
import sw_css.member.domain.repository.FacultyMemberRepository;
import sw_css.member.domain.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class AuthAdminQueryService {

    private final MemberRepository memberRepository;
    private final FacultyMemberRepository facultyMemberRepository;
    private final AuthCheckDuplicateService authCheckDuplicateService;

    @Value("${password.admin}")
    private String password;

    @Transactional
    public Long registerFaculty(RegisterRequest request) {
        checkIsDuplicateEmail(request.email());

        final String encodedPassword = Password.encode(password);

        final long memberId = memberRepository.save(request.toMember(encodedPassword)).getId();
        facultyMemberRepository.save(request.toFacultyMember(memberId, encodedPassword));

        return memberId;
    }

    public void registerFaculties(MultipartFile file) {
        final String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (extension == null || !(extension.equals("xlsx") || extension.equals("xls"))) {
            throw new AdminAuthException(AdminAuthExceptionType.NO_MATCH_EXTENSION);
        }

        final String encodedPassword = Password.encode(password);
        final List<Integer> failedData = new ArrayList<>();

        final Workbook workbook = generateWorkbook(file, extension);

        final Sheet worksheet = workbook.getSheetAt(0);
        for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
            final Row row = worksheet.getRow(i);

            final String email = row.getCell(0).getStringCellValue();
            final String name = row.getCell(1).getStringCellValue();

            if (isInvalidInput(email, name)) {
                failedData.add(i + 1);
                continue;
            }

            saveFaculty(email, name, encodedPassword);
        }

        checkFailedData(failedData);
    }

    private void checkIsDuplicateEmail(String email) {
        if (authCheckDuplicateService.isDuplicateEmail(email)) {
            throw new AdminAuthException(AdminAuthExceptionType.MEMBER_EMAIL_DUPLICATE);
        }
    }

    private Workbook generateWorkbook(final MultipartFile file, String extension) {
        try {
            if (extension.equals("xlsx")) {
                return new XSSFWorkbook(file.getInputStream());
            }
            return new HSSFWorkbook(file.getInputStream());
        } catch (final IOException exception) {
            throw new AdminAuthException(AdminAuthExceptionType.CANNOT_OPEN_FILE);
        }
    }

    private void saveFaculty(final String email, final String name, final String password) {
        Member member = new Member(email, name, password, "01000000000", false);

        final long memberId = memberRepository.save(member).getId();
        member.setId(memberId);

        FacultyMember facultyMember = new FacultyMember(null, member);
        facultyMemberRepository.save(facultyMember);
    }

    private boolean isInvalidInput(final String email, final String name) {
        if (Pattern.matches(EmailAddress.EMAIL_ADDRESS_REGEX, email) &&
                Pattern.matches(RealName.NAME_REGEX, name) &&
                !isDuplicateEmail(email)) {
            return false;
        }
        return true;
    }


    private boolean isDuplicateEmail(String email) {
        return authCheckDuplicateService.isDuplicateEmail(email);
    }

    private void checkFailedData(final List<Integer> failedData) {
        if (failedData.isEmpty()) {
            return;
        }

        String ids = failedData.stream()
                .map(Object::toString)
                .collect(Collectors.joining(", "));
        AdminAuthExceptionType exceptionType = AdminAuthExceptionType.FAILED_REGISTER_FACULTY;
        exceptionType.setErrorMessage(ids + "번째 줄의 관리자를 등록하는데 실패했습니다.");

        throw new AdminAuthException(exceptionType);
    }

}
