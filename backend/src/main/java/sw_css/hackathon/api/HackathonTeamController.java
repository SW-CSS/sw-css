package sw_css.hackathon.api;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.hackathon.application.HackathonTeamQueryService;
import sw_css.hackathon.application.dto.response.HackathonTeamResponse;

@Validated
@RequestMapping("/hackathons/{hackathonId}/teams")
@RestController
@RequiredArgsConstructor
public class HackathonTeamController {

    private final HackathonTeamQueryService hackathonTeamQueryService;

    @GetMapping
    public ResponseEntity<Page<HackathonTeamResponse>> findAllTeams(
            Pageable pageable,
            @PathVariable Long hackathonId
    ) {
        return ResponseEntity.ok(hackathonTeamQueryService.findAllHackathonTeam(pageable, hackathonId));
    }

    // TODO: 해커톤 팀 상세 조회

    // TODO: 해커톤 팀 등록

    // TODO: 해커톤 팀 수정

    // TODO: 해커톤 투표

}
