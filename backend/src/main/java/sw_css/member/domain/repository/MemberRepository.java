package sw_css.member.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.member.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);
}
