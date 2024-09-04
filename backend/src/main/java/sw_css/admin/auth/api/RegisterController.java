package sw_css.admin.auth.api;

import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sw_css.admin.auth.application.AuthAdminQueryService;
import sw_css.admin.auth.application.dto.request.RegisterRequest;
import sw_css.member.domain.FacultyMember;
import sw_css.utils.annotation.Admin;

@Validated
@RequestMapping("/admin/auth")
@RestController
@RequiredArgsConstructor
public class RegisterController {

    private final AuthAdminQueryService authAdminQueryService;

    // TODO: 단일 등록
    @PostMapping
    public ResponseEntity<Void> registerFaculty(
            @Admin FacultyMember facultyMember,
            @RequestBody @Valid RegisterRequest request) {
        Long memberId = authAdminQueryService.registerFaculty(request);
        return ResponseEntity.created(URI.create("/members/" + memberId)).build();
    }

    // TODO: excel을 이용한 다중 등록
    @PostMapping("/files")
    public ResponseEntity<Void> registerFaculties(
            @Admin FacultyMember facultyMember,
            @RequestPart(value = "file") final MultipartFile file) {
        authAdminQueryService.registerFaculties(file);
        return ResponseEntity.created(URI.create("/admin/faculties")).build();
    }

    // TODO: root 권한자만 교직원 삭제

}
