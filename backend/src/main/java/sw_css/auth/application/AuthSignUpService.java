package sw_css.auth.application;

import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.auth.application.dto.request.SignUpRequest;
import sw_css.auth.application.dto.response.CheckDuplicateResponse;
import sw_css.auth.domain.repository.EmailAuthRedisRepository;
import sw_css.auth.exception.AuthException;
import sw_css.auth.exception.AuthExceptionType;
import sw_css.major.domain.Major;
import sw_css.major.domain.repository.MajorRepository;
import sw_css.member.domain.StudentMember;
import sw_css.member.domain.repository.MemberRepository;
import sw_css.member.domain.repository.StudentMemberRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthSignUpService {

    private final MemberRepository memberRepository;
    private final StudentMemberRepository studentMemberRepository;
    private final AuthCheckDuplicateService authCheckDuplicateService;
    private final MajorRepository majorRepository;
    private final EmailAuthRedisRepository emailAuthRedisRepository;

    public long signUp(SignUpRequest request) {
        checkIsDuplicateEmail(request.email());
        checkIsDuplicateStudentId(request.student_id());

        String actualAuthCode = loadActualAuthCode(request.email());
        checkAuthCodeMatch(request.auth_code(), actualAuthCode);

        Major major = majorRepository.findById(request.major_id())
                .orElseThrow(() -> new AuthException(AuthExceptionType.MAJOR_NOT_EXIST));
        Major minor = request.minor_id() == null ? null : majorRepository.findById(request.minor_id())
                .orElseThrow(() -> new AuthException(AuthExceptionType.MAJOR_NOT_EXIST));
        Major doubleMinor =
                request.double_major_id() == null ? null : majorRepository.findById(request.double_major_id())
                        .orElseThrow(() -> new AuthException(AuthExceptionType.MAJOR_NOT_EXIST));

        final long memberId = memberRepository.save(request.toMember()).getId();
        final StudentMember studentMember = request.toStudentMember(memberId, major, minor, doubleMinor);

        studentMemberRepository.save(studentMember);

        return memberId;
    }

    public CheckDuplicateResponse isDuplicateStudentId(String studentId) {
        return CheckDuplicateResponse.from(authCheckDuplicateService.isDuplicateStudentID(studentId));
    }

    private void checkIsDuplicateEmail(String email) {
        if (authCheckDuplicateService.isDuplicateEmail(email)) {
            throw new AuthException(AuthExceptionType.MEMBER_EMAIL_DUPLICATE);
        }
    }

    private void checkIsDuplicateStudentId(String studentId) {
        if (authCheckDuplicateService.isDuplicateStudentID(studentId)) {
            throw new AuthException(AuthExceptionType.MEMBER_STUDENT_ID_DUPLICATE);
        }
    }

    private void checkIsDuplicatePhoneNumber(String phoneNumber) {
        if (authCheckDuplicateService.isDuplicatePhoneNumber(phoneNumber)) {
            throw new AuthException(AuthExceptionType.MEMBER_PHONE_NUMBER_DUPLICATE);
        }
    }

    private void checkAuthCodeMatch(String requestAuthCode, String actualAuthCode) {
        if (!actualAuthCode.equals(requestAuthCode)) {
            throw new AuthException(AuthExceptionType.AUTH_CODE_MISMATCH);
        }
    }

    private String loadActualAuthCode(@Email String email) {
        return emailAuthRedisRepository.findById(email)
                .orElseThrow(() -> new AuthException(AuthExceptionType.AUTH_CODE_EXPIRED))
                .getAuthCode();
    }
}
