package sw_css.member.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.member.domain.StudentMember;

public interface StudentMemberRepository extends JpaRepository<StudentMember, Long> {
}
