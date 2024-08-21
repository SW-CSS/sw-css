package sw_css.utils.JwtToken;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import sw_css.member.domain.repository.MemberRepository;
import sw_css.member.exception.MemberException;
import sw_css.member.exception.MemberExceptionType;
import sw_css.utils.JwtToken.exception.JwtTokenException;
import sw_css.utils.JwtToken.exception.JwtTokenExceptionType;
import sw_css.utils.annotation.JwtAuthorization;

@Component
@RequiredArgsConstructor
public class JwtAuthorizationArgumentResolver implements HandlerMethodArgumentResolver {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(JwtAuthorization.class);
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
        return memberRepository.findById(userId)
                .orElseThrow(() -> new MemberException(MemberExceptionType.MEMBER_NOT_FOUND));
    }
}
