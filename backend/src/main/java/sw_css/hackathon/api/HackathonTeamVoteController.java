package sw_css.hackathon.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.hackathon.application.HackathonTeamVoteCommandService;
import sw_css.hackathon.application.HackathonTeamVoteQueryService;
import sw_css.hackathon.application.dto.response.HackathonTeamVoteResponse;
import sw_css.member.domain.Member;
import sw_css.utils.annotation.MemberInterface;

@Validated
@RequestMapping("/hackathons/{hackathonId}/teams/{teamId}/vote")
@RestController
@RequiredArgsConstructor
public class HackathonTeamVoteController {

    private final HackathonTeamVoteCommandService hackathonTeamVoteCommandService;
    private final HackathonTeamVoteQueryService hackathonTeamVoteQueryService;

    @GetMapping
    public ResponseEntity<HackathonTeamVoteResponse> findHackathonTeamVote(
            @MemberInterface Member me,
            @PathVariable Long hackathonId,
            @PathVariable Long teamId
    ) {
        return ResponseEntity.ok(hackathonTeamVoteQueryService.findHackathonTeamVote(me, hackathonId, teamId));
    }

    @PostMapping
    public ResponseEntity<Void> registerHackathonTeamVote(
            @MemberInterface Member me,
            @PathVariable Long hackathonId,
            @PathVariable Long teamId
    ) {
        hackathonTeamVoteCommandService.registerHackathonTeamVote(me, hackathonId, teamId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteHackathonTeamVote(
            @MemberInterface Member me,
            @PathVariable Long hackathonId,
            @PathVariable Long teamId
    ) {
        hackathonTeamVoteCommandService.deleteHackathonTeamVote(me, hackathonId, teamId);
        return ResponseEntity.noContent().build();
    }
}
