package sw_css.member.domain.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.Nullable;
import sw_css.member.domain.FacultyMember;
import sw_css.member.domain.StudentMember;

public interface StudentMemberRepository extends JpaRepository<StudentMember, Long> {
    boolean existsById(Number studentId);

    boolean existsByMemberId(Number memberId);

    Optional<StudentMember> findByMemberId(Number memberId);


    Page<StudentMember> findStudentMembers(@Nullable final Integer field,
                                           @Nullable final String keyword,
                                           final Pageable pageable);
}
