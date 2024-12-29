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
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;
import sw_css.member.domain.StudentMember;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLRestriction("is_deleted = false")
public class HackathonTeamMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hackathon_id", nullable = false)
    private Hackathon hackathon;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private HackathonTeam team;

    @Column(nullable = false)
    private Long studentId;

    @Column(nullable = false)
    @Setter(AccessLevel.PUBLIC)
    private String role;

    @Column(nullable = false)
    private Boolean isLeader;

    @Column(nullable = false)
    @Setter(AccessLevel.PUBLIC)
    private Boolean isDeleted;

    public HackathonTeamMember(Hackathon hackathon, HackathonTeam team, Long studentId, String role, Boolean isLeader) {
        this(null, hackathon, team, studentId, role, isLeader, false);
    }

    public HackathonTeamMember(Hackathon hackathon, HackathonTeam team, Long studentId, String role) {
        this(null, hackathon, team, studentId, role, false, false);
    }
}
