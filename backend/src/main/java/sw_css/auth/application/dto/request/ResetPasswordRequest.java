package sw_css.auth.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import sw_css.member.domain.embedded.EmailAddress;
import sw_css.member.domain.embedded.RealName;

public record ResetPasswordRequest(
        @Email
        @Pattern(regexp = EmailAddress.EMAIL_ADDRESS_REGEX, message = EmailAddress.EMAIL_ADDRESS_INVALID)
        String email,
        @Pattern(regexp = RealName.NAME_REGEX, message = RealName.NAME_INVALID)
        String name
) {
    
}
