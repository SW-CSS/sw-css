package sw_css.milestone.domain;

import java.util.Arrays;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;

@RequiredArgsConstructor
public enum MilestoneHistorySearchField {
    STUDENT_ID(1),
    STUDENT_NAME(2),
    MILESTONE_NAME(3),
    DESCRIPTION(4);

    final Integer fieldId;

    public static MilestoneHistorySearchField fromValue(final Integer fieldId) {
        return Arrays.stream(values()).filter(field -> Objects.equals(field.getFieldId(), fieldId)).findFirst()
                .orElseThrow(() -> new MilestoneHistoryException(
                        MilestoneHistoryExceptionType.INVALID_SEARCH_FIELD_ID));
    }

    public Integer getFieldId() {
        return fieldId;
    }
}
