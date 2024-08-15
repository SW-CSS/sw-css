package sw_css.auth.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.auth.application.dto.request.SignUpRequest;
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

    @Transactional
    public long signUp(SignUpRequest request) {
        checkIsDuplicateEmail(request.email());
        checkIsDuplicateStudentId(request.studentId());
        checkIsDuplicatePhoneNumber(request.phoneNumber());

        Major major = majorRepository.findById(request.majorId())
                .orElseThrow(() -> new AuthException(AuthExceptionType.MAJOR_NOT_EXIST));
        Major minor = request.minorId() == null ? null : majorRepository.findById(request.minorId())
                .orElseThrow(() -> new AuthException(AuthExceptionType.MAJOR_NOT_EXIST));
        Major doubleMinor = request.doubleMajorId() == null ? null : majorRepository.findById(request.doubleMajorId())
                .orElseThrow(() -> new AuthException(AuthExceptionType.MAJOR_NOT_EXIST));

        final long memberId = memberRepository.save(request.toMember()).getId();
        final StudentMember studentMember = request.toStudentMember(memberId, major, minor, doubleMinor);

        studentMemberRepository.save(studentMember);

        return memberId;
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
}
