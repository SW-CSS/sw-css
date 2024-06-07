package sw_css.restdocs.docs.admin;

import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import sw_css.admin.milestone.api.MilestoneHistoryAdminController;
import sw_css.admin.milestone.application.dto.request.MilestoneHistoryRejectRequest;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(MilestoneHistoryAdminController.class)
public class MilestoneHistoryAdminApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 마일스톤 실적을 승인할 수 있다.")
    public void approveMilestoneHistory() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("historyId").description("마일스톤 실적의 id")
        );
        final Long historyId = 1L;

        // when
        doNothing().when(milestoneHistoryAdminCommandService).approveMilestoneHistory(historyId);

        // then
        mockMvc.perform(
                        RestDocumentationRequestBuilders.patch("/admin/milestones/histories/{historyId}/approve", historyId))
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
        doNothing().when(milestoneHistoryAdminCommandService).rejectMilestoneHistory(historyId, request);

        // then
        mockMvc.perform(
                        RestDocumentationRequestBuilders.patch("/admin/milestones/histories/{historyId}/reject", historyId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNoContent())
                .andDo(document("milestone-history-reject", pathParameters, requestBodySnippet));
    }
}
