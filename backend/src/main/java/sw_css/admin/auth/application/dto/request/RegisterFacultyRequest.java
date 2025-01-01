package sw_css.admin.auth.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import sw_css.member.domain.FacultyMember;
import sw_css.member.domain.Member;
import sw_css.member.domain.embedded.EmailAddress;
import sw_css.member.domain.embedded.RealName;

public record RegisterFacultyRequest(
        @Email(message = "이메일 형식을 확인해주세요.")
        @Pattern(regexp = EmailAddress.EMAIL_ADDRESS_REGEX, message = EmailAddress.EMAIL_ADDRESS_INVALID)
        String email,
        @Pattern(regexp = RealName.NAME_REGEX, message = RealName.NAME_INVALID)
        String name) {

    public Member toMember(String password) {
        return new Member(email, name, password, "01000000000");
    }

    public Member toMember(Long memberId, String password) {
        return new Member(memberId, email, name, password, "01000000000");
    }

    public FacultyMember toFacultyMember(Long memberId, String password) {
        final Member member = toMember(memberId, password);
        return new FacultyMember(null, member);
    }
}
