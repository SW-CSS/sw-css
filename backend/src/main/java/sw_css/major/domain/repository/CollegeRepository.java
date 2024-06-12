package sw_css.major.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.major.domain.College;

public interface CollegeRepository extends JpaRepository<College, Long> {
    boolean existsById(final Long id);
}
