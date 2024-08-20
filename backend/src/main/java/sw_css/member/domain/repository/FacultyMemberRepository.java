package sw_css.member.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.member.domain.FacultyMember;

public interface FacultyMemberRepository extends JpaRepository<FacultyMember, Long> {
    boolean existsByMemberId(Long memberId);
}
