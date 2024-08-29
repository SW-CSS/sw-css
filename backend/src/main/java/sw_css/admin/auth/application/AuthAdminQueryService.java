package sw_css.admin.auth.application;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import sw_css.admin.auth.application.dto.request.RegisterRequest;
import sw_css.admin.auth.domain.AdminRegisterExcelData;
import sw_css.admin.auth.exception.AdminAuthException;
import sw_css.admin.auth.exception.AdminAuthExceptionType;
import sw_css.auth.application.AuthCheckDuplicateService;
import sw_css.auth.application.dto.response.CheckDuplicateResponse;
import sw_css.member.domain.repository.FacultyMemberRepository;
import sw_css.member.domain.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthAdminQueryService {

    private final MemberRepository memberRepository;
    private final FacultyMemberRepository facultyMemberRepository;
    private final AuthCheckDuplicateService authCheckDuplicateService;

    public Long registerFaculty(RegisterRequest request) {
        isDuplicateEmail(request.email());

        final long memberId = memberRepository.save(request.toMember()).getId();
        facultyMemberRepository.save(request.toFacultyMember(memberId));

        return memberId;
    }

    private void isDuplicateEmail(String email) {
        CheckDuplicateResponse.from(authCheckDuplicateService.isDuplicateEmail(email));
    }

}
