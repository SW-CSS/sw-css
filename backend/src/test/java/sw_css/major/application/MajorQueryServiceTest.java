package sw_css.major.application;

import java.time.LocalDateTime;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import sw_css.helper.IntegrationTest;
import sw_css.major.application.dto.response.MajorResponse;
import sw_css.major.exception.MajorException;
import sw_css.major.exception.MajorExceptionType;

class MajorQueryServiceTest extends IntegrationTest {
    @Autowired
    private MajorQueryService majorQueryService;

    @Test
    @DisplayName("[성공] 특정 단과대학의 학과 목록을 조회할 수 있다.")
    void findMajors_success() {
        //given
        final Long collegeId = 15L;
        final List<MajorResponse> expectedMajors = List.of(
                new MajorResponse(1L, "정보컴퓨터공학부", LocalDateTime.now()),
                new MajorResponse(2L, "정보컴퓨터공학부 - 컴퓨터공학전공", LocalDateTime.now()),
                new MajorResponse(3L, "정보컴퓨터공학부 - 인공지능전공", LocalDateTime.now()),
                new MajorResponse(4L, "의생명융합공학부", LocalDateTime.now())
        );

        //when
        final List<MajorResponse> actualMajors = majorQueryService.findMajors(collegeId);

        //then
        Assertions.assertThat(actualMajors)
                .usingRecursiveComparison()
                .comparingOnlyFields("name")
                .isEqualTo(expectedMajors);
    }

    @Test
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
