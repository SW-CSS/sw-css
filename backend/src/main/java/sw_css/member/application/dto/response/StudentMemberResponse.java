package sw_css.member.application.dto.response;

import sw_css.member.domain.CareerType;
import sw_css.member.domain.StudentMember;

public record StudentMemberResponse(
        Long id,
        String email,
        String name,
        String major,
        String minor,
        String doubleMajor,
        String phoneNumber,
        CareerType career,
        String careerDetail
) {
    public static StudentMemberResponse from(final StudentMember student) {
        return new StudentMemberResponse(student.getId(), student.getMember().getEmail(), student.getMember().getName(),
                student.getMajor().getName(), student.getMinor() != null ? student.getMinor().getName() : "",
                student.getDoubleMajor() != null ? student.getDoubleMajor().getName() : "",
                student.getMember().getPhoneNumber(), student.getCareer(), student.getCareerDetail());
    }
}
