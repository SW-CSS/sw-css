package sw_css.member.api;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.member.application.MemberCommandService;
import sw_css.member.application.MemberQueryService;
import sw_css.member.application.dto.request.MemberChangePasswordRequest;
import sw_css.member.application.dto.request.MemberChangeInfoRequest;
import sw_css.member.application.dto.response.StudentMemberResponse;
import sw_css.member.domain.Member;
import sw_css.utils.annotation.MemberInterface;

@Validated
@RequestMapping("/members")
@RestController
@RequiredArgsConstructor
@Transactional
public class MemberController {
    private final MemberQueryService memberQueryService;
    private final MemberCommandService memberCommandService;

    @GetMapping("/{memberId}")
    public ResponseEntity<StudentMemberResponse> findStudent(@PathVariable final Long memberId) {
        return ResponseEntity.ok(memberQueryService.findStudentMember(memberId));
    }

    @PatchMapping("/change-password")
    public ResponseEntity<Void> changeMemberPassword(@MemberInterface Member me,
                                                     @RequestBody @Valid MemberChangePasswordRequest request) {
        memberCommandService.changePassword(me, request.oldPassword(), request.newPassword());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/change-info")
    public ResponseEntity<Void> changeMemberInfo(@MemberInterface Member me,
                                                 @RequestBody @Valid MemberChangeInfoRequest request){
        memberCommandService.changeDefaultInfo(me, request.name(), request.phoneNumber());
        return ResponseEntity.noContent().build();
    }
}
