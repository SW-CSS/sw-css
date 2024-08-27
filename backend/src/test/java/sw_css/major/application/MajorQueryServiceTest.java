package sw_css.major.application;

import java.time.LocalDateTime;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import sw_css.helper.IntegrationTest;
import sw_css.major.application.dto.response.CollegeResponse;
import sw_css.major.application.dto.response.MajorResponse;
import sw_css.major.domain.College;
import sw_css.major.domain.Major;
import sw_css.major.domain.repository.CollegeRepository;
import sw_css.major.domain.repository.MajorRepository;
import sw_css.major.exception.MajorException;
import sw_css.major.exception.MajorExceptionType;

class MajorQueryServiceTest extends IntegrationTest {
    @Autowired
    private MajorQueryService majorQueryService;
    @Autowired
    private MajorRepository majorRepository;
    @Autowired
    private CollegeRepository collegeRepository;

    @BeforeEach
    void setup() {
        final College college1 = collegeRepository.save(new College(null, "인문대학"));
        final College college2 = collegeRepository.save(new College(null, "정보의생명공학대학"));
        majorRepository.saveAll(List.of(new Major(null, college2, "정보컴퓨터공학부"), new Major(null, college2, "의생명융합공학부")));
    }

    //    @Test
    @DisplayName("[성공] 모든 단과대학의 목록을 조회할 수 있다.")
    void findColleges_success() {
        //given
        final List<CollegeResponse> expectedColleges = List.of(
                new CollegeResponse(1L, "인문대학", LocalDateTime.now()),
                new CollegeResponse(2L, "정보의생명공학대학", LocalDateTime.now())
        );

        //when
        final List<CollegeResponse> actualColleges = majorQueryService.findColleges();

        //then
        Assertions.assertThat(actualColleges)
                .usingRecursiveComparison()
                .comparingOnlyFields("name")
                .isEqualTo(expectedColleges);

    }

    //    @Test
    @DisplayName("[성공] 특정 단과대학의 학과 목록을 조회할 수 있다.")
    void findMajors_success() {
        //given
        final Long collegeId = 2L;
        final List<MajorResponse> expectedMajors = List.of(
                new MajorResponse(1L, "정보컴퓨터공학부", LocalDateTime.now()),
                new MajorResponse(2L, "의생명융합공학부", LocalDateTime.now())
        );

        //when
        final List<MajorResponse> actualMajors = majorQueryService.findMajors(collegeId);

        //then
        Assertions.assertThat(actualMajors)
                .usingRecursiveComparison()
                .comparingOnlyFields("name")
                .isEqualTo(expectedMajors);
    }

    //    @Test
    @DisplayName("[실패] 존재하지 않은 단과대학의 학과 목록을 조회할 경우 예외를 반환한다.")
    void findMajors_fail_not_found() {
        //given
        final Long collegeId = 999L;

        //when
        final ThrowingCallable actual = () -> majorQueryService.findMajors(collegeId);

        //then
        Assertions.assertThatThrownBy(actual)
                .isInstanceOf(MajorException.class)
                .hasMessage(MajorExceptionType.NOT_FOUND_COLLEGE.errorMessage());
    }
}
