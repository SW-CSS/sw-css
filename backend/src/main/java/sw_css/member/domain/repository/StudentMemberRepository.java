package sw_css.member.domain.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.member.domain.StudentMember;

public interface StudentMemberRepository extends JpaRepository<StudentMember, Long> {
    boolean existsById(Number studentId);

    boolean existsByMemberId(Number memberId);

    Optional<StudentMember> findByMemberId(Number memberId);
}
