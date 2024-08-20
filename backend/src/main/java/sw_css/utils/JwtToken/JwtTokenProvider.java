package sw_css.utils.JwtToken;

import static sw_css.utils.JwtToken.JwtValidationType.EMPTY;
import static sw_css.utils.JwtToken.JwtValidationType.EXPIRED;
import static sw_css.utils.JwtToken.JwtValidationType.MALFORMED;
import static sw_css.utils.JwtToken.JwtValidationType.UNKNOWN;
import static sw_css.utils.JwtToken.JwtValidationType.UNSUPPORTED;
import static sw_css.utils.JwtToken.JwtValidationType.VALID;
import static sw_css.utils.JwtToken.JwtValidationType.WRONG_SIGNATURE;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private static final String ROLES = "roles";
    private static final String SEPARATOR = ",";
    private static final Long TOKEN_VALID_MILLISECOND = 10 * 60 * 60 * 1000L; // 10시간
    private static final String TOKEN_NAME = "X-AUTH-TOKEN";

    final Key secretKey;

    public JwtTokenProvider(@Value("${spring.jwt.secret}") String secretKey) {
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public static String getRefreshTokenKeyForRedis(String authId, String userAgent) {
        String encodedUserAgent = Base64.getEncoder().encodeToString((userAgent == null ? "" : userAgent).getBytes());
        return "refreshToken:" + authId + ":" + encodedUserAgent;
    }

    public String createToken(Long userPk, String role) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(userPk));
        claims.put(ROLES, role);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + TOKEN_VALID_MILLISECOND))
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = getClaim(token);
        List<String> roles = getRolesBy(claims);
        UserDetails userDetails = new JwtUserDetails(claims.getSubject(), roles);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public Long getUserId(String token) {
        return Long.parseLong(getClaim(token).getSubject());
    }

    public String resolveToken(HttpServletRequest req) {
        return req.getHeader(TOKEN_NAME);
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public TokenValidationResultDto tryCheckTokenValid(HttpServletRequest req) {
        try {
            String token = resolveToken(req);
            getUserId(token);
            return TokenValidationResultDto.of(true, VALID, token);
        } catch (MalformedJwtException e) {
            return TokenValidationResultDto.of(false, MALFORMED);
        } catch (ExpiredJwtException e) {
            return TokenValidationResultDto.of(false, EXPIRED);
        } catch (UnsupportedJwtException e) {
            return TokenValidationResultDto.of(false, UNSUPPORTED);
        } catch (SignatureException e) {
            return TokenValidationResultDto.of(false, WRONG_SIGNATURE);
        } catch (IllegalArgumentException e) {
            return TokenValidationResultDto.of(false, EMPTY);
        } catch (Exception e) {
            return TokenValidationResultDto.of(false, UNKNOWN);
        }
    }

    private Claims getClaim(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private static List<String> getRolesBy(Claims claims) {
        return List.of(claims.get(ROLES)
                .toString()
                .split(SEPARATOR));
    }
}
