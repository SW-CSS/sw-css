package sw_css.auth.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import sw_css.member.domain.embedded.EmailAddress;

public record SendAuthCodeRequest(
        @Email
        @Pattern(regexp = EmailAddress.EMAIL_ADDRESS_REGEX, message = EmailAddress.EMAIL_ADDRESS_INVALID)
        String email) {

    public static SendAuthCodeRequest from(String email) {
        return new SendAuthCodeRequest(email);
    }
}
