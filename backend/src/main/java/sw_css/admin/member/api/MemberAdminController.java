package sw_css.admin.member.api;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.admin.member.application.MemberAdminQueryService;
import sw_css.member.application.dto.response.StudentMemberResponse;

@Validated
@RequestMapping("/admin/members")
@RestController
@RequiredArgsConstructor
public class MemberAdminController {
    private final MemberAdminQueryService memberAdminQueryService;

    @GetMapping
    public ResponseEntity<List<StudentMemberResponse>> findAllStudent() {
        return ResponseEntity.ok(memberAdminQueryService.findStudentMembers());
    }
}
