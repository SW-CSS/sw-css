package sw_css.restdocs.docs.admin;

import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static sw_css.member.domain.CareerType.EMPLOYMENT_COMPANY;
import static sw_css.member.domain.CareerType.GRADUATE_SCHOOL;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import sw_css.admin.member.api.MemberAdminController;
import sw_css.member.application.dto.response.StudentMemberResponse;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(MemberAdminController.class)
public class MemberAdminApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 모든 학생들의 정보를 조회할 수 있다.")
    public void findStudents() throws Exception {
        // given
        final ResponseFieldsSnippet responseFields = PayloadDocumentation.responseFields(
                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("학생의 id(학번)"),
                fieldWithPath("[].email").type(JsonFieldType.STRING).description("학생의 이메일"),
                fieldWithPath("[].name").type(JsonFieldType.STRING).description("학생의 이름"),
                fieldWithPath("[].major").type(JsonFieldType.STRING).description("학생의 주전공"),
                fieldWithPath("[].minor").type(JsonFieldType.STRING).description("학생의 부전공"),
                fieldWithPath("[].doubleMajor").type(JsonFieldType.STRING).description("학생의 복수전공"),
                fieldWithPath("[].phoneNumber").type(JsonFieldType.STRING).description("학생의 전화번호"),
                fieldWithPath("[].career").type(JsonFieldType.STRING).description("학생의 진로 구분"),
                fieldWithPath("[].careerDetail").type(JsonFieldType.STRING).description("학생의 진로 상세")
        );

        final List<StudentMemberResponse> response = List.of(
                new StudentMemberResponse(202055558L, "songsy405@aaa.com", "홍길동",
                        "정보컴퓨터공학부", "", "", "01011111111", GRADUATE_SCHOOL, "대학원 진학"),
                new StudentMemberResponse(202055555L, "abcdefg@aaa.com", "아무개",
                        "사회학과", "", "", "01012345678", EMPLOYMENT_COMPANY, "네카라쿠배"));

        // when
        when(memberAdminQueryService.findStudentMembers()).thenReturn(response);

        // then
        mockMvc.perform(get("/admin/members"))
                .andExpect(status().isOk())
                .andDo(document("student-find-all", responseFields));
    }
}
