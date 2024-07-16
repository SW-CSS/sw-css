package sw_css.restdocs.docs.admin;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import org.springframework.restdocs.request.QueryParametersSnippet;
import org.springframework.restdocs.request.RequestPartsSnippet;
import sw_css.admin.milestone.api.MilestoneHistoryAdminController;
import sw_css.admin.milestone.application.dto.request.MilestoneHistoryRejectRequest;
import sw_css.admin.milestone.application.dto.response.MilestoneHistoryResponse;
import sw_css.admin.milestone.application.dto.response.MilestoneScoreResponse;
import sw_css.major.domain.College;
import sw_css.major.domain.Major;
import sw_css.member.application.dto.response.StudentMemberReferenceResponse;
import sw_css.member.domain.CareerType;
import sw_css.member.domain.Member;
import sw_css.member.domain.StudentMember;
import sw_css.milestone.application.dto.response.MilestoneScoreOfStudentResponse;
import sw_css.milestone.domain.Milestone;
import sw_css.milestone.domain.MilestoneCategory;
import sw_css.milestone.domain.MilestoneGroup;
import sw_css.milestone.domain.MilestoneStatus;
import sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo;
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

    @Test
    @DisplayName("[성공] 전체 마일스톤 실적 목록을 조회할 수 있다.")
    void findAllMilestoneHistories() throws Exception {
        //given
        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("마일스톤 실적 id"),
                fieldWithPath("[].milestone.id").type(JsonFieldType.NUMBER).description("마일스톤 실적의 마일스톤 id"),
                fieldWithPath("[].milestone.name").type(JsonFieldType.STRING).description("마일스톤 실적의 마일스톤 명칭"),
                fieldWithPath("[].milestone.categoryName").type(JsonFieldType.STRING)
                        .description("마일스톤 실적의 마일스톤 카테고리 이름"),
                fieldWithPath("[].milestone.categoryGroup").type(JsonFieldType.STRING)
                        .description("마일스톤 실적의 마일스톤 카테고리 유형"),
                fieldWithPath("[].milestone.score").type(JsonFieldType.NUMBER).description("마일스톤 실적의 마일스톤 점수"),
                fieldWithPath("[].student.id").type(JsonFieldType.NUMBER).description("실적을 등록한 학생의 id"),
                fieldWithPath("[].student.name").type(JsonFieldType.STRING).description("실적을 등록한 학생의 이름"),
                fieldWithPath("[].description").type(JsonFieldType.STRING).description("마일스톤 활동에 대한 설명"),
                fieldWithPath("[].fileUrl").type(JsonFieldType.STRING).description("마일스톤 실적 등록 시 첨부된 파일 접근 url"),
                fieldWithPath("[].status").type(JsonFieldType.STRING).description("마일스톤 실적의 처리 상태"),
                fieldWithPath("[].rejectReason").type(JsonFieldType.STRING).optional().description("마일스톤 실적 반려 사유"),
                fieldWithPath("[].count").type(JsonFieldType.NUMBER).description("마일스톤 활동 횟수"),
                fieldWithPath("[].activatedAt").type(JsonFieldType.STRING).description("마일스톤 활동을 한 날짜(yyyy-MM-dd)"),
                fieldWithPath("[].createdAt").type(JsonFieldType.STRING).optional()
                        .description("마일스톤 실적이 등록된 날짜(yyyy-MM-dd HH:mm:ss)")
        );

        MilestoneCategory category = new MilestoneCategory(1L, "SW 관련 창업",
                MilestoneGroup.ACTIVITY, 100, null);
        final Milestone milestone = new Milestone(1L, category, "창업", 100, 1);
        final StudentMember student = new StudentMember(202055558L,
                new Member(1L, "abc@naver.com", "홍길동", "password", "010-0000-0000", false),
                new Major(1L, new College(1L, "인문대학"), "사회학과"), null, null, CareerType.EMPLOYMENT_COMPANY,
                "IT 사기업 개발자로 취업");
        final List<MilestoneHistoryWithStudentInfo> milestones = List.of(
                new MilestoneHistoryWithStudentInfo(1L, milestone, category,
                        StudentMemberReferenceResponse.from(student), "창업했습니다.",
                        "https://skfdlfjeklf.png", MilestoneStatus.PENDING, null, 1, LocalDate.parse("2024-06-06"),
                        LocalDateTime.parse("2024-06-05T00:00:00")),
                new MilestoneHistoryWithStudentInfo(2L, milestone, category,
                        StudentMemberReferenceResponse.from(student), "창업했습니다.",
                        "https://skfdlfjeklf.png", MilestoneStatus.PENDING, null, 1, LocalDate.parse("2024-06-06"),
                        LocalDateTime.parse("2024-06-05T00:00:00")),
                new MilestoneHistoryWithStudentInfo(3L, milestone, category,
                        StudentMemberReferenceResponse.from(student), "창업했습니다.",
                        "https://skfdlfjeklf.png", MilestoneStatus.APPROVED, null, 1, LocalDate.parse("2024-06-06"),
                        LocalDateTime.parse("2024-06-05T00:00:00"))
        );

        final List<MilestoneHistoryResponse> response = MilestoneHistoryResponse.from(milestones);

        //when
        when(milestoneHistoryAdminQueryService.findAllMilestoneHistories()).thenReturn(response);

        //then
        mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/admin/milestones/histories"))
                .andExpect(status().isOk())
                .andDo(document("milestone-history-find-all", responseBodySnippet));

    }

    @Test
    @DisplayName("엑셀 파일로 마일스톤 실적 내역을 일괄 등록할 수 있다.")
    void registerMilestoneHistoriesInBatches() throws Exception {
        //given
        final RequestPartsSnippet requestPartsSnippet = requestParts(
                partWithName("file").description("일괄 등록할 마일스톤 실적 정보가 담긴 엑셀 파일(.xls, .xlsx)")
        );

        final MockMultipartFile request = new MockMultipartFile("file", "test.xls", "multipart/form-data",
                "example".getBytes());

        // when
        doNothing().when(milestoneHistoryAdminCommandService).registerMilestoneHistoriesInBatches(any());

        // then
        mockMvc.perform(multipart("/admin/milestones/histories").file(request)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8"))
                .andExpect(status().isCreated())
                .andDo(document("milestone-history-create-in-batch", requestPartsSnippet));
    }

    @Test
    @DisplayName("[성공] 모든 학생의 마일스톤 점수 현황을 조회할 수 있다.")
    void findAllMilestoneHistoryScores() throws Exception {
        //given
        final QueryParametersSnippet queryParameters = queryParameters(
                parameterWithName("start_date").description("조회할 마일스톤 점수 현황의 시작일"),
                parameterWithName("end_date").description("조회할 마일스톤 점수 현황의 종료일")
        );

        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("[].student.id").type(JsonFieldType.NUMBER).description("학생의 학번"),
                fieldWithPath("[].student.name").type(JsonFieldType.STRING).description("학생의 이름"),
                fieldWithPath("[].milestoneScores[].id").type(JsonFieldType.NUMBER).description("마일스톤 카테고리 id"),
                fieldWithPath("[].milestoneScores[].name").type(JsonFieldType.STRING).description("마일스톤 카테고리 이름"),
                fieldWithPath("[].milestoneScores[].group").type(JsonFieldType.STRING).description("마일스톤 카테고리 유형"),
                fieldWithPath("[].milestoneScores[].score").type(JsonFieldType.NUMBER).description("마일스톤 점수")
        );

        final StudentMember student1 = new StudentMember(202055558L,
                new Member(1L, "abc@naver.com", "홍길동", "password", "010-0000-0000", false),
                new Major(1L, new College(1L, "인문대학"), "사회학과"), null, null, CareerType.EMPLOYMENT_COMPANY,
                "IT 사기업 개발자로 취업");
        final StudentMember student2 = new StudentMember(202000000L,
                new Member(2L, "abc@naver.com", "김아무개", "password", "010-0000-0000", false),
                new Major(1L, new College(1L, "인문대학"), "사회학과"), null, null, CareerType.EMPLOYMENT_COMPANY,
                "IT 사기업 개발자로 취업");
        final List<MilestoneScoreResponse> response = List.of(
                new MilestoneScoreResponse(StudentMemberReferenceResponse.from(student1), List.of(
                        MilestoneScoreOfStudentResponse.of(new MilestoneCategory(1L, "SW 관련 창업",
                                MilestoneGroup.ACTIVITY, 100, null), 50),
                        MilestoneScoreOfStudentResponse.of(new MilestoneCategory(2L, "TOPCIT",
                                MilestoneGroup.ACTIVITY, 60, null), 0))),
                new MilestoneScoreResponse(StudentMemberReferenceResponse.from(student2), List.of(
                        MilestoneScoreOfStudentResponse.of(new MilestoneCategory(1L, "SW 관련 창업",
                                MilestoneGroup.ACTIVITY, 100, null), 50))));
        final String startDate = "2024-06-01";
        final String endDate = "2024-06-08";

        //when
        when(milestoneHistoryAdminQueryService.findAllMilestoneHistoryScores(startDate, endDate, "0", "10")).thenReturn(
                response);

        //then
        mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/admin/milestones/histories/scores")
                                .param("start_date", startDate)
                                .param("end_date", endDate))
                .andExpect(status().isOk())
                .andDo(document("milestone-history-score-find-all", queryParameters,
                        responseBodySnippet));
    }

}
