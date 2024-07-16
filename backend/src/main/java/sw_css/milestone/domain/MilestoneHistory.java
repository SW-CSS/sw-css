package sw_css.milestone.domain;

import jakarta.persistence.Column;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SqlResultSetMapping;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import sw_css.admin.milestone.domain.MilestoneHistoryExcelData;
import sw_css.admin.milestone.persistence.StudentAndMilestoneScoreInfo;
import sw_css.base.BaseEntity;
import sw_css.member.domain.StudentMember;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLRestriction("is_deleted = false")
@SQLDelete(sql = "UPDATE milestone_history SET is_deleted = true where id = ?")
@SqlResultSetMapping(
        name = "StudentAndMilestoneScoreInfoMapping",
        classes = @ConstructorResult(
                targetClass = StudentAndMilestoneScoreInfo.class,
                columns = {
                        @ColumnResult(name = "studentId", type = Long.class),
                        @ColumnResult(name = "studentName", type = String.class),
                        @ColumnResult(name = "categoryId", type = Long.class),
                        @ColumnResult(name = "categoryName", type = String.class),
                        @ColumnResult(name = "milestoneGroup", type = MilestoneGroup.class),
                        @ColumnResult(name = "score", type = Integer.class)
                }
        ))
public class MilestoneHistory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "milestone_id", nullable = false)
    private Milestone milestone;

    @Column(nullable = false)
    private Long studentId;

    @Column(nullable = false)
    private String description;

    @Column
    private String fileUrl;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MilestoneStatus status;

    @Column
    private String rejectReason;

    @Column(nullable = false)
    private Integer count;

    @Column(nullable = false)
    private LocalDate activatedAt;

    @Column(nullable = false)
    private Boolean isDeleted;

    public MilestoneHistory(final Milestone milestone, final StudentMember student, final String description,
                            final String fileUrl, final Integer count, final LocalDate activatedAt) {
        this(null, milestone, student.getId(), description, fileUrl, MilestoneStatus.PENDING, null, count, activatedAt,
                false);
    }

    public void delete() {
        isDeleted = true;
    }

    public void approve() {
        if (status != MilestoneStatus.PENDING) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.ALREADY_PROCESSED);
        }
        status = MilestoneStatus.APPROVED;
    }

    public void reject(final String rejectReason) {
        if (status != MilestoneStatus.PENDING) {
            throw new MilestoneHistoryException(MilestoneHistoryExceptionType.ALREADY_PROCESSED);
        }
        status = MilestoneStatus.REJECTED;
        this.rejectReason = rejectReason;
    }

    public static MilestoneHistory of(final MilestoneHistoryExcelData data, final Milestone milestone,
                                      final MilestoneStatus status) {
        return new MilestoneHistory(null, milestone, data.getStudentId(), data.getDescription(), null, status, null,
                data.getCount(),
                data.getActivatedAt(), false);
    }
}
