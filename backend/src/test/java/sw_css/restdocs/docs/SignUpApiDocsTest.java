package sw_css.restdocs.docs;

import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.QueryParametersSnippet;
import sw_css.auth.api.SignUpController;
import sw_css.auth.application.dto.request.SendAuthCodeRequest;
import sw_css.auth.application.dto.request.SignUpRequest;
import sw_css.auth.application.dto.response.CheckDuplicateResponse;
import sw_css.auth.application.dto.response.SendAuthCodeResponse;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(SignUpController.class)
public class SignUpApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 학생 회원가입을 할 수 있다.")
    public void registerStudentMemberInfo() throws Exception {
        // given
        final RequestFieldsSnippet requestFieldsSnippet = requestFields(
                fieldWithPath("email").type(JsonFieldType.STRING).description("부산대학교 이메일"),
                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                fieldWithPath("name").type(JsonFieldType.STRING).description("실명"),
                fieldWithPath("student_id").type(JsonFieldType.STRING).description("학번"),
                fieldWithPath("phone_number").type(JsonFieldType.STRING).description("전화번호"),
                fieldWithPath("major_id").type(JsonFieldType.NUMBER).description("주전공"),
                fieldWithPath("minor_id").type(JsonFieldType.NUMBER).description("부전공"),
                fieldWithPath("double_major_id").type(JsonFieldType.NUMBER).description("복수전공"),
                fieldWithPath("career").type(JsonFieldType.STRING).description("직로 계획"),
                fieldWithPath("career_detail").type(JsonFieldType.STRING).description("진로 상세 계획"),
                fieldWithPath("auth_code").type(JsonFieldType.STRING).description("메일 인증 코드")
        );

        final String email = "ddang@pusan.ac.kr";
        final String password = "qwer1234!";
        final String name = "이다은";
        final String studentId = "202012345";
        final String phoneNumber = "01012345678";
        final Long majorId = 100L;
        final String career = "GRADUATE_SCHOOL";
        final String careerDetail = "IT 기업 개발자";

        final SignUpRequest request = new SignUpRequest(email, password, name, studentId, phoneNumber, majorId, majorId,
                majorId, career, careerDetail, "auth code");

        // when
        when(authSignUpService.signUp(request)).thenReturn(1L);

        // then
        mockMvc.perform(post("/sign-up")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andDo(document("auth-sign-up", requestFieldsSnippet));
    }

    @Test
    @DisplayName("[성공] 인증 코드 메일을 전송할 수 있다.")
    public void sendAuthCodeMail() throws Exception {
        // given
        final RequestFieldsSnippet requestFieldsSnippet = requestFields(
                fieldWithPath("email").type(JsonFieldType.STRING).description("부산대학교 이메일")
        );

        final ResponseFieldsSnippet responseFieldsSnippet = responseFields(
                fieldWithPath("expired_seconds").type(JsonFieldType.NUMBER).description("인증 코드 유효 기간")
        );

        final String email = "ddang@pusan.ac.kr";
        final SendAuthCodeRequest request = new SendAuthCodeRequest(email);

        final int expiredSeconds = 600;
        final SendAuthCodeResponse response = new SendAuthCodeResponse(expiredSeconds);

        // when
        when(authEmailService.emailAuth(request.email())).thenReturn(response);

        // then
        mockMvc.perform(post("/sign-up/send-auth-code")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andDo(document("auth-send-auth-code", requestFieldsSnippet, responseFieldsSnippet));
    }

    @Test
    @DisplayName("[성공] 중복하는 이메일인지 확인할 수 있다.")
    public void checkDuplicateEmail() throws Exception {
        // given
        final QueryParametersSnippet queryParameters = queryParameters(
                parameterWithName("email").description("부산대학교 이메일")
        );
        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("is_duplicate").type(JsonFieldType.BOOLEAN).description("중복 여부"));

        final String email = "ddang@pusan.ac.kr";
        final boolean isDuplicate = false;
        final CheckDuplicateResponse response = new CheckDuplicateResponse(isDuplicate);

        //when
        when(authSignUpService.isDuplicateEmail(email)).thenReturn(response);

        //then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/sign-up/exists/email")
                        .param("email", email))
                .andExpect(status().isOk())
                .andDo(document("auth-check-duplicate-email", queryParameters, responseBodySnippet));
    }

    @Test
    @DisplayName("[성공] 중복하는 학번인지 확인할 수 있다.")
    public void checkDuplicateStudentId() throws Exception {
        // given
        final QueryParametersSnippet queryParameters = queryParameters(
                parameterWithName("student_id").description("부산대학교 학번")
        );
        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("is_duplicate").type(JsonFieldType.BOOLEAN).description("중복 여부"));

        final String studentId = "202012345";
        final boolean isDuplicate = false;
        final CheckDuplicateResponse response = new CheckDuplicateResponse(isDuplicate);

        //when
        when(authSignUpService.isDuplicateStudentId(studentId)).thenReturn(response);

        //then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/sign-up/exists/student-id")
                        .param("student_id", studentId))
                .andExpect(status().isOk())
                .andDo(document("auth-check-duplicate-student-id", queryParameters, responseBodySnippet));
    }

    @Test
    @DisplayName("[성공] 중복하는 전화번호인지 확인할 수 있다.")
    public void checkDuplicatePhoneNumber() throws Exception {
        // given
        final QueryParametersSnippet queryParameters = queryParameters(
                parameterWithName("phone_number").description("전화번호")
        );
        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("is_duplicate").type(JsonFieldType.BOOLEAN).description("중복 여부"));

        final String phoneNumber = "01012341234";
        final boolean isDuplicate = false;
        final CheckDuplicateResponse response = new CheckDuplicateResponse(isDuplicate);

        //when
        when(authSignUpService.isDuplicatePhoneNumber(phoneNumber)).thenReturn(response);

        //then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/sign-up/exists/phone-number")
                        .param("phone_number", phoneNumber))
                .andExpect(status().isOk())
                .andDo(document("auth-check-duplicate-phone-number", queryParameters, responseBodySnippet));
    }
}
