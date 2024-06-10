package sw_css.milestone.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sw_css.admin.milestone.domain.MilestoneHistoryExcelData;
import sw_css.base.BaseEntity;
import sw_css.member.domain.StudentMember;
import sw_css.milestone.exception.MilestoneHistoryException;
import sw_css.milestone.exception.MilestoneHistoryExceptionType;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MilestoneHistory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "milestone_id", nullable = false)
    private Milestone milestone;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private StudentMember student;

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
        this(null, milestone, student, description, fileUrl, MilestoneStatus.PENDING, null, count, activatedAt,
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

    public static MilestoneHistory from(final MilestoneHistoryExcelData data, final Milestone milestone,
                                        final StudentMember student) {
        return new MilestoneHistory(milestone, student, data.getDescription(), null, data.getCount(),
                data.getActivatedAt());
    }
}
