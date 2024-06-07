package sw_css.restdocs.docs;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import sw_css.milestone.api.MilestoneHistoryController;
import sw_css.milestone.application.dto.request.MilestoneHistoryCreateRequest;
import sw_css.milestone.application.dto.request.MilestoneHistoryRejectRequest;
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

    @Test
    @DisplayName("[성공] 마일스톤 실적을 삭제할 수 있다.")
    public void deleteMilestoneHistory() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("historyId").description("마일스톤 실적의 id")
        );
        final Long historyId = 1L;

        // when
        doNothing().when(milestoneHistoryCommandService).deleteMilestoneHistory(historyId);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/milestones/histories/{historyId}", historyId))
                .andExpect(status().isNoContent())
                .andDo(document("milestone-history-delete", pathParameters));
    }

    @Test
    @DisplayName("[성공] 마일스톤 실적을 승인할 수 있다.")
    public void approveMilestoneHistory() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("historyId").description("마일스톤 실적의 id")
        );
        final Long historyId = 1L;

        // when
        doNothing().when(milestoneHistoryCommandService).approveMilestoneHistory(historyId);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.patch("/milestones/histories/{historyId}/approve", historyId))
                .andExpect(status().isNoContent())
                .andDo(document("milestone-history-approve", pathParameters));
    }

    @Test
    @DisplayName("[성공] 마일스톤 실적을 반려할 수 있다.")
    public void rejectMilestoneHistory() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("historyId").description("마일스톤 실적의 id")
        );
        final RequestFieldsSnippet requestBodySnippet = requestFields(
                fieldWithPath("reason").type(JsonFieldType.STRING).description("마일스톤 실적 반려 사유")
        );
        final MilestoneHistoryRejectRequest request = new MilestoneHistoryRejectRequest("증빙자료 불충분");

        final Long historyId = 1L;

        // when
        doNothing().when(milestoneHistoryCommandService).rejectMilestoneHistory(historyId, request);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.patch("/milestones/histories/{historyId}/reject", historyId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNoContent())
                .andDo(document("milestone-history-reject", pathParameters, requestBodySnippet));
    }
}
