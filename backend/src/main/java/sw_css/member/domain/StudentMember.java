package sw_css.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sw_css.base.BaseEntity;
import sw_css.major.domain.Major;

@Entity
@Getter
@Setter(AccessLevel.PUBLIC)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudentMember extends BaseEntity {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_id", nullable = false)
    private Major major;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "minor_id")
    private Major minor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "double_major_id")
    private Major doubleMajor;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CareerType career;

    @Column(nullable = false)
    private String careerDetail;

    public StudentMember(final Long id) {
        this(id, null, null, null, null, null, null);
    }

    public void setDetailInfo(final Major major, final Major minor, final Major doubleMajor, final CareerType career, final String careerDetail) {
        this.major = major;
        this.minor = minor;
        this.doubleMajor = doubleMajor;
        this.career = career;
        this.careerDetail = careerDetail;
    }
}
