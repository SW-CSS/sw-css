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
import sw_css.major.domain.College;
import sw_css.major.domain.Major;
import sw_css.member.api.MemberController;
import sw_css.member.application.dto.request.MemberChangePasswordRequest;
import sw_css.member.application.dto.request.MemberChangeInfoRequest;
import sw_css.member.application.dto.request.MemberChangeStudentDetailInfoRequest;
import sw_css.member.application.dto.response.StudentMemberResponse;
import sw_css.member.domain.CareerType;
import sw_css.member.domain.Member;
import sw_css.member.domain.StudentMember;
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

        final MemberChangePasswordRequest request = new MemberChangePasswordRequest(oldPassword, newPassword);

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

    @Test
    @DisplayName("[성공] 헉생의 자신의 전고 및 진로 계획을 수정할 수 있다.")
    public void changeStudentDetailInfo() throws Exception {
        // given
        final RequestFieldsSnippet requestFields = requestFields(
                fieldWithPath("majorId").type(JsonFieldType.NUMBER).description("회원의 전공 id"),
                fieldWithPath("minorId").type(JsonFieldType.NUMBER).description("회원의 부전공 id"),
                fieldWithPath("doubleMajorId").type(JsonFieldType.NUMBER).description("회원의 복수 전공 id"),
                fieldWithPath("career").type(JsonFieldType.STRING).description("회원의 진로 계획 유형 - GRADUATE_SCHOOL, EMPLOYMENT_COMPANY, EMPLOYMENT_PUBLIC_INSTITUTION, FOUNDATION"),
                fieldWithPath("careerDetail").type(JsonFieldType.STRING).description("회원의 진로 상세 계획")
        );


        final StudentMember student = new StudentMember(202055500L,
                new Member(1L, "abc@naver.com", "홍길동", "password", "010-0000-0000", false),
                new Major(1L, new College(1L, "인문대학"), "사회학과"), null, null, CareerType.EMPLOYMENT_COMPANY,
                "IT 사기업 개발자로 취업");
        final MemberChangeStudentDetailInfoRequest request = new MemberChangeStudentDetailInfoRequest(1L, 2L, 3L, "GRADUATE_SCHOOL", "AI 관련 연구실에서 석박사");
        final String token = "Bearer AccessToken";

        // when
        doNothing().when(memberCommandService).changeStudentDetailInfo(student, request);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.patch("/members/change-student-detail-info")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isNoContent())
                .andDo(document("member-change-student-detail-info", requestFields));

    }
}
