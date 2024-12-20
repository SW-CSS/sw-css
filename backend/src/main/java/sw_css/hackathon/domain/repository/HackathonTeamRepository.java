package sw_css.hackathon.domain.repository;

import io.lettuce.core.dynamic.annotation.Param;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sw_css.hackathon.domain.HackathonTeam;

public interface HackathonTeamRepository extends JpaRepository<HackathonTeam, Long> {
    @Query("SELECT h FROM HackathonTeam h " +
            "WHERE h.hackathon.id = :hackathonId " +
            "ORDER BY " +
            "CASE h.prize " +
            "    WHEN 'GRAND_PRIZE' THEN 1 " +
            "    WHEN 'EXCELLENCE_PRIZE' THEN 2 " +
            "    WHEN 'MERIT_PRIZE' THEN 3 " +
            "    WHEN 'ENCOURAGEMENT_PRIZE' THEN 4 " +
            "    WHEN 'NONE_PRIZE' THEN 5 " +
            "    ELSE 6 " +
            "END, " +
            "h.vote DESC")
    List<HackathonTeam> findByHackathonIdSorted(@Param("hackathonId") Long hackathonId);
}
