package sw_css.restdocs.docs;

import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import sw_css.auth.api.SignUpController;
import sw_css.auth.application.dto.request.SignUpRequest;
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
                fieldWithPath("studentId").type(JsonFieldType.STRING).description("학번"),
                fieldWithPath("phoneNumber").type(JsonFieldType.STRING).description("전화번호"),
                fieldWithPath("majorId").type(JsonFieldType.NUMBER).description("주전공"),
                fieldWithPath("minorId").type(JsonFieldType.NUMBER).description("부전공"),
                fieldWithPath("doubleMajorId").type(JsonFieldType.NUMBER).description("복수전공"),
                fieldWithPath("career").type(JsonFieldType.STRING).description("직로 계획"),
                fieldWithPath("careerDetail").type(JsonFieldType.STRING).description("진로 상세 계획")
        );

        final String email = "ddang@pusan.ac.kr";
        final String password = "qwer1234!";
        final String name = "이다은";
        final String studentId = "202012345";
        final String phoneNumber = "01012345678";
        final Long majorId = 100L;
        final Long minorId = 100L;
        final Long doubleMajorId = 100L;
        final String career = "GRADUATE_SCHOOL";
        final String careerDetail = "IT 기업 개발자";

        final SignUpRequest request = new SignUpRequest(email, password, name, studentId, phoneNumber, majorId, minorId,
                doubleMajorId, career, careerDetail);

        // when
        when(authSignUpService.signUp(request)).thenReturn(1L);

        // then
        mockMvc.perform(post("/sign-up")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andDo(document("sign-up", requestFieldsSnippet));
        System.out.println("hello world");
    }

}
