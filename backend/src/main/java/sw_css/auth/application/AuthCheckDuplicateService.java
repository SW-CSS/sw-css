package sw_css.auth.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.member.domain.repository.MemberRepository;
import sw_css.member.domain.repository.StudentMemberRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthCheckDuplicateService {
    private final MemberRepository memberRepository;
    private final StudentMemberRepository studentMemberRepository;

    public boolean isDuplicateEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    public boolean isDuplicateStudentID(String studentIdStr) {
        Long studentId = Long.parseLong(studentIdStr);
        return studentMemberRepository.existsById(studentId);
    }
}
