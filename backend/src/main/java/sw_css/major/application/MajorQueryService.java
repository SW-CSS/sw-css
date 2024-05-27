package sw_css.major.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.major.application.dto.response.MajorResponse;
import sw_css.major.domain.repository.CollegeRepository;
import sw_css.major.domain.repository.MajorRepository;
import sw_css.major.exception.MajorException;
import sw_css.major.exception.MajorExceptionType;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MajorQueryService {
    private final MajorRepository majorRepository;
    private final CollegeRepository collegeRepository;

    public List<MajorResponse> findMajors(final Long collegeId) {
        validateCollegeExist(collegeId);
        return MajorResponse.of(majorRepository.findByCollegeId(collegeId));
    }

    private void validateCollegeExist(Long collegeId) {
        if (!collegeRepository.existsById(collegeId)) {
            throw new MajorException(MajorExceptionType.NOT_FOUND_COLLEGE);
        }
    }
}
