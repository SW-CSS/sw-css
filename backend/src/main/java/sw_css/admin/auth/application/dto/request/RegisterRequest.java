package sw_css.admin.auth.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import sw_css.member.domain.FacultyMember;
import sw_css.member.domain.Member;
import sw_css.member.domain.embedded.EmailAddress;
import sw_css.member.domain.embedded.Password;
import sw_css.member.domain.embedded.RealName;

public record RegisterRequest(
        @Email(message = "이메일 형식을 확인해주세요.")
        @Pattern(regexp = EmailAddress.EMAIL_ADDRESS_REGEX, message = EmailAddress.EMAIL_ADDRESS_INVALID)
        String email,
        @Pattern(regexp = RealName.NAME_REGEX, message = RealName.NAME_INVALID)
        String name) {

    public Member toMember() {
        return new Member(email, name, Password.encode("asdf"), "01000000000", false);
    }

    public Member toMember(Long memberId) {
        return new Member(memberId, email, name, Password.encode("asdf"), "01000000000", false);
    }

    public FacultyMember toFacultyMember(Long memberId) {
        final Member member = toMember(memberId);
        return new FacultyMember(null, member);
    }
}
