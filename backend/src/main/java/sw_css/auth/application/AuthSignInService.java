package sw_css.auth.application;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import java.security.SecureRandom;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import sw_css.auth.application.dto.response.SignInResponse;
import sw_css.auth.exception.AuthException;
import sw_css.auth.exception.AuthExceptionType;
import sw_css.member.domain.Member;
import sw_css.member.domain.Role;
import sw_css.member.domain.embedded.Password;
import sw_css.member.domain.repository.FacultyMemberRepository;
import sw_css.member.domain.repository.MemberRepository;
import sw_css.member.domain.repository.StudentMemberRepository;

@Service
@RequiredArgsConstructor
@Transactional(rollbackOn = Exception.class)
public class AuthSignInService {

    private static final SecureRandom RANDOM = new SecureRandom();

    private final StudentMemberRepository studentMemberRepository;
    private final FacultyMemberRepository facultyMemberRepository;
    private final MemberRepository memberRepository;
    private final AuthCookieService authCookieService;
    private final AuthEmailService authEmailService;

    public SignInResponse signIn(String email, String rawPassword, HttpServletRequest request,
                                 HttpServletResponse response) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException(AuthExceptionType.MEMBER_EMAIL_NOT_FOUND));

        if (member.isWrongPassword(rawPassword)) {
            throw new AuthException(AuthExceptionType.MEMBER_WRONG_ID_OR_PASSWORD);
        }

        String role = getMemberRole(member);
        if (role == null) {
            throw new AuthException(AuthExceptionType.MEMBER_NOT_FOUND);
        }
        authCookieService.setNewCookieInResponse(member.getId(), role, request.getHeader(HttpHeaders.USER_AGENT),
                response);
        return SignInResponse.of(member, role);
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

    private String getMemberRole(Member member) {
        Long memberId = member.getId();
        if (studentMemberRepository.existsByMemberId(memberId)) {
            return Role.ROLE_MEMBER.toString();
        }
        if (facultyMemberRepository.existsByMemberId(memberId)) {
            return Role.ROLE_ADMIN.toString();
        }
        return null;
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
}
