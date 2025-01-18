package sw_css.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.member.domain.Member;
import sw_css.member.domain.embedded.Password;
import sw_css.member.domain.repository.MemberRepository;
import sw_css.member.exception.MemberException;
import sw_css.member.exception.MemberExceptionType;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberCommandService {

    private final MemberRepository memberRepository;

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
}
