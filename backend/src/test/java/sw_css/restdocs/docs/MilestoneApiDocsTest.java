package sw_css.restdocs.docs;

import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import sw_css.milestone.api.MilestoneController;
import sw_css.milestone.application.dto.response.MilestonesByCategoryResponse;
import sw_css.milestone.domain.Milestone;
import sw_css.milestone.domain.MilestoneCategory;
import sw_css.milestone.domain.MilestoneGroup;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(MilestoneController.class)
public class MilestoneApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 마일스톤 목록을 조회할 수 있다.")
    void findAllMilestones() throws Exception {
        //given
        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("마일스톤의 카테고리 id"),
                fieldWithPath("[].name").type(JsonFieldType.STRING).description("마일스톤의 카테고리 이름"),
                fieldWithPath("[].group").type(JsonFieldType.STRING).description("마일스톤의 카테고리 유형"),
                fieldWithPath("[].limitScore").type(JsonFieldType.NUMBER).description("마일스톤 카테고리의 최대 점수"),
                fieldWithPath("[].milestones[].id").type(JsonFieldType.NUMBER).description("마일스톤 id"),
                fieldWithPath("[].milestones[].name").type(JsonFieldType.STRING).description("마일스톤 이름"),
                fieldWithPath("[].milestones[].score").type(JsonFieldType.NUMBER).description("마일스톤 활동 점수"),
                fieldWithPath("[].milestones[].limitCount").type(JsonFieldType.NUMBER).description("마일스톤 활동 상한 횟수")
        );

        MilestoneCategory category1 = new MilestoneCategory(1L, "SW 관련 창업",
                MilestoneGroup.ACTIVITY, 100,
                List.of(new Milestone(1L, null, "창업", 100, 1), new Milestone(2L, null, "교과", 50, 2)));
        MilestoneCategory category2 = new MilestoneCategory(2L, "TOPCIT",
                MilestoneGroup.ACTIVITY, 60,
                List.of(new Milestone(3L, null, "수준 3 이상", 60, 0), new Milestone(4L, null, "수준 2 이상", 50, 0)));

        final List<MilestonesByCategoryResponse> response = MilestonesByCategoryResponse.from(
                List.of(category1, category2));

        //when
        when(milestoneQueryService.findMilestones()).thenReturn(response);

        //then
        mockMvc.perform(get("/milestones"))
                .andExpect(status().isOk())
                .andDo(document("milestone.http-find-all", responseBodySnippet));

    }
}
