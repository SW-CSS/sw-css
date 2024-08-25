package sw_css.member.api;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.member.application.MemberQueryService;
import sw_css.member.application.dto.request.ChangePasswordRequest;
import sw_css.member.application.dto.response.StudentMemberResponse;
import sw_css.member.domain.Member;
import sw_css.utils.annotation.JwtAuthorization;

@Validated
@RequestMapping("/members")
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberQueryService memberQueryService;

    @GetMapping("/{memberId}")
    public ResponseEntity<StudentMemberResponse> findStudent(@PathVariable final Long memberId) {
        return ResponseEntity.ok(memberQueryService.findStudentMember(memberId));
    }

    @PatchMapping("/change-password")
    public ResponseEntity<Void> changeMemberPassword(@JwtAuthorization Member me,
                                                     @RequestBody @Valid ChangePasswordRequest request) {
        memberQueryService.changePassword(me, request.oldPassword(), request.newPassword());
        return ResponseEntity.noContent().build();
    }
}
