package sw_css.member.application.dto.request;

import jakarta.validation.constraints.Pattern;
import sw_css.member.domain.embedded.PhoneNumber;
import sw_css.member.domain.embedded.RealName;

public record MemberChangeInfoRequest(
        @Pattern(regexp = RealName.NAME_REGEX, message = RealName.NAME_INVALID)
        String name,
        @Pattern(regexp = PhoneNumber.PHONE_NUMBER_REGEX, message = PhoneNumber.PHONE_NUMBER_INVALID)
        String phoneNumber) {
}
