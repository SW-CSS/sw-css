package sw_css.auth.application;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import sw_css.utils.JwtToken.JwtTokenProvider;
import sw_css.utils.RedisUtil;

@RequiredArgsConstructor
@Service
public class AuthCookieService {

    private static final int TOKEN_VALID_SECOND = 10 * 60 * 60;
    private static final String TOKEN_NAME = "X-AUTH-TOKEN";

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisUtil redisUtil;

    public void setNewCookieInResponse(Long userId, String role, String userAgent, HttpServletResponse response) {
        String newRefreshToken = jwtTokenProvider.createToken(userId, role);
        setTokenInCookie(response, newRefreshToken, TOKEN_VALID_SECOND);

        redisUtil.setDateExpire(JwtTokenProvider.getRefreshTokenKeyForRedis(String.valueOf(userId), userAgent),
                newRefreshToken,
                TOKEN_VALID_SECOND);
    }

    public void setCookieExpiredWithRedis(Long userId, HttpServletResponse response) {
        setCookieExpired(response);
        redisUtil.deleteData(String.valueOf(userId));
    }

    public void setCookieExpired(HttpServletResponse response) {
        setTokenInCookie(response, "", 0);
    }

    private void setTokenInCookie(HttpServletResponse httpResponse, String token, int expiredSeconds) {
        ResponseCookie cookie = ResponseCookie.from(TOKEN_NAME, token)
                .path("/")
                .sameSite("None")
                .httpOnly(true)
                .maxAge(expiredSeconds)
                .secure(true)
                .build();
        httpResponse.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

}
