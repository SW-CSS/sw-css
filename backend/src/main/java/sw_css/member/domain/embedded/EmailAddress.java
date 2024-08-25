package sw_css.member.domain.embedded;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Embeddable;
import java.util.regex.Pattern;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
public class EmailAddress {
    public static final String EMAIL_ADDRESS_INVALID = "이메일은 부산대 이메일만 가능합니다.";
    public static final String EMAIL_ADDRESS_REGEX = ".*@pusan\\.ac\\.kr$";

    private static final Pattern EMAIL_ADDRESS_FORMAT = Pattern.compile(EMAIL_ADDRESS_REGEX);

    private String emailAddress;

    public String get() {
        return this.emailAddress;
    }

    private static boolean isInvalidFormat(String rawEmailAddress) {
        return !EMAIL_ADDRESS_FORMAT.matcher(rawEmailAddress).find();
    }
}
