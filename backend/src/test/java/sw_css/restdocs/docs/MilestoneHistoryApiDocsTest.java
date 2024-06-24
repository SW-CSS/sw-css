package sw_css.restdocs.docs;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import org.springframework.restdocs.request.QueryParametersSnippet;
import org.springframework.restdocs.request.RequestPartsSnippet;
import sw_css.major.domain.College;
import sw_css.major.domain.Major;
import sw_css.member.domain.Member;
import sw_css.member.domain.StudentMember;
import sw_css.milestone.api.MilestoneHistoryController;
import sw_css.milestone.application.dto.request.MilestoneHistoryCreateRequest;
import sw_css.milestone.application.dto.response.MilestoneHistoryOfStudentResponse;
import sw_css.milestone.application.dto.response.MilestoneScoreOfStudentResponse;
import sw_css.milestone.domain.Milestone;
import sw_css.milestone.domain.MilestoneCategory;
import sw_css.milestone.domain.MilestoneGroup;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.domain.MilestoneStatus;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(MilestoneHistoryController.class)
public class MilestoneHistoryApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 마일스톤 실적을 등록할 수 있다.")
    public void registerMilestoneHistory() throws Exception {
        // given
        final RequestPartsSnippet requestPartsSnippet = requestParts(
                partWithName("request").description(
                        "마일스톤 실적 정보(milestoneId-마일스톤 id, description - 활동에 대한 설명, count - 활동 횟수, activatedAt - 활동 일자(yyyy-MM-dd))"),
                partWithName("file").description("증빙 자료 파일")

        );
        final MockMultipartFile file = new MockMultipartFile("file", "test.png", "multipart/form-data",
                "example".getBytes());
        final MilestoneHistoryCreateRequest request = new MilestoneHistoryCreateRequest(1L, "대회 수상했습니다.", 3,
                LocalDate.parse("2024-06-05"));
        final MockMultipartFile requestFile = new MockMultipartFile("request", null, "application/json",
                objectMapper.writeValueAsString(request).getBytes());
        // when
        when(milestoneHistoryCommandService.registerMilestoneHistory(file, request)).thenReturn(1L);

        // then
        mockMvc.perform(multipart("/milestones/histories")
                        .file(file)
                        .file(requestFile)
                        .contentType(MediaType.MULTIPART_MIXED)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andDo(document("milestone-history-create", requestPartsSnippet));
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
    @DisplayName("[성공] 특정 학생의 마일스톤 실적 목록을 조회할 수 있다.")
    void findAllMilestoneHistories() throws Exception {
        //given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("memberId").description("학생의 학번(id)")
        );

        final QueryParametersSnippet queryParameters = queryParameters(
                parameterWithName("filter").optional().description("조회할 마일스톤 실적 내역의 필터링 설정(APPROVED)")
        );

        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("마일스톤 실적 id"),
                fieldWithPath("[].milestone.id").type(JsonFieldType.NUMBER).description("마일스톤 실적의 마일스톤 id"),
                fieldWithPath("[].milestone.name").type(JsonFieldType.STRING).description("마일스톤 실적의 마일스톤 명칭"),
                fieldWithPath("[].milestone.categoryName").type(JsonFieldType.STRING)
                        .description("마일스톤 실적의 마일스톤 카테고리 이름"),
                fieldWithPath("[].milestone.categoryGroup").type(JsonFieldType.STRING)
                        .description("마일스톤 실적의 마일스톤 카테고리 유형"),
                fieldWithPath("[].milestone.score").type(JsonFieldType.NUMBER).description("마일스톤 실적의 마일스톤 점수"),
                fieldWithPath("[].description").type(JsonFieldType.STRING).description("마일스톤 활동에 대한 설명"),
                fieldWithPath("[].fileUrl").type(JsonFieldType.STRING)
                        .description("마일스톤 실적 등록 시 첨부된 파일 접근 url"),
                fieldWithPath("[].status").type(JsonFieldType.STRING).description("마일스톤 실적의 처리 상태"),
                fieldWithPath("[].rejectReason").type(JsonFieldType.STRING).optional().description("마일스톤 실적 반려 사유"),
                fieldWithPath("[].count").type(JsonFieldType.NUMBER).description("마일스톤 활동 횟수"),
                fieldWithPath("[].activatedAt").type(JsonFieldType.STRING)
                        .description("마일스톤 활동을 한 날짜(yyyy-MM-dd)"),
                fieldWithPath("[].createdAt").type(JsonFieldType.STRING).optional()
                        .description("마일스톤 실적이 등록된 날짜(yyyy-MM-dd HH:mm:ss)")
        );

        final Milestone milestone = new Milestone(1L, new MilestoneCategory(1L, "SW 관련 창업",
                MilestoneGroup.ACTIVITY, 100, null), "창업", 100, 1);
        final StudentMember student = new StudentMember(202055558L,
                new Member(1L, "abc@naver.com", "홍길동", "password", "010-0000-0000", false),
                new Major(1L, new College(1L, "인문대학"), "사회학과"), null, null, "취업", "IT 사기업 개발자로 취업");

        final List<MilestoneHistoryOfStudentResponse> response = MilestoneHistoryOfStudentResponse.from(
                List.of(new MilestoneHistory(1L, milestone, student.getId(), "창업했습니다.", "https://skfdlfjeklf.png",
                                MilestoneStatus.PENDING, null, 1, LocalDate.parse("2024-06-06"), false),
                        new MilestoneHistory(1L, milestone, student.getId(), "창업했습니다.", "https://skfdlfjeklf.png",
                                MilestoneStatus.APPROVED, null, 1, LocalDate.parse("2024-06-06"), false)));
        final Long memberId = 1L;

        //when
        when(milestoneHistoryQueryService.findAllMilestoneHistories(memberId, null)).thenReturn(response);

        //then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/milestones/histories/members/{memberId}", memberId))
                .andExpect(status().isOk())
                .andDo(document("milestone-history-of-student-find-all", pathParameters, queryParameters,
                        responseBodySnippet));
    }

    @Test
    @DisplayName("[성공] 특정 학생의 마일스톤 점수 현황을 조회할 수 있다.")
    void findAllMilestoneHistoryScores() throws Exception {
        //given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("memberId").description("학생의 학번(id)")
        );

        final QueryParametersSnippet queryParameters = queryParameters(
                parameterWithName("start_date").description("조회할 마일스톤 점수 현황의 시작일"),
                parameterWithName("end_date").description("조회할 마일스톤 점수 현황의 종료일")
        );

        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("마일스톤 카테고리 id"),
                fieldWithPath("[].name").type(JsonFieldType.STRING).description("마일스톤 카테고리 이름"),
                fieldWithPath("[].group").type(JsonFieldType.STRING).description("마일스톤 카테고리 유형"),
                fieldWithPath("[].limitScore").type(JsonFieldType.NUMBER).description("마일스톤 카테고리 최대 점수"),
                fieldWithPath("[].score").type(JsonFieldType.NUMBER).description("마일스톤 점수")
        );

        final List<MilestoneScoreOfStudentResponse> response = List.of(
                MilestoneScoreOfStudentResponse.of(new MilestoneCategory(1L, "SW 관련 창업",
                        MilestoneGroup.ACTIVITY, 100, null), 50),
                MilestoneScoreOfStudentResponse.of(new MilestoneCategory(2L, "TOPCIT",
                        MilestoneGroup.ACTIVITY, 60, null), 0));
        final Long memberId = 1L;
        final String startDate = "2024-06-01";
        final String endDate = "2024-06-08";

        //when
        when(milestoneHistoryQueryService.findAllMilestoneHistoryScores(memberId, startDate, endDate)).thenReturn(
                response);

        //then
        mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/milestones/histories/scores/members/{memberId}", memberId)
                                .param("start_date", startDate)
                                .param("end_date", endDate))
                .andExpect(status().isOk())
                .andDo(document("milestone-history-score-of-student-find-all", pathParameters, queryParameters,
                        responseBodySnippet));
    }
}
