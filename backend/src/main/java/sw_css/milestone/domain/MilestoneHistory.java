package sw_css.milestone.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
import sw_css.base.BaseEntity;

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

    @Column(nullable = false)
    private Integer studentId;

    @Column(nullable = false)
    private String description;

    @Column
    private String fileUrl;

    @Column(nullable = false)
    private MilestoneStatus status;

    @Column
    private String rejectReason;

    @Column(nullable = false)
    private Integer count;

    @Column(updatable = false)
    private LocalDate activatedAt;

    public MilestoneHistory(final Milestone milestone, final Integer studentId, final String description,
                            final String fileUrl, final Integer count, final LocalDate activatedAt) {
        this(null, milestone, studentId, description, fileUrl, MilestoneStatus.PENDING, null, count, activatedAt);
    }
}
