package sw_css.hackathon.api;

import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sw_css.hackathon.application.HackathonTeamCommandService;
import sw_css.hackathon.application.HackathonTeamQueryService;
import sw_css.hackathon.application.dto.request.HackathonTeamRequest;
import sw_css.hackathon.application.dto.response.HackathonTeamResponse;
import sw_css.member.domain.Member;
import sw_css.utils.annotation.MemberInterface;

@Validated
@RequestMapping("/hackathons/{hackathonId}/teams")
@RestController
@RequiredArgsConstructor
public class HackathonTeamController {

    private final HackathonTeamQueryService hackathonTeamQueryService;
    private final HackathonTeamCommandService hackathonTeamCommandService;

    @GetMapping
    public ResponseEntity<Page<HackathonTeamResponse>> findAllHackathonTeams(
            Pageable pageable,
            @PathVariable Long hackathonId
    ) {
        return ResponseEntity.ok(hackathonTeamQueryService.findAllHackathonTeam(pageable, hackathonId));
    }

    @GetMapping("{teamId}")
    public ResponseEntity<HackathonTeamResponse> findHackathonTeamById(
            @PathVariable Long hackathonId,
            @PathVariable Long teamId
    ) {
        return ResponseEntity.ok(hackathonTeamQueryService.findHackathonTeam(hackathonId, teamId));
    }

    @PostMapping
    public ResponseEntity<Void> registerHackathonTeam(
            @MemberInterface Member me,
            @PathVariable Long hackathonId,
            @RequestPart(value = "file") final MultipartFile file,
            @RequestPart(value = "request") @Valid final HackathonTeamRequest request
    ) {
        Long teamId = hackathonTeamCommandService.registerHackathonTeam(me, hackathonId, file, request);

        return ResponseEntity.created(URI.create("/hackathons/" + hackathonId + "/teams/" + teamId)).build();
    }

    @PatchMapping("{teamId}")
    public ResponseEntity<Void> updateHackathonTeam(
            @MemberInterface Member me,
            @PathVariable Long hackathonId,
            @PathVariable Long teamId,
            @RequestBody @Valid final HackathonTeamRequest request
    ) {
        hackathonTeamCommandService.updateHackathonTeam(me, hackathonId, teamId, request);
        return ResponseEntity.noContent().build();
    }

    // TODO: 해커톤 투표

}
