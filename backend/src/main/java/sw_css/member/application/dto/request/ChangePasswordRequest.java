package sw_css.member.application.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record ChangePasswordRequest(
        @NotNull(message = "이전 비밀번호 값을 입력해주세요.")
        String oldPassword,
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W)[A-Za-z\\d\\W]{6,15}$", message = "비밀번호는 6자에서 15자 이내의 영문, 숫자, 특수문자의 조합이어야 합니다.")
        String newPassword) {

    public static ChangePasswordRequest from(String oldPassword, String newPassword) {
        return new ChangePasswordRequest(oldPassword, newPassword);
    }
}
