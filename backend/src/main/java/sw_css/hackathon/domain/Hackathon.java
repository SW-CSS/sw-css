package sw_css.hackathon.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@Setter
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
