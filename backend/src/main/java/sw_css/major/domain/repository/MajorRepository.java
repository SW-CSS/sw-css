package sw_css.major.domain.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.major.domain.Major;

public interface MajorRepository extends JpaRepository<Major, Long> {
    List<Major> findByCollegeId(final Long id);
}
