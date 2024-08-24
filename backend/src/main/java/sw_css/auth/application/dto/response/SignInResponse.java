package sw_css.auth.application.dto.response;

import sw_css.member.domain.Member;

public record SignInResponse(
        long member_id,
        String name,
        String email,
        String role,
        boolean is_moderator,
        String token
) {

    public static SignInResponse of(Member member, String role, Boolean isModerator, String token) {
        return new SignInResponse(member.getId(), member.getName(), member.getEmail(), role, isModerator, token);
    }
}
