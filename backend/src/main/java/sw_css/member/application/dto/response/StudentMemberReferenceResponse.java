package sw_css.member.application.dto.response;

import sw_css.member.domain.StudentMember;

public record StudentMemberReferenceResponse(
        Long id,
        String name
) {
    public static StudentMemberReferenceResponse from(final StudentMember member) {
        return new StudentMemberReferenceResponse(member.getId(), member.getMember().getName());
    }
}
