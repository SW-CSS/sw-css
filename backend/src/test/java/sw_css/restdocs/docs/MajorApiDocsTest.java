package sw_css.restdocs.docs;

import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import sw_css.major.api.MajorController;
import sw_css.major.application.dto.response.CollegeResponse;
import sw_css.major.application.dto.response.MajorResponse;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(MajorController.class)
public class MajorApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 단과대학의 목록을 조회할 수 있다.")
    public void findColleges() throws Exception {
        // given
        final ResponseFieldsSnippet responseFields = PayloadDocumentation.responseFields(
                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("단과대학 id"),
                fieldWithPath("[].name").type(JsonFieldType.STRING).description("단과대학 명"),
                fieldWithPath("[].createdAt").type(JsonFieldType.STRING).description("단과대학이 등록된 날짜")
        );

        final List<CollegeResponse> response = List.of(
                new CollegeResponse(1L, "인문대학", LocalDateTime.parse("2024-01-01T00:00:00")),
                new CollegeResponse(2L, "정보의생명공학대학", LocalDateTime.parse("2024-01-01T00:00:00"))
        );

        // when
        when(majorQueryService.findColleges()).thenReturn(response);

        // then
        mockMvc.perform(get("/colleges"))
                .andExpect(status().isOk())
                .andDo(document("college-find", responseFields));
    }

    @Test
    @DisplayName("[성공] 특정 단과대학의 학과 목록을 조회할 수 있다.")
    public void findMajors() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("collegeId").description("단과대학의 id")
        );

        final ResponseFieldsSnippet responseFields = PayloadDocumentation.responseFields(
                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("학과 id"),
                fieldWithPath("[].name").type(JsonFieldType.STRING).description("학과 명"),
                fieldWithPath("[].createdAt").type(JsonFieldType.STRING).description("학과가 등록된 날짜")
        );

        final List<MajorResponse> response = List.of(
                new MajorResponse(1L, "정보컴퓨터공학부", LocalDateTime.parse("2024-01-01T00:00:00")),
                new MajorResponse(2L, "의생명공학부", LocalDateTime.parse("2024-01-01T00:00:00"))
        );

        final Long collegeId = 1L;

        // when
        when(majorQueryService.findMajors(collegeId)).thenReturn(response);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/colleges/{collegeId}/majors", collegeId))
                .andExpect(status().isOk())
                .andDo(document("major-find", pathParameters, responseFields));
    }
}
