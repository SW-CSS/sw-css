package sw_css.member.domain.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.member.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);

    Optional<Member> findByEmail(String email);
}
