package sw_css.admin.member.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.member.application.dto.response.StudentMemberResponse;
import sw_css.member.domain.StudentMember;
import sw_css.member.domain.repository.StudentMemberRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberAdminQueryService {
    private final StudentMemberRepository studentMemberRepository;

    public List<StudentMemberResponse> findStudentMembers() {
        final List<StudentMember> students = studentMemberRepository.findAll();
        return students.stream().map(StudentMemberResponse::from).toList();
    }
}
