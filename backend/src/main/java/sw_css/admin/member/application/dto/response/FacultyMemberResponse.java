package sw_css.admin.member.application.dto.response;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import sw_css.member.domain.FacultyMember;

public record FacultyMemberResponse(
        Long id,
        Long facultyId,
        String email,
        String name,
        String phoneNumber) {
    public static FacultyMemberResponse from(final FacultyMember facultyMember) {
        return new FacultyMemberResponse(
                facultyMember.getMember().getId(),
                facultyMember.getId(),
                facultyMember.getMember().getEmail(),
                facultyMember.getMember().getName(),
                facultyMember.getMember().getPhoneNumber()
        );
    }

    public static Page<FacultyMemberResponse> from(final Page<FacultyMember> faculties, final Pageable pageable) {
        return new PageImpl<>(faculties.stream()
                .map(FacultyMemberResponse::from)
                .toList(), pageable, faculties.getTotalElements());
    }
}
