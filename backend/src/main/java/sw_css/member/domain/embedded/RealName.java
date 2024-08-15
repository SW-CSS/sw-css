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
@EqualsAndHashCode(of = {"realName"})
public class RealName {
    public static final String NAME_INVALID = "실명은 2~20자 한글, 영어만 가능합니다.";
    public static final String NAME_REGEX = "^[a-zA-Z가-힣]{2,20}";

    private static final Pattern NAME_FORMAT = Pattern.compile(NAME_REGEX);

    private String realName;

    public String get() {
        return this.realName;
    }

    private static boolean isInvalidFormat(String rawName) {
        return !NAME_FORMAT.matcher(rawName).find();
    }
}
