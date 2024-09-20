package sw_css.member.domain.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.Nullable;
import sw_css.member.domain.FacultyMember;

public interface FacultyMemberRepository extends JpaRepository<FacultyMember, Long> {
    boolean existsByMemberId(Long memberId);

    Optional<FacultyMember> findByMemberId(Long memberId);

    Page<FacultyMember> findFacultyMembersBy(@Nullable final Integer field,
                                             @Nullable final String keyword,
                                             final Pageable pageable);
}
