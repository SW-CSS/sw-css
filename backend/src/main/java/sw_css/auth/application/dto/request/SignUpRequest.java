package sw_css.auth.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import sw_css.major.domain.Major;
import sw_css.member.domain.CareerType;
import sw_css.member.domain.Member;
import sw_css.member.domain.StudentMember;
import sw_css.member.domain.embedded.EmailAddress;
import sw_css.member.domain.embedded.Password;
import sw_css.member.domain.embedded.PhoneNumber;
import sw_css.member.domain.embedded.RealName;
import sw_css.member.domain.embedded.StudentId;

public record SignUpRequest(
        @Email(message = "이메일 형식을 확인해주세요.")
        @Pattern(regexp = EmailAddress.EMAIL_ADDRESS_REGEX, message = EmailAddress.EMAIL_ADDRESS_INVALID)
        String email,
        @Pattern(regexp = Password.PASSWORD_REGEX, message = Password.PASSWORD_INVALID)
        String password,
        @Pattern(regexp = RealName.NAME_REGEX, message = RealName.NAME_INVALID)
        String name,
        @Pattern(regexp = StudentId.STUDENT_ID_REGEX, message = StudentId.STUDENT_ID_INVALID)
        String studentId,
        @Pattern(regexp = PhoneNumber.PHONE_NUMBER_REGEX, message = PhoneNumber.PHONE_NUMBER_INVALID)
        String phoneNumber,
        @NotNull(message = "전공을 선택해주세요.")
        Long majorId,
        Long minorId,
        Long doubleMajorId,
        @NotBlank(message = "진로 계획 유형을 선택해주세요.")
        String career,
        @NotBlank(message = "진로 상세 계획을 기입해주세요.")
        String careerDetail,
        @NotBlank(message = "인증 코드를 입력해주세요.")
        String authCode) {

    public Member toMember() {
        return new Member(this.email, this.name, Password.encode(this.password), this.phoneNumber, false);
    }

    public Member toMember(Long memberId) {
        return new Member(memberId, this.email, this.name, Password.encode(this.password), this.phoneNumber, false);
    }

    public StudentMember toStudentMember(Long memberId, Major major, Major minor, Major doubleMajor) {
        final Member member = toMember(memberId);

        final Long studentID = Long.valueOf(this.studentId());
        final CareerType careerType = CareerType.valueOf(this.career());

        return new StudentMember(studentID, member, major, minor, doubleMajor, careerType, this.careerDetail);
    }
}
