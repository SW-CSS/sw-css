package sw_css.admin.hackathon.api;

import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sw_css.admin.hackathon.application.HackathonCommandService;
import sw_css.admin.hackathon.application.dto.request.HackathonCreateRequest;
import sw_css.member.domain.FacultyMember;
import sw_css.utils.annotation.AdminInterface;

@Validated
@RequestMapping("/admin/hackathons")
@RestController
@RequiredArgsConstructor
public class HackathonController {
    private final HackathonCommandService hackathonCommandService;

    // TODO: 목록 조회

    // TODO: 상세 조회

    // TODO: 해커톤 등록
    @PostMapping
    public ResponseEntity<Void> registerHackathon(
        @AdminInterface FacultyMember facultyMember,
        @RequestPart(value = "file", required = false) final MultipartFile file,
        @RequestPart(value = "request") @Valid final HackathonCreateRequest request) {
            final Long registeredHackathonId = hackathonCommandService.registerHackathon(file, request);
            return ResponseEntity.created(URI.create("/admin/hackathon/" + registeredHackathonId)).build();
    }

    // TODO: 해커톤 수정

    // TODO: 해커톤 삭제

    // TODO: 해커톤 투표 결과 다운로드

    // TODO: 해커톤 활성 여부 수정

    // TODO: 해커톤 등수 수정
}
