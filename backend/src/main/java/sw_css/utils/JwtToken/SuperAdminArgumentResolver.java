package sw_css.utils.JwtToken;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import sw_css.member.domain.Member;
import sw_css.member.domain.repository.FacultyMemberRepository;
import sw_css.member.domain.repository.MemberRepository;
import sw_css.member.exception.MemberException;
import sw_css.member.exception.MemberExceptionType;
import sw_css.utils.JwtToken.exception.JwtTokenException;
import sw_css.utils.JwtToken.exception.JwtTokenExceptionType;
import sw_css.utils.annotation.SuperAdminInterface;

@Component
@RequiredArgsConstructor
public class SuperAdminArgumentResolver implements HandlerMethodArgumentResolver {
    private final MemberRepository memberRepository;
    private final FacultyMemberRepository facultyMemberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(SuperAdminInterface.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest httpServletRequest = webRequest.getNativeRequest(HttpServletRequest.class);

        if (httpServletRequest == null) {
            throw new JwtTokenException(JwtTokenExceptionType.JWT_TOKEN_INACCESSIBLE);
        }

        String token = httpServletRequest.getHeader("Authorization");
        if (token == null || token.trim().isEmpty()) {
            throw new JwtTokenException(JwtTokenExceptionType.JWT_TOKEN_EMPTY);
        }

        jwtTokenProvider.validateToken(token);

        long userId = jwtTokenProvider.getUserId(token);
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new MemberException(MemberExceptionType.MEMBER_NOT_FOUND));

        if (member.getId() != 1) {
            throw new JwtTokenException(JwtTokenExceptionType.JWT_TOKEN_EMPTY);
        }

        return facultyMemberRepository.findByMemberId(member.getId())
                .orElseThrow(() -> new JwtTokenException(JwtTokenExceptionType.JWT_TOKEN_INACCESSIBLE));
    }
}

