package sw_css.member.domain;

import java.util.Arrays;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import sw_css.member.exception.MemberException;
import sw_css.member.exception.MemberExceptionType;

@RequiredArgsConstructor
public enum FacultySearchField {
    FACULTY_ID(1),
    MEMBER_NAME(2),
    MEMBER_EMAIL(3);

    final Integer fieldId;

    public static FacultySearchField fromValue(final Integer fieldId) {
        return Arrays.stream(values()).filter(field -> Objects.equals(field.getFieldId(), fieldId)).findFirst()
                .orElseThrow(() -> new MemberException(
                        MemberExceptionType.INVALID_SEARCH_FIELD_ID));
    }

    public Integer getFieldId() {
        return fieldId;
    }
}
