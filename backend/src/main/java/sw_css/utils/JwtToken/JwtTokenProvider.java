package sw_css.utils.JwtToken;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import sw_css.utils.JwtToken.exception.JwtTokenException;
import sw_css.utils.JwtToken.exception.JwtTokenExceptionType;

@Component
public class JwtTokenProvider {

    private static final Long TOKEN_VALID_MILLISECOND = 10 * 60 * 60 * 1000L; // 10시간

    final Key secretKey;

    public JwtTokenProvider(@Value("${spring.jwt.secret}") String secretKey) {
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String createToken(Long userPk, String role) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(userPk));
        claims.put("role", role);

        Date now = new Date();

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + TOKEN_VALID_MILLISECOND))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey).build()
                    .parseClaimsJws(removeBearer(token));
            return !claims.getBody().getExpiration().before(new Date());
        } catch (MalformedJwtException e) {
            throw new JwtTokenException(JwtTokenExceptionType.JWT_TOKEN_MALFORMED);
        } catch (ExpiredJwtException e) {
            throw new JwtTokenException(JwtTokenExceptionType.JWT_TOKEN_EXPIRED);
        } catch (UnsupportedJwtException e) {
            throw new JwtTokenException(JwtTokenExceptionType.JWT_TOKEN_UNSUPPORTED);
        } catch (SignatureException e) {
            throw new JwtTokenException(JwtTokenExceptionType.JWT_TOKEN_WRONG_SIGNATURE);
        } catch (IllegalArgumentException e) {
            throw new JwtTokenException(JwtTokenExceptionType.JWT_TOKEN_EMPTY);
        } catch (Exception e) {
            throw new JwtTokenException(JwtTokenExceptionType.JWT_TOKEN_UNKNOWN);
        }
    }

    public Long getUserId(String token) {
        return Long.parseLong(getClaim(token).getSubject());
    }

    private Claims getClaim(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(removeBearer(token))
                .getBody();
    }

    private String removeBearer(String token) {
        return token.replace("Bearer", "").trim();
    }
}
