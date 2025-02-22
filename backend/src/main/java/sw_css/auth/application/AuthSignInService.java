package sw_css.auth.application;


import jakarta.transaction.Transactional;
import java.security.SecureRandom;
import java.util.Optional;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sw_css.auth.application.dto.response.SignInResponse;
import sw_css.auth.exception.AuthException;
import sw_css.auth.exception.AuthExceptionType;
import sw_css.member.domain.FacultyMember;
import sw_css.member.domain.Member;
import sw_css.member.domain.Role;
import sw_css.member.domain.StudentMember;
import sw_css.member.domain.embedded.Password;
import sw_css.member.domain.repository.FacultyMemberRepository;
import sw_css.member.domain.repository.MemberRepository;
import sw_css.member.domain.repository.StudentMemberRepository;
import sw_css.utils.JwtToken.JwtTokenProvider;

@Service
@RequiredArgsConstructor
@Transactional(rollbackOn = Exception.class)
public class AuthSignInService {

    private static final SecureRandom RANDOM = new SecureRandom();

    private final StudentMemberRepository studentMemberRepository;
    private final FacultyMemberRepository facultyMemberRepository;
    private final MemberRepository memberRepository;
    private final AuthEmailService authEmailService;
    private final JwtTokenProvider jwtTokenProvider;

    public SignInResponse signIn(String email, String rawPassword) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException(AuthExceptionType.MEMBER_NOT_REGISTER));

        checkIsMemberDeleted(member);
        checkIsValidPassword(member, rawPassword);

        Object memberDetail = loadMemberDetail(member);
        if (memberDetail instanceof StudentMember studentMember) {
            String role = Role.ROLE_MEMBER.toString();
            String accessToken = jwtTokenProvider.createToken(member.getId(), role);

            return SignInResponse.of(member, studentMember.getId(), role, false, accessToken);

        } else if (memberDetail instanceof FacultyMember facultyMember) {
            String role = Role.ROLE_ADMIN.toString();
            String accessToken = jwtTokenProvider.createToken(member.getId(), role);

            return SignInResponse.of(member, facultyMember.getId(), role, true, accessToken);
        }

        throw new AuthException(AuthExceptionType.MEMBER_NOT_REGISTER);
    }

    public void resetPassword(String email, String name) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException(AuthExceptionType.MEMBER_EMAIL_NOT_FOUND));

        if (!member.getName().equals(name)) {
            throw new AuthException(AuthExceptionType.MEMBER_NOT_MATCH_EMAIL_AND_NAME);
        }

        String newPassword = generateAvailablePassword();
        String encodedPassword = Password.encode(newPassword);

        member.setPassword(encodedPassword);
        memberRepository.save(member);

        authEmailService.sendNewPassword(email, newPassword);
    }

    private Object loadMemberDetail(Member member) {
        Long memberId = member.getId();
        Optional<StudentMember> studentMember = studentMemberRepository.findByMemberId(memberId);
        if (studentMember.isPresent()) {
            return studentMember.get();
        }

        Optional<FacultyMember> facultyMember = facultyMemberRepository.findByMemberId(memberId);
        if (facultyMember.isPresent()) {
            return facultyMember.get();
        }
        throw new AuthException(AuthExceptionType.MEMBER_NOT_FOUND);
    }

    private static String generateAvailablePassword() {
        String newPassword;
        do {
            newPassword = generatePassword();
        } while (!Pattern.matches(Password.PASSWORD_REGEX, newPassword));

        return newPassword;
    }

    private static String generatePassword() {
        char leftLimit = '!';
        char rightLimit = 'z';

        return RANDOM.ints(leftLimit, rightLimit + 1)
                .filter(i -> Character.isAlphabetic(i) || Character.isDigit(i) || isAvailableSpecialCharacter(i))
                .limit(AuthEmailService.AUTH_CODE_LENGTH)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    private static Boolean isAvailableSpecialCharacter(int i) {
        char c = (char) i;
        String availableSpecialCharacters = "!@#%^&*";
        return availableSpecialCharacters.indexOf(c) != -1;
    }

    private void checkIsMemberDeleted(Member member) {
        if (!member.isDeleted()) {
            return;
        }
        throw new AuthException(AuthExceptionType.MEMBER_NOT_REGISTER);
    }

    private void checkIsValidPassword(Member member, String password) {
        if (!member.isWrongPassword(password)) {
            return;
        }
        throw new AuthException(AuthExceptionType.MEMBER_WRONG_ID_OR_PASSWORD);
    }
}
