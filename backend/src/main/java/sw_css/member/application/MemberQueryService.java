package sw_css.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.member.application.dto.response.StudentMemberResponse;
import sw_css.member.domain.Member;
import sw_css.member.domain.StudentMember;
import sw_css.member.domain.embedded.Password;
import sw_css.member.domain.repository.MemberRepository;
import sw_css.member.domain.repository.StudentMemberRepository;
import sw_css.member.exception.MemberException;
import sw_css.member.exception.MemberExceptionType;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberQueryService {
    private final StudentMemberRepository studentMemberRepository;
    private final MemberRepository memberRepository;

    public StudentMemberResponse findStudentMember(final Long memberId) {
        final StudentMember student = studentMemberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND_STUDENT));
        return StudentMemberResponse.from(student);
    }

    @Transactional
    public void changePassword(Member me, String oldPassword, String newPassword) {
        if (me.isWrongPassword(oldPassword)) {
            throw new MemberException(MemberExceptionType.MEMBER_WRONG_PASSWORD);
        }

        String encodedPassword = Password.encode(newPassword);
        me.setPassword(encodedPassword);

        memberRepository.save(me);


    }
}

