package sw_css.member.application.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import sw_css.member.domain.embedded.Password;

public record MemberChangePasswordRequest(
        @NotBlank(message = "이전 비밀번호 값을 입력해주세요.")
        String oldPassword,
        @Pattern(regexp = Password.PASSWORD_REGEX, message = Password.PASSWORD_INVALID)
        String newPassword) {

    public static MemberChangePasswordRequest from(String oldPassword, String newPassword) {
        return new MemberChangePasswordRequest(oldPassword, newPassword);
    }
}
