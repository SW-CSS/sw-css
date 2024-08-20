package sw_css.auth.application;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import sw_css.auth.application.dto.response.SignInResponse;
import sw_css.auth.exception.AuthException;
import sw_css.auth.exception.AuthExceptionType;
import sw_css.member.domain.Member;
import sw_css.member.domain.Role;
import sw_css.member.domain.repository.FacultyMemberRepository;
import sw_css.member.domain.repository.MemberRepository;
import sw_css.member.domain.repository.StudentMemberRepository;

@Service
@RequiredArgsConstructor
public class AuthSignInService {

    private final StudentMemberRepository studentMemberRepository;
    private final FacultyMemberRepository facultyMemberRepository;
    private final MemberRepository memberRepository;
    private final AuthCookieService authCookieService;

    @Transactional
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
}
