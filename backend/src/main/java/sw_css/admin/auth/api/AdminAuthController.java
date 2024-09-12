package sw_css.admin.auth.api;

import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sw_css.admin.auth.application.AdminAuthCommandService;
import sw_css.admin.auth.application.dto.request.DeleteFacultyRequest;
import sw_css.admin.auth.application.dto.request.RegisterFacultyRequest;
import sw_css.member.domain.FacultyMember;
import sw_css.utils.annotation.AdminInterface;
import sw_css.utils.annotation.SuperAdminInterface;

@Validated
@RequestMapping("/admin/auth")
@RestController
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminAuthCommandService adminAuthCommandService;

    @PostMapping
    public ResponseEntity<Void> registerFaculty(
            @AdminInterface FacultyMember facultyMember,
            @RequestBody @Valid RegisterFacultyRequest request) {
        Long memberId = adminAuthCommandService.registerFaculty(request);
        return ResponseEntity.created(URI.create("/members/" + memberId)).build();
    }

    @PostMapping("/files")
    public ResponseEntity<Void> registerFaculties(
            @AdminInterface FacultyMember facultyMember,
            @RequestPart(value = "file") final MultipartFile file) {
        adminAuthCommandService.registerFaculties(file);
        return ResponseEntity.created(URI.create("/admin/faculties")).build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteFaculty(
            @SuperAdminInterface FacultyMember facultyMember,
            @RequestBody @Valid DeleteFacultyRequest request) {
        adminAuthCommandService.deleteFaculty(request.member_id());
        return ResponseEntity.noContent().build();
    }

}
