package sw_css.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;
import sw_css.base.BaseEntity;
import sw_css.member.domain.embedded.Password;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLRestriction("is_deleted = false")
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Setter(AccessLevel.PUBLIC)
    @Column(nullable = false)
    private String name;

    @Setter(AccessLevel.PUBLIC)
    @Column(nullable = false)
    private String password;

    @Setter(AccessLevel.PUBLIC)
    @Column(nullable = false)
    private String phoneNumber;

    @Setter(AccessLevel.PUBLIC)
    @Column(nullable = false)
    private boolean isDeleted;

    public Member(String email, String name, String password, String phoneNumber) {
        this(null, email, name, password, phoneNumber, false);
    }

    public Member(Long id, String email, String name, String password, String phoneNumber) {
        this(id, email, name, password, phoneNumber, false);
    }

    public boolean isWrongPassword(String rawPassword) {
        return !Password.matches(rawPassword, password);
    }

    public void delete() {
        this.isDeleted = true;
    }

}
