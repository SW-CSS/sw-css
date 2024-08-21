package sw_css.restdocs.docs;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import sw_css.auth.api.SignInController;
import sw_css.auth.application.dto.request.ResetPasswordRequest;
import sw_css.auth.application.dto.request.SignInRequest;
import sw_css.auth.application.dto.response.SignInResponse;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(SignInController.class)
public class SignInApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 로그인을 할 수 있다.")
    public void signIn() throws Exception {
        // given
        final RequestFieldsSnippet requestFieldsSnippet = requestFields(
                fieldWithPath("email").type(JsonFieldType.STRING).description("부산대학교 이메일"),
                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호")
        );

        final ResponseFieldsSnippet responseFieldsSnippet = responseFields(
                fieldWithPath("member_id").type(JsonFieldType.NUMBER).description("회원의 아이디"),
                fieldWithPath("email").type(JsonFieldType.STRING).description("부산대학교 이메일"),
                fieldWithPath("name").type(JsonFieldType.STRING).description("실명"),
                fieldWithPath("role").type(JsonFieldType.STRING).description("회원의 역할 (ADMIN, MEMBER)"),
                fieldWithPath("token").type(JsonFieldType.STRING).description("회원의 토큰")
        );

        final String email = "ddang@pusan.ac.kr";
        final String password = "qwer1234!";
        final long member_id = 1L;
        final String name = "asdf";
        final String role = "ROLE_MEMBER";
        final String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlJPTEVfTUVNQkVSIiwiaWF0IjoxNzI0MjIxMDI0LCJleHAiOjE3MjQyNTcwMjR9.i1zj-_jRjkdO89_5ixKVgZXWr1V8e0PMr-958YGQAQQ";

        final SignInRequest request = new SignInRequest(email, password);
        final SignInResponse response = new SignInResponse(member_id, email, name, role, token);

        // when
        when(authSignInService.signIn(email, password)).thenReturn(response);

        // then
        mockMvc.perform(post("/sign-in")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andDo(document("sign-in", requestFieldsSnippet, responseFieldsSnippet));
    }

    @Test
    @DisplayName("[성공] 임시 비밀번호를 발급받을 수 있다.")
    public void resetPassword() throws Exception {
        // given
        final RequestFieldsSnippet requestFieldsSnippet = requestFields(
                fieldWithPath("email").type(JsonFieldType.STRING).description("부산대학교 이메일"),
                fieldWithPath("name").type(JsonFieldType.STRING).description("회원의 실명")
        );

        final String email = "ddang@pusan.ac.kr";
        final String name = "asdf";

        final ResetPasswordRequest request = new ResetPasswordRequest(email, name);

        // when
        doNothing().when(authSignInService).resetPassword(email, name);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.patch("/sign-in/reset-password")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNoContent())
                .andDo(document("reset-password", requestFieldsSnippet));
    }
}
