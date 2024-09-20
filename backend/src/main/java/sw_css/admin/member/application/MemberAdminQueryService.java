package sw_css.admin.member.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.admin.member.application.dto.response.FacultyMemberResponse;
import sw_css.member.application.dto.response.StudentMemberResponse;
import sw_css.member.domain.FacultyMember;
import sw_css.member.domain.StudentMember;
import sw_css.member.domain.repository.FacultyMemberRepository;
import sw_css.member.domain.repository.StudentMemberRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberAdminQueryService {
    private final StudentMemberRepository studentMemberRepository;
    private final FacultyMemberRepository facultyMemberRepository;

    public List<StudentMemberResponse> findStudentMembers() {
        final List<StudentMember> students = studentMemberRepository.findAll();
        return students.stream().map(StudentMemberResponse::from).toList();
    }

    public List<FacultyMemberResponse> findFacultyMembers() {
        final List<FacultyMember> faculties = facultyMemberRepository.findAll();
        return faculties.stream().map(FacultyMemberResponse::from).toList();
    }
}
