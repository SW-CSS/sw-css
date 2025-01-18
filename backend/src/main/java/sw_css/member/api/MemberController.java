package sw_css.member.api;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.admin.auth.application.dto.request.DeleteFacultyRequest;
import sw_css.member.application.MemberCommandService;
import sw_css.member.application.MemberQueryService;
import sw_css.member.application.dto.request.MemberChangePasswordRequest;
import sw_css.member.application.dto.request.MemberChangeInfoRequest;
import sw_css.member.application.dto.request.MemberChangeStudentDetailInfoRequest;
import sw_css.member.application.dto.response.StudentMemberResponse;
import sw_css.member.domain.FacultyMember;
import sw_css.member.domain.Member;
import sw_css.member.domain.StudentMember;
import sw_css.utils.annotation.MemberInterface;
import sw_css.utils.annotation.StudentInterface;
import sw_css.utils.annotation.SuperAdminInterface;

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

    @PatchMapping("/change-student-detail-info")
    public ResponseEntity<Void> changeStudentDetailInfo(@StudentInterface StudentMember me,
                                                        @RequestBody @Valid MemberChangeStudentDetailInfoRequest request){
        memberCommandService.changeStudentDetailInfo(me, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteMember(
            @MemberInterface Member me) {
        memberCommandService.deleteMember(me);
        return ResponseEntity.noContent().build();
    }
}
