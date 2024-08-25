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
@EqualsAndHashCode(of = {"studentId"})
public class StudentId {
    public static final String STUDENT_ID_INVALID = "학번은 9자리의 숫자만 가능합니다.";
    public static final String STUDENT_ID_REGEX = "^[\\d]{9}$";

    private static final Pattern STUDENT_ID_FORMAT = Pattern.compile(STUDENT_ID_REGEX);

    private String studentId;

    public String get() {
        return this.studentId;
    }

    private static boolean isInvalidFormat(String rawStudentId) {
        return !STUDENT_ID_FORMAT.matcher(rawStudentId).find();
    }
}
