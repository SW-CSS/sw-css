package sw_css.member.domain.embedded;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Embeddable;
import java.util.regex.Pattern;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Embeddable
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@EqualsAndHashCode(of = {"password"})
public class Password {
    public static final int HASHED_PASSWORD_MAX_LENGTH = 512;
    public static final String PASSWORD_INVALID = "비밀번호는 6자에서 15자 이내의 영문, 숫자, 특수문자만 가능합니다.";
    public static final String PASSWORD_REGEX = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W)[A-Za-z\\d\\W]{6,15}$";

    private static final Pattern PASSWORD_FORMAT = Pattern.compile(PASSWORD_REGEX);

    private String password;

    public static String encode(String rawPassword) {
        return new BCryptPasswordEncoder().encode(rawPassword);
    }

    public static boolean matches(String rawPassword, String encodedPassword) {
        return new BCryptPasswordEncoder().matches(rawPassword, encodedPassword);
    }

    public String get() {
        return this.password;
    }

    private static boolean isInvalidFormat(String rawPassword) {
        return !PASSWORD_FORMAT.matcher(rawPassword).find();
    }
}
