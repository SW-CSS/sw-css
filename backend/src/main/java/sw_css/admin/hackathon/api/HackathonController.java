package sw_css.admin.hackathon.api;

import jakarta.validation.Valid;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sw_css.admin.hackathon.application.HackathonCommandService;
import sw_css.admin.hackathon.application.HackathonQueryService;
import sw_css.admin.hackathon.application.dto.request.AdminHackathonActiveRequest;
import sw_css.admin.hackathon.application.dto.request.AdminHackathonPrizeRequest;
import sw_css.admin.hackathon.application.dto.request.AdminHackathonRequest;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonDetailResponse;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonResponse;
import sw_css.member.domain.FacultyMember;
import sw_css.utils.annotation.AdminInterface;

@Validated
@RequestMapping("/admin/hackathons")
@RestController
@RequiredArgsConstructor
public class HackathonController {
    private final HackathonCommandService hackathonCommandService;
    private final HackathonQueryService hackathonQueryService;

    @GetMapping
    public ResponseEntity<Page<AdminHackathonResponse>> findAllHackathons(
            final Pageable pageable,
            @AdminInterface FacultyMember facultyMember,
            @RequestParam(value = "name", required = false) final String name,
            @RequestParam(value = "visibleStatus", required = false) final String visibleStatus
    ) {
        return ResponseEntity.ok(
                hackathonQueryService.findAllHackathons(pageable, name, visibleStatus)
        );
    }

    @GetMapping("/{hackathonId}")
    public ResponseEntity<AdminHackathonDetailResponse> findHackathonById(
            @AdminInterface FacultyMember facultyMember,
            @PathVariable final Long hackathonId
    ){
        return ResponseEntity.ok(
                hackathonQueryService.findHackathonById(hackathonId));
    }

    @PostMapping
    public ResponseEntity<Void> registerHackathon(
        @AdminInterface FacultyMember facultyMember,
        @RequestPart(value = "file", required = false) final MultipartFile file,
        @RequestPart(value = "request") @Valid final AdminHackathonRequest request) {
            final Long registeredHackathonId = hackathonCommandService.registerHackathon(file, request);
            return ResponseEntity.created(URI.create("/admin/hackathon/" + registeredHackathonId)).build();
    }

    @PatchMapping("/{hackathonId}")
    public ResponseEntity<Void> updateHackathon(
            @AdminInterface FacultyMember facultyMember,
            @RequestPart(value = "file", required = false) final MultipartFile file,
            @RequestPart(value = "request") @Valid final AdminHackathonRequest request,
            @PathVariable final Long hackathonId
    ) {
        hackathonCommandService.updateHackathon(hackathonId, file, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{hackathonId}")
    public ResponseEntity<Void> deleteHackathon(
            @AdminInterface FacultyMember facultyMember,
            @PathVariable final Long hackathonId
    ){
        hackathonCommandService.deleteHackathon(hackathonId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{hackathonId}/download/votes")
    public ResponseEntity<byte[]> downloadVotes(
            @AdminInterface FacultyMember facultyMember,
            @PathVariable final Long hackathonId
    ){
        final String filename = "해커톤_투표_결과.xlsx";
        final String encodedFilename = URLEncoder.encode(filename, StandardCharsets.UTF_8);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + encodedFilename + "\"; filename*=UTF-8''" + encodedFilename)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(hackathonQueryService.downloadHackathonVotesById(hackathonId));

    }

    @PatchMapping("/{hackathonId}/active")
    public ResponseEntity<Void> patchHackathon(
            @AdminInterface FacultyMember facultyMember,
            @PathVariable final Long hackathonId,
            @RequestBody @Valid AdminHackathonActiveRequest request
    ){
        hackathonCommandService.activeHackathon(hackathonId, request.visibleStatus());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{hackathonId}/prize")
    public ResponseEntity<Void> patchHackathonPrize(
            @AdminInterface FacultyMember facultyMember,
            @PathVariable final Long hackathonId,
            @RequestBody @Valid AdminHackathonPrizeRequest request
    ){
        hackathonCommandService.hackathonChangePrize(hackathonId, request.teams());
        return ResponseEntity.noContent().build();
    }
}
