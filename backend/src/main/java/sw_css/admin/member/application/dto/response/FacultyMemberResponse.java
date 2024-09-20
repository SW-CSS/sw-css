package sw_css.admin.member.application.dto.response;

import sw_css.member.domain.FacultyMember;

public record FacultyMemberResponse(
        Long id,
        Long facultyId,
        String email,
        String phoneNumber) {
    public static FacultyMemberResponse from(final FacultyMember facultyMember) {
        return new FacultyMemberResponse(
                facultyMember.getMember().getId(),
                facultyMember.getId(),
                facultyMember.getMember().getEmail(),
                facultyMember.getMember().getPhoneNumber());
    }
}
