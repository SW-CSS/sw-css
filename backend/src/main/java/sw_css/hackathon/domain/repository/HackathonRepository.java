package sw_css.hackathon.domain.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.hackathon.domain.Hackathon;

public interface HackathonRepository  extends JpaRepository<Hackathon, Long>{
    Page<Hackathon> findAll(Pageable pageable);
    Page<Hackathon> findByNameContaining(String name, Pageable pageable);
    Page<Hackathon> findByVisibleStatus(boolean visibleStatus, Pageable pageable);
    Page<Hackathon> findByNameContainingAndVisibleStatus(String name, boolean visibleStatus, Pageable pageable);

    Page<Hackathon> findAllByVisibleStatusIsTrue(Pageable pageable);
    Page<Hackathon> findAllByNameContainingAndVisibleStatusIsTrue(String name, Pageable pageable);

    Optional<Hackathon> findByIdAndVisibleStatusIsTrue(long id);
}
