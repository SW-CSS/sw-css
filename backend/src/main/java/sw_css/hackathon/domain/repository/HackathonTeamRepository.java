package sw_css.hackathon.domain.repository;

import io.lettuce.core.dynamic.annotation.Param;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sw_css.hackathon.application.dto.response.HackathonTeamResponse;
import sw_css.hackathon.domain.HackathonTeam;

public interface HackathonTeamRepository extends JpaRepository<HackathonTeam, Long> {
    @Query("SELECT ht.id AS team_id, ht.name, ht.imageUrl, ht.work, ht.githubUrl, ht.prize, COUNT(htv.id) AS vote " +
            "FROM HackathonTeam ht " +
            "LEFT JOIN HackathonTeamVote htv ON ht.id = htv.team.id AND ht.hackathon.id = htv.hackathon.id " +
            "GROUP BY ht.id, ht.name, ht.imageUrl, ht.work, ht.githubUrl, ht.prize, ht.hackathon.id " +
            "ORDER BY " +
            "CASE ht.prize " +
            "WHEN 'GRAND_PRIZE' THEN 1 " +
            "WHEN 'EXCELLENCE_PRIZE' THEN 2 " +
            "WHEN 'MERIT_PRIZE' THEN 3 " +
            "WHEN 'ENCOURAGEMENT_PRIZE' THEN 4 " +
            "WHEN 'NONE_PRIZE' THEN 5 " +
            "ELSE 6 END, " +
            "COUNT(htv.id) DESC")
    List<HackathonTeam> findByHackathonIdSorted(@Param("hackathonId") Long hackathonId);

    @Query("SELECT new sw_css.hackathon.application.dto.response.HackathonTeamResponse(" +
            "ht.id, ht.name, ht.imageUrl, ht.work, ht.githubUrl, COUNT(htv.id), ht.prize) " +
            "FROM HackathonTeam ht " +
            "LEFT JOIN HackathonTeamVote htv ON ht.id = htv.team.id AND ht.hackathon.id = htv.hackathon.id " +
            "GROUP BY ht.id, ht.name, ht.imageUrl, ht.work, ht.githubUrl, ht.prize, ht.hackathon.id " +
            "ORDER BY " +
            "CASE ht.prize " +
            "WHEN 'GRAND_PRIZE' THEN 1 " +
            "WHEN 'EXCELLENCE_PRIZE' THEN 2 " +
            "WHEN 'MERIT_PRIZE' THEN 3 " +
            "WHEN 'ENCOURAGEMENT_PRIZE' THEN 4 " +
            "WHEN 'NONE_PRIZE' THEN 5 " +
            "ELSE 6 END, " +
            "COUNT(htv.id) DESC")
    Page<HackathonTeamResponse> findByHackathonIdWithPageable(@Param("hackathonId") Long hackathonId, Pageable pageable);

    List<HackathonTeam> findByHackathonId(Long hackathonId);

    Optional<HackathonTeam> findByHackathonIdAndId(Long hackathonId, Long teamId);

    List<HackathonTeam> findByHackathonIdAndPrizeEquals(Long hackathonId, String prize);
}
