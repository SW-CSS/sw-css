package sw_css.hackathon.domain.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import sw_css.hackathon.domain.Hackathon;

public interface HackathonRepository  extends JpaRepository<Hackathon, Long>{
    Page<Hackathon> findAll(Pageable pageable, Sort sort);
    Page<Hackathon> findByNameContaining(String name, Pageable pageable, Sort sort);
    Page<Hackathon> findByVisibleStatus(boolean visibleStatus, Pageable pageable, Sort sort);
    Page<Hackathon> findByNameContainingAndVisibleStatus(String name, boolean visibleStatus, Pageable pageable, Sort sort);
}
