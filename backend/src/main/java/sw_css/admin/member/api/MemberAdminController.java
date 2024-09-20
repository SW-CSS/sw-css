package sw_css.admin.member.api;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sw_css.admin.member.application.MemberAdminQueryService;
import sw_css.admin.member.application.dto.response.FacultyMemberResponse;
import sw_css.member.application.dto.response.StudentMemberResponse;
import sw_css.member.domain.FacultyMember;
import sw_css.utils.annotation.AdminInterface;

@Validated
@RequestMapping("/admin/members")
@RestController
@RequiredArgsConstructor
public class MemberAdminController {
    private final MemberAdminQueryService memberAdminQueryService;

    @GetMapping("/students")
    public ResponseEntity<List<StudentMemberResponse>> findAllStudent(@AdminInterface FacultyMember facultyMember) {
        return ResponseEntity.ok(memberAdminQueryService.findStudentMembers());
    }

    @GetMapping("/faculties")
    public ResponseEntity<Page<FacultyMemberResponse>> findAllFaculty(
            @AdminInterface FacultyMember facultyMember,
            @RequestParam(value = "field", required = false) final Integer field,
            @RequestParam(value = "keyword", required = false) final String keyword,
            final Pageable pageable) {
        return ResponseEntity.ok(memberAdminQueryService.findFacultyMembers(field, keyword, pageable));
    }
}
