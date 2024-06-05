package sw_css.restdocs.docs;

import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import sw_css.milestone.api.MilestoneHistoryController;
import sw_css.milestone.application.dto.request.MilestoneHistoryCreateRequest;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(MilestoneHistoryController.class)
public class MilestoneHistoryApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 마일스톤 실적을 등록할 수 있다.")
    public void registerMilestoneHistory() throws Exception {
        // given
        final RequestFieldsSnippet requestBodySnippet = requestFields(
                fieldWithPath("milestoneId").type(JsonFieldType.NUMBER).description("마일스톤 ID"),
                fieldWithPath("description").type(JsonFieldType.STRING).description("활동에 대한 설명"),
                fieldWithPath("fileUrl").type(JsonFieldType.STRING).description("파일이 저장된 경로"),
                fieldWithPath("count").type(JsonFieldType.NUMBER).description("활동 횟수"),
                fieldWithPath("activatedAt").type(JsonFieldType.STRING).description("활동 일자(yyyy-MM-dd)")
        );

        final MilestoneHistoryCreateRequest request = new MilestoneHistoryCreateRequest(1L, "대회 수상했습니다.",
                "https://fjslfjskl", 3, LocalDate.parse("2024-06-05"));

        // when
        when(milestoneHistoryCommandService.registerMilestoneHistory(request)).thenReturn(1L);

        // then
        mockMvc.perform(post("/milestones/histories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andDo(document("milestone-history-create", requestBodySnippet));
    }
}
