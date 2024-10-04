package sw_css.member.domain.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import sw_css.member.domain.FacultyMember;

public interface FacultyMemberCustomRepository {

    Page<FacultyMember> findFacultyMembers(@Nullable final Integer field,
                                           @Nullable final String keyword,
                                           final Pageable pageable);
}
