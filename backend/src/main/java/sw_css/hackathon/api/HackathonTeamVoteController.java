package sw_css.hackathon.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.hackathon.application.HackathonTeamVoteCommandService;
import sw_css.member.domain.Member;
import sw_css.utils.annotation.MemberInterface;

@Validated
@RequestMapping("/hackathons/{hackathonId}/teams/{teamId}/vote")
@RestController
@RequiredArgsConstructor
public class HackathonTeamVoteController {
    private final HackathonTeamVoteCommandService hackathonTeamVoteCommandService;

    @PostMapping
    public ResponseEntity<Void> voteHackathonTeam(
            @MemberInterface Member me,
            @PathVariable Long hackathonId,
            @PathVariable Long teamId
    ) {
        hackathonTeamVoteCommandService.voteHackathonTeam(me, hackathonId, teamId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> cancelHackathonTeamVote(
            @MemberInterface Member me,
            @PathVariable Long hackathonId,
            @PathVariable Long teamId
    ) {
        hackathonTeamVoteCommandService.cancelHackathonTeamVote(me, hackathonId, teamId);
        return ResponseEntity.noContent().build();
    }
}
