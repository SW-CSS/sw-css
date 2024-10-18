package sw_css.admin.member.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.admin.member.application.dto.response.FacultyMemberResponse;
import sw_css.member.application.dto.response.StudentMemberResponse;
import sw_css.member.domain.FacultyMember;
import sw_css.member.domain.StudentMember;
import sw_css.member.domain.repository.FacultyMemberCustomRepository;
import sw_css.member.domain.repository.FacultyMemberRepository;
import sw_css.member.domain.repository.StudentMemberRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberAdminQueryService {
    private final StudentMemberRepository studentMemberRepository;
    private final FacultyMemberCustomRepository facultyMemberCustomRepository;

    public List<StudentMemberResponse> findStudentMembers() {
        final List<StudentMember> students = studentMemberRepository.findAll();
        return students.stream().map(StudentMemberResponse::from).toList();
    }

    public Page<FacultyMemberResponse> findFacultyMembers(final Integer field, final String keyword, final Pageable pageable) {
        final Page<FacultyMember> faculties = facultyMemberCustomRepository.findFacultyMembers(field, keyword, pageable);

        return FacultyMemberResponse.from(faculties, pageable);
    }
}
