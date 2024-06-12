package sw_css.admin.milestone.domain;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MilestoneHistoryExcelData {
    private final Long milestoneId;
    private final Long studentId;
    private final String description;
    private final Integer count;
    private final LocalDate activatedAt;
}
