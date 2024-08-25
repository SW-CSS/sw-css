package sw_css.member.domain.embedded;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Embeddable;
import java.util.regex.Pattern;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@EqualsAndHashCode(of = {"phoneNumber"})
public class PhoneNumber {
    public static final String PHONE_NUMBER_INVALID = "전화번호는 특수기호가 없는 숫자만 가능합니다.";
    public static final String PHONE_NUMBER_REGEX = "^([0-9]{10,11})$";

    private static final Pattern PHONE_NUMBER_FORMAT = Pattern.compile(PHONE_NUMBER_REGEX);

    private String phoneNumber;

    public String get() {
        return this.phoneNumber;
    }

    private static boolean isInvalidFormat(String raqPhoneNumber) {
        return !PHONE_NUMBER_FORMAT.matcher(raqPhoneNumber).find();
    }
}
