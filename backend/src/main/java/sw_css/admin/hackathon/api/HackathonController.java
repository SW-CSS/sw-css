package sw_css.admin.hackathon.api;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sw_css.admin.hackathon.application.HackathonCommandService;
import sw_css.admin.hackathon.application.HackathonQueryService;
import sw_css.admin.hackathon.application.dto.request.HackathonRequest;
import sw_css.admin.hackathon.application.dto.response.HackathonDetailResponse;
import sw_css.admin.hackathon.application.dto.response.HackathonResponse;
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
    public ResponseEntity<Page<HackathonResponse>> findAllHackathons(
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
    public ResponseEntity<HackathonDetailResponse> findHackathonById(
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
        @RequestPart(value = "request") @Valid final HackathonRequest request) {
            final Long registeredHackathonId = hackathonCommandService.registerHackathon(file, request);
            return ResponseEntity.created(URI.create("/admin/hackathon/" + registeredHackathonId)).build();
    }

    // TODO: 해커톤 수정
    @PatchMapping("/{hackathonId}")
    public ResponseEntity<Void> updateHackathon(
            @AdminInterface FacultyMember facultyMember,
            @RequestPart(value = "file", required = false) final MultipartFile file,
            @RequestPart(value = "request") @Valid final HackathonRequest request,
            @PathVariable final Long hackathonId
    ) {
        hackathonCommandService.updateHackathon(hackathonId, file, request);
        return ResponseEntity.noContent().build();
    }

    // TODO: 해커톤 삭제

    // TODO: 해커톤 투표 결과 다운로드

    // TODO: 해커톤 활성 여부 수정

    // TODO: 해커톤 등수 수정
}
