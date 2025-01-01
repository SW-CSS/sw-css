package sw_css.hackathon.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;
import sw_css.member.domain.Member;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLRestriction("is_deleted = false")
public class HackathonTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hackathon_id", nullable = false)
    private Hackathon hackathon;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String work;

    @Column(nullable = false)
    private String githubUrl;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String prize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private Member createdBy;

    @Column(nullable = false)
    private boolean isDeleted;

    public HackathonTeam(Hackathon hackathon, String name, String work, String githubUrl, String imageUrl, Member createdBy) {
        this(null, hackathon, name, work, githubUrl, imageUrl, HackathonPrize.NONE_PRIZE.toString(), createdBy, false);
    }

    public void delete() {
        isDeleted = true;
    }
}
