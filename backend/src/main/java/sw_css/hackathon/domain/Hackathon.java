package sw_css.hackathon.domain;

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
import org.hibernate.annotations.SQLRestriction;
import sw_css.milestone.domain.MilestoneCategory;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLRestriction("is_deleted = false")
public class Hackathon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDate applyStartDate;

    @Column(nullable = false)
    private LocalDate applyEndDate;

    @Column(nullable = false)
    private LocalDate hackathonStartDate;

    @Column(nullable = false)
    private LocalDate hackathonEndDate;

    @Column
    private String imageUrl;

    @Column(nullable = false)
    private boolean visibleStatus;

    @Column(nullable = false)
    private Boolean isDeleted;

    public Hackathon(final String name, final String description, final String password, final LocalDate applyStartDate, final LocalDate applyEndDate, final LocalDate hackathonStartDate, final LocalDate hackathonEndDate, final String imageUrl) {
        this(null, name, description, password, applyStartDate, applyEndDate, hackathonStartDate, hackathonEndDate, imageUrl, false, false);
    }

    public void delete() {
        isDeleted = true;
    }
}
