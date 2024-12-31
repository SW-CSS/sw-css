package sw_css.restdocs.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import org.springframework.restdocs.request.QueryParametersSnippet;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonDetailResponse;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonResponse;
import sw_css.hackathon.api.HackathonController;
import sw_css.hackathon.application.dto.response.HackathonDetailResponse;
import sw_css.hackathon.application.dto.response.HackathonPrizeResponse;
import sw_css.hackathon.application.dto.response.HackathonPrizeResponse.HackathonTeamPrize;
import sw_css.hackathon.application.dto.response.HackathonResponse;
import sw_css.hackathon.domain.Hackathon;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(HackathonController.class)
public class HackathonApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 모든 사람은 해커톤 목록을 조회할 수 있다.")
    public void findAllHackathons() throws Exception {
        // given
        final QueryParametersSnippet queryParametersSnippet = queryParameters(
                parameterWithName("page").optional().description("조회할 해커톤의 페이지 번호"),
                parameterWithName("size").optional().description("조회할 해커톤의 페이지 당 데이터 수"),
                parameterWithName("name").optional().description("조죄할 해커톤 명")
        );

        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수"),
                fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("총 데이터 수"),
                fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 내 데이터 수"),
                fieldWithPath("number").type(JsonFieldType.NUMBER).description("페이지 번호"),
                fieldWithPath("sort.empty").type(JsonFieldType.BOOLEAN).description("정렬 속성의 존재 여부"),
                fieldWithPath("sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬 여부"),
                fieldWithPath("sort.unsorted").type(JsonFieldType.BOOLEAN).description("정렬여부"),
                fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("첫 페이지인지 여부"),
                fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("마지막 페이지인지 여부"),
                fieldWithPath("pageable.pageNumber").type(JsonFieldType.NUMBER).description("요청한 페이지번호"),
                fieldWithPath("pageable.pageSize").type(JsonFieldType.NUMBER).description("요청한 페이지크기"),
                fieldWithPath("pageable.sort.empty").type(JsonFieldType.BOOLEAN).description("요청한 데이터가 비었는지 여부"),
                fieldWithPath("pageable.sort.sorted").type(JsonFieldType.BOOLEAN).description("요청한 데이터 정렬 기준 존재 여부"),
                fieldWithPath("pageable.sort.unsorted").type(JsonFieldType.BOOLEAN).description("요청한 데이터 정렬 기준 존재 여부"),
                fieldWithPath("pageable.offset").type(JsonFieldType.NUMBER).description("요청한 페이지오프셋"),
                fieldWithPath("pageable.paged").type(JsonFieldType.BOOLEAN).description("페이징 여부"),
                fieldWithPath("pageable.unpaged").type(JsonFieldType.BOOLEAN).description("페이징 여부"),
                fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("총 데이터 수"),
                fieldWithPath("empty").type(JsonFieldType.BOOLEAN).description("데이터의 존재 여부"),
                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("해커톤 id"),
                fieldWithPath("content[].name").type(JsonFieldType.STRING).description("해커톤 명"),
                fieldWithPath("content[].applyStartDate").type(JsonFieldType.STRING).description("해커톤 지원 시작 날(yyyy-MM-dd)"),
                fieldWithPath("content[].applyEndDate").type(JsonFieldType.STRING).description("해커톤 지원 마지막 날(yyyy-MM-dd)"),
                fieldWithPath("content[].hackathonStartDate").type(JsonFieldType.STRING).description("해커톤 대회 시작 날(yyyy-MM-dd)"),
                fieldWithPath("content[].hackathonEndDate").type(JsonFieldType.STRING).description("해커톤 대회 마지막 날(yyyy-MM-dd)"),
                fieldWithPath("content[].imageUrl").type(JsonFieldType.STRING).description("해커톤 배너 이미지")
        );

        final Page<Hackathon> hackathonPage = new PageImpl<>(List.of(
                new Hackathon(1L, "제5회 PNU 창의융합 소프트웨어해커톤", "# 해커톤 설명 **bold**", "1234", LocalDate.parse("2024-05-22"), LocalDate.parse("2024-05-29"), LocalDate.parse("2024-05-22"), LocalDate.parse("2024-09-07"), "1.png", true, false),
                new Hackathon(2L, "제4회 PNU 창의융합 소프트웨어해커톤", "# 해커톤 설명 **bold**", "1234", LocalDate.parse("2022-03-22"), LocalDate.parse("2022-05-29"), LocalDate.parse("2022-12-22"), LocalDate.parse("2023-03-07"), "1.png", true, false)),
                PageRequest.of(0, 10),
                2
        );
        final Page<HackathonResponse> response = HackathonResponse.from(hackathonPage);

        final String hackathonName = "해커톤";

        // when
        when(hackathonQueryService.findAllHackathon(any(), any())).thenReturn(response);

        // then
        mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/hackathons")
                                .param("name", hackathonName)
                                .param("page", "0")
                                .param("size", "10"))
                .andExpect(status().isOk())
                .andDo(document("hackathon-find-all", queryParametersSnippet, responseBodySnippet));
    }

    @Test
    @DisplayName("[성공] 모든 사람은 해커톤 상세 조회를 할 수 있다.")
    public void findHackathonById() throws Exception {
        // given
        final PathParametersSnippet pathParameterSnippet = pathParameters(
                parameterWithName("hackathonId").description("해커톤 id")
        );

        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("id").type(JsonFieldType.NUMBER).description("해커톤 id"),
                fieldWithPath("name").type(JsonFieldType.STRING).description("해커톤 명"),
                fieldWithPath("description").type(JsonFieldType.STRING).description("해커톤 내용"),
                fieldWithPath("imageUrl").type(JsonFieldType.STRING).description("해커톤 배너 이미지"),
                fieldWithPath("applyStartDate").type(JsonFieldType.STRING).description("해커톤 지원 시작일"),
                fieldWithPath("applyEndDate").type(JsonFieldType.STRING).description("해커톤 지원 마지막날"),
                fieldWithPath("hackathonStartDate").type(JsonFieldType.STRING).description("해커톤 대회 시작일"),
                fieldWithPath("hackathonEndDate").type(JsonFieldType.STRING).description("해커톤 대회 마지막날")
        );


        final HackathonDetailResponse response = new HackathonDetailResponse(
                1L, "제5회 PNU 창의융합 소프트웨어해커톤", "# 해커톤 설명 **bold**",  LocalDate.parse("2024-05-22"), LocalDate.parse("2024-05-29"), LocalDate.parse("2024-05-22"), LocalDate.parse("2024-09-07"), "1.png"
        );
        final Long hackathonId = 1L;

        // when
        when(hackathonQueryService.findHackathon(hackathonId)).thenReturn(response);

        // then
        mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/hackathons/{hackathonId}", hackathonId))
                .andExpect(status().isOk())
                .andDo(document("hackathon-find", pathParameterSnippet, responseBodySnippet));
    }

    @Test
    @DisplayName("[성공] 모든 사용자는 해커톤의 수상 내역을 조회할 수 있다.")
    public void findHackathonPrize() throws Exception {
        // given
        PathParametersSnippet pathParameterSnippet = pathParameters(
                parameterWithName("hackathonId").description("해커톤 id")
        );

        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("[].prize").type(JsonFieldType.STRING).description("상장 타입 (GRAND_PRIZE, EXCELLENCE_PRIZE, MERIT_PRIZE, ENCOURAGEMENT_PRIZE)"),
                fieldWithPath("[].teams[].id").type(JsonFieldType.NUMBER).description("해커톤 팀 id"),
                fieldWithPath("[].teams[].name").type(JsonFieldType.STRING).description("해커톤 팀명"),
                fieldWithPath("[].teams[].work").type(JsonFieldType.STRING).description("해커톤 팀의 프로젝트 명"),
                fieldWithPath("[].teams[].memberCount").type(JsonFieldType.NUMBER).description("해커톤 팀의 팀원 수")
        );

        final List<HackathonTeamPrize> teams = List.of(
                new HackathonTeamPrize(1L, "팀명입니다", 4L, "프로젝트명입니다"),
                new HackathonTeamPrize(2L, "팀명2입니다", 4L, "프로젝트명2입니다")
        );
        final List<HackathonPrizeResponse> response = List.of(
                new HackathonPrizeResponse("GRAND_PRIZE", teams),
                new HackathonPrizeResponse("EXCELLENCE_PRIZE", teams),
                new HackathonPrizeResponse("MERIT_PRIZE", teams),
                new HackathonPrizeResponse("ENCOURAGEMENT_PRIZE", teams)
        );

        final Long hackathonId = 1L;

        // when
        when(hackathonQueryService.findHackathonPrizes(hackathonId)).thenReturn(response);

        // then
        mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/hackathons/{hackathonId}/prize", hackathonId))
                .andExpect(status().isOk())
                .andDo(document("hackathon-find-prize", pathParameterSnippet, responseBodySnippet));
    }
}
