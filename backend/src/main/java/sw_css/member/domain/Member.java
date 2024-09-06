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
import sw_css.base.BaseEntity;
import sw_css.member.domain.embedded.Password;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
    @Id
    @Setter(AccessLevel.PUBLIC)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Setter(AccessLevel.PUBLIC)
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phoneNumber;

    @Setter(AccessLevel.PUBLIC)
    @Column(nullable = false)
    private boolean isDeleted;

    public Member(String email, String name, String password, String phoneNumber, boolean isDeleted) {
        this(null, email, name, password, phoneNumber, isDeleted);
    }

    public boolean isWrongPassword(String rawPassword) {
        return !Password.matches(rawPassword, password);
    }

}
