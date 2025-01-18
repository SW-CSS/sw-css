package sw_css.restdocs.docs;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static sw_css.member.domain.CareerType.GRADUATE_SCHOOL;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpHeaders;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import sw_css.member.api.MemberController;
import sw_css.member.application.dto.request.ChangePasswordRequest;
import sw_css.member.application.dto.request.MemberChangeInfoRequest;
import sw_css.member.application.dto.response.StudentMemberResponse;
import sw_css.member.domain.Member;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(MemberController.class)
public class MemberApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 학생의 정보를 조회할 수 있다.")
    public void findStudents() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("memberId").description("학생의 학번")
        );
        final ResponseFieldsSnippet responseFields = PayloadDocumentation.responseFields(
                fieldWithPath("id").type(JsonFieldType.NUMBER).description("학생의 id(학번)"),
                fieldWithPath("email").type(JsonFieldType.STRING).description("학생의 이메일"),
                fieldWithPath("name").type(JsonFieldType.STRING).description("학생의 이름"),
                fieldWithPath("major").type(JsonFieldType.STRING).description("학생의 주전공"),
                fieldWithPath("minor").type(JsonFieldType.STRING).description("학생의 부전공"),
                fieldWithPath("doubleMajor").type(JsonFieldType.STRING).description("학생의 복수전공"),
                fieldWithPath("phoneNumber").type(JsonFieldType.STRING).description("학생의 전화번호"),
                fieldWithPath("career").type(JsonFieldType.STRING).description("학생의 진로 구분"),
                fieldWithPath("careerDetail").type(JsonFieldType.STRING).description("학생의 진로 상세")
        );

        final StudentMemberResponse response = new StudentMemberResponse(202055558L, "songsy405@aaa.com", "홍길동",
                "정보컴퓨터공학부", "", "", "01011111111", GRADUATE_SCHOOL, "대학원 진학");

        final Long memberId = 202055558L;

        // when
        when(memberQueryService.findStudentMember(memberId)).thenReturn(response);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/members/{memberId}", memberId))
                .andExpect(status().isOk())
                .andDo(document("student-find", pathParameters, responseFields));
    }

    @Test
    @DisplayName("[성공] 비밀번호를 변경할 수 있다.")
    public void changePassword() throws Exception {
        // given
        final RequestFieldsSnippet requestFields = requestFields(
                fieldWithPath("oldPassword").type(JsonFieldType.STRING).description("이전 비밀번호"),
                fieldWithPath("newPassword").type(JsonFieldType.STRING).description("새로운 비밀번호")
        );

        final Member me = new Member(1L, "ddang@pusan.ac.kr", "ddang", "qwer1234!", "01012341234");
        final String oldPassword = "qwer1234!";
        final String newPassword = "asdf1234!";
        final String token = "Bearer AccessToken";

        final ChangePasswordRequest request = new ChangePasswordRequest(oldPassword, newPassword);

        // when
        doNothing().when(memberCommandService).changePassword(me, oldPassword, newPassword);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.patch("/members/change-password")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isNoContent())
                .andDo(document("member-change-password", requestFields));
    }

    @Test
    @DisplayName("[성공] 회원은 이름과 전화번호를 변경할 수 있다.")
    public void changeDefaultInfo() throws Exception {
        // given
        final RequestFieldsSnippet requestFields = requestFields(
                fieldWithPath("name").type(JsonFieldType.STRING).description("회원의 이름"),
                fieldWithPath("phoneNumber").type(JsonFieldType.STRING).description("회원의 전화번호")
        );

        final Member me = new Member(1L, "ddang@pusan.ac.kr", "ddang", "qwer1234!", "01012341234");
        final String token = "Bearer AccessToken";

        final MemberChangeInfoRequest request = new MemberChangeInfoRequest("이다은", "01031315656");

        // when
        doNothing().when(memberCommandService).changePassword(me, request.name(), request.phoneNumber());

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.patch("/members/change-info")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isNoContent())
                .andDo(document("member-change-info", requestFields));
    }
}
