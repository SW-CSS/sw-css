package sw_css.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.auth.exception.AuthException;
import sw_css.auth.exception.AuthExceptionType;
import sw_css.major.domain.Major;
import sw_css.major.domain.repository.MajorRepository;
import sw_css.member.application.dto.request.MemberChangeStudentDetailInfoRequest;
import sw_css.member.domain.CareerType;
import sw_css.member.domain.Member;
import sw_css.member.domain.StudentMember;
import sw_css.member.domain.embedded.Password;
import sw_css.member.domain.repository.MemberRepository;
import sw_css.member.domain.repository.StudentMemberRepository;
import sw_css.member.exception.MemberException;
import sw_css.member.exception.MemberExceptionType;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberCommandService {

    private final MemberRepository memberRepository;
    private final MajorRepository majorRepository;
    private final StudentMemberRepository studentMemberRepository;

    public void changePassword(Member me, String oldPassword, String newPassword) {
        if (me.isWrongPassword(oldPassword)) {
            throw new MemberException(MemberExceptionType.MEMBER_WRONG_PASSWORD);
        }

        String encodedPassword = Password.encode(newPassword);
        me.setPassword(encodedPassword);

        memberRepository.save(me);
    }

    public void changeDefaultInfo(final Member me, final String name, final String phoneNumber) {
        me.setName(name);
        me.setPhoneNumber(phoneNumber);

        memberRepository.save(me);
    }

    public void changeStudentDetailInfo(final StudentMember me, final MemberChangeStudentDetailInfoRequest request) {
        final Major major = majorRepository.findById(request.majorId())
                .orElseThrow(() -> new AuthException(AuthExceptionType.MAJOR_NOT_EXIST));
        final Major minor = request.minorId() == null ? null : majorRepository.findById(request.minorId())
                .orElseThrow(() -> new AuthException(AuthExceptionType.MAJOR_NOT_EXIST));
        final Major doubleMinor =
                request.doubleMajorId() == null ? null : majorRepository.findById(request.doubleMajorId())
                        .orElseThrow(() -> new AuthException(AuthExceptionType.MAJOR_NOT_EXIST));

        final CareerType careerType;
        try {
            careerType = CareerType.valueOf(request.career());
        } catch (IllegalArgumentException e) {
            throw new MemberException(MemberExceptionType.INVALID_CAREER_TYPE);
        }

        me.setDetailInfo(major, minor, doubleMinor, careerType, request.careerDetail());
        studentMemberRepository.save(me);
    }

    public void deleteMember(final Member me) {
        me.delete();
        memberRepository.save(me);
    }
}
