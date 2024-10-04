package sw_css.restdocs.docs.admin;

import static org.apache.tomcat.util.http.fileupload.FileUploadBase.MULTIPART_FORM_DATA;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import org.springframework.restdocs.request.RequestPartsSnippet;
import sw_css.admin.auth.api.AdminAuthController;
import sw_css.admin.auth.application.dto.request.DeleteFacultyRequest;
import sw_css.admin.auth.application.dto.request.RegisterFacultyRequest;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(AdminAuthController.class)
public class AdminAuthApiDocsTest extends RestDocsTest {
    @Test
    @DisplayName("[성공] 관리자 단일 등록을 할 수 있다.")
    public void registerFacultyMemberInfo() throws Exception {
        // given
        final RequestFieldsSnippet requestFieldsSnippet = requestFields(
                fieldWithPath("email").type(JsonFieldType.STRING).description("부산대학교 이메일"),
                fieldWithPath("name").type(JsonFieldType.STRING).description("실명")
        );

        final String email = "root@pusan.ac.kr";
        final String name = "관리자";
        RegisterFacultyRequest request = new RegisterFacultyRequest(email, name);

        final String token = "Bearer AccessToken";

        // when
        when(adminAuthCommandService.registerFaculty(request)).thenReturn(1L);

        // then
        mockMvc.perform(post("/admin/auth")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isCreated())
                .andDo(document("admin-auth-register", requestFieldsSnippet));
    }

    @Test
    @DisplayName("[성공] 관리자 다중 등록을 할 수 있다.")
    public void registerFaculties() throws Exception {
        // given
        final RequestPartsSnippet requestPartsSnippet = requestParts(
                partWithName("file").description("일괄 등록할 관리자 이메일 및 이름이 담긴 엑셀 파일(.xls, .xlsx)")
        );

        final MockMultipartFile request = new MockMultipartFile("file", "test.xls", "multipart/form-data",
                "example".getBytes());

        final String token = "Bearer AccessToken";

        // when
        doNothing().when(adminAuthCommandService).registerFaculties(request);

        // then
        mockMvc.perform(multipart("/admin/auth/files").file(request)
                        .contentType(MULTIPART_FORM_DATA)
                        .accept(APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isCreated())
                .andDo(document("admin-auth-register-by-file", requestPartsSnippet));
    }

    @Test
    @DisplayName("[성공] 관리자 삭제할 수 있다.")
    public void deleteFaculty() throws Exception {
        // given
        final RequestFieldsSnippet requestFieldsSnippet = requestFields(
                fieldWithPath("faculty_id").type(JsonFieldType.NUMBER).description("교직원 번호")
        );

        final long faculty_id = 1L;
        DeleteFacultyRequest request = new DeleteFacultyRequest(faculty_id);

        final String token = "Bearer AccessToken";

        // when
        doNothing().when(adminAuthCommandService).deleteFaculty(request.faculty_id());

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/admin/auth")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isNoContent())
                .andDo(document("admin-auth-delete", requestFieldsSnippet));
    }
}
