package sw_css.admin.hackathon.api;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.admin.hackathon.application.AdminHackathonTeamCommandService;
import sw_css.admin.hackathon.application.dto.request.AdminHackathonTeamRequest;
import sw_css.member.domain.FacultyMember;
import sw_css.utils.annotation.AdminInterface;

@Validated
@RequestMapping("admin/hackathons/{hackathonId}/teams/{teamId}")
@RestController
@RequiredArgsConstructor
@Transactional
public class AdminHackathonTeamController {
    private final AdminHackathonTeamCommandService adminHackathonTeamCommandService;

    @PatchMapping()
    public ResponseEntity<Void> updateHackathonTeam(
                @AdminInterface FacultyMember facultyMember,
                @PathVariable Long hackathonId,
                @PathVariable Long teamId,
                @RequestBody @Valid AdminHackathonTeamRequest request
        ) {
        adminHackathonTeamCommandService.updateHackathonTeam(hackathonId, teamId, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteHackathonTeam(
            @AdminInterface FacultyMember facultyMember,
            @PathVariable Long hackathonId,
            @PathVariable Long teamId
    ) {
        adminHackathonTeamCommandService.deleteHackathonTeam(hackathonId, teamId);
        return ResponseEntity.noContent().build();
    }
}
