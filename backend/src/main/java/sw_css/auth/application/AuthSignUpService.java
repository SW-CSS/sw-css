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
import sw_css.member.domain.CareerType;
import sw_css.member.domain.Member;
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
        Member member = memberRepository.findByEmail(request.email()).orElse(null);
        if (member != null) {
            if (!member.isDeleted()) {
                throw new AuthException(AuthExceptionType.MEMBER_EMAIL_DUPLICATE);
            }

            return saveExistMember(request, member);
        }

        checkIsDuplicateEmail(request.email());
        checkIsDuplicateStudentId(request.student_id());

        checkIsValidAuthCode(request.email(), request.auth_code());

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

    private long saveExistMember(SignUpRequest request, Member oldMember) {
        checkIsValidAuthCode(request.email(), request.auth_code());

        Major major = majorRepository.findById(request.major_id())
                .orElseThrow(() -> new AuthException(AuthExceptionType.MAJOR_NOT_EXIST));
        Major minor = request.minor_id() == null ? null : majorRepository.findById(request.minor_id())
                .orElseThrow(() -> new AuthException(AuthExceptionType.MAJOR_NOT_EXIST));
        Major doubleMinor =
                request.double_major_id() == null ? null : majorRepository.findById(request.double_major_id())
                        .orElseThrow(() -> new AuthException(AuthExceptionType.MAJOR_NOT_EXIST));

        Member newMember = request.toMember();
        newMember.setId(oldMember.getId());
        memberRepository.save(newMember);

        StudentMember oldStudentMember = studentMemberRepository.findByMemberId(newMember.getId()).orElse(null);
        if (oldStudentMember == null) {
            final StudentMember newStudentMember = request.toStudentMember(newMember.getId(), major, minor,
                    doubleMinor);
            studentMemberRepository.save(newStudentMember);
        } else {
            final CareerType careerType = CareerType.valueOf(request.career());

            oldStudentMember.setMajor(major);
            oldStudentMember.setMinor(minor);
            oldStudentMember.setDoubleMajor(doubleMinor);
            oldStudentMember.setCareer(careerType);
            oldStudentMember.setCareerDetail(request.career_detail());
            studentMemberRepository.save(oldStudentMember);
        }

        return newMember.getId();
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

    private void checkIsValidAuthCode(String email, String authCode) {
        String actualAuthCode = loadActualAuthCode(email);
        checkAuthCodeMatch(authCode, actualAuthCode);
    }
}
