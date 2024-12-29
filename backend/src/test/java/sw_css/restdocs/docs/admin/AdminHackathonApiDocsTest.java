package sw_css.restdocs.docs.admin;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.QueryParametersSnippet;
import sw_css.admin.hackathon.api.AdminHackathonController;
import sw_css.admin.hackathon.application.AdminHackathonQueryService;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonDetailResponse;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonResponse;
import sw_css.hackathon.domain.Hackathon;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(AdminHackathonController.class)
public class AdminHackathonApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 관리자가 해커톤 전체 목록 조회 가능")
    public void findAllHackathons() throws Exception {
        // given
        final QueryParametersSnippet queryParameters = queryParameters(
                parameterWithName("page").optional().description("조회할 해커톤의 페이지 번호"),
                parameterWithName("size").optional().description("조회할 해커톤의 페이지 당 데이터 수"),
                parameterWithName("name").optional().description("조죄할 해커톤 명"),
                parameterWithName("visibleStatus").optional().description("조회할 해커톤 상태 (ACTIVE / INACTIVE)")
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
                fieldWithPath("content[].hackathonStartDate").type(JsonFieldType.STRING).description("해커톤 시작 날(yyyy-MM-dd)"),
                fieldWithPath("content[].hackathonEndDate").type(JsonFieldType.STRING).description("해커톤 마지막 날(yyyy-MM-dd)"),
                fieldWithPath("content[].password").type(JsonFieldType.STRING).description("해커톤 비밀번호"),
                fieldWithPath("content[].visibleStatus").type(JsonFieldType.BOOLEAN).description("해커톤 활성화 상태")
        );

        final Page<Hackathon> hackathonPage = new PageImpl<>(List.of(
                new Hackathon(1L, "제5회 PNU 창의융합 소프트웨어해커톤", "# 해커톤 설명 **bold**", "1234", LocalDate.parse("2024-05-22"), LocalDate.parse("2024-05-29"), LocalDate.parse("2024-05-22"), LocalDate.parse("2024-09-07"), "1.png", true, false),
                new Hackathon(2L, "제4회 PNU 창의융합 소프트웨어해커톤", "# 해커톤 설명 **bold**", "1234", LocalDate.parse("2022-03-22"), LocalDate.parse("2022-05-29"), LocalDate.parse("2022-12-22"), LocalDate.parse("2023-03-07"), "1.png", true, false)),
                PageRequest.of(0, 10),
                2
        );

        final Page<AdminHackathonResponse> response = AdminHackathonResponse.from(hackathonPage);

        final String hackathonName = "해커톤";
        final String visibleStatus = "ACTIVE";

        final String token = "Bearer AccessToken";

        // when
        when(adminHackathonQueryService.findAllHackathons(any(), any(), any())).thenReturn(response);

        // then
        mockMvc.perform(
                RestDocumentationRequestBuilders.get("/admin/hackathons")
                        .param("name", hackathonName)
                        .param("visibleStatus", visibleStatus)
                        .param("page", "0")
                        .param("size", "10")
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isOk())
                .andDo(document("admin-hackathon-find-all",queryParameters, responseBodySnippet));
    }

    // 해커톤 상세 조회
    @Test
    @DisplayName("[성공] 관리자가 해커톤 상세 조회 가능")
    public void findHackathon() throws Exception {
        // given
        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("id").type(JsonFieldType.NUMBER).description("해커톤 id"),
                fieldWithPath("name").type(JsonFieldType.STRING).description("해커톤 명"),
                fieldWithPath("description").type(JsonFieldType.STRING).description("해커톤 내용"),
                fieldWithPath("imageUrl").type(JsonFieldType.STRING).description("해커톤 배너 이미지"),
                fieldWithPath("applyStartDate").type(JsonFieldType.STRING).description("해커톤 지원 시작일"),
                fieldWithPath("applyEndDate").type(JsonFieldType.STRING).description("해커톤 지원 마지막날"),
                fieldWithPath("hackathonStartDate").type(JsonFieldType.STRING).description("해커톤 대회 시작일"),
                fieldWithPath("hackathonEndDate").type(JsonFieldType.STRING).description("해커톤 대회 마지막날"),
                fieldWithPath("password").type(JsonFieldType.STRING).description("해커톤 비밀번호"),
                fieldWithPath("visibleStatus").type(JsonFieldType.BOOLEAN).description("해커톤 활성화 상태")
        );

        final AdminHackathonDetailResponse response = new AdminHackathonDetailResponse(
                1L, "제5회 PNU 창의융합 소프트웨어해커톤", "# 해커톤 설명 **bold**", "1.png", LocalDate.parse("2024-05-22"), LocalDate.parse("2024-05-29"), LocalDate.parse("2024-05-22"), LocalDate.parse("2024-09-07"), "1234", true
        );
        final Long hackathonId = 1L;
        final String token = "Bearer AccessToken";

        // when
        when(adminHackathonQueryService.findHackathonById(hackathonId)).thenReturn(response);

        // then
        mockMvc.perform(
                RestDocumentationRequestBuilders.get("/admin/hackathons/{hackathonId}", hackathonId)
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isOk())
                .andDo(document("admin-hackathon-find", responseBodySnippet));
    }

    // 해커톤 생성

    // 해커톤 수정

    // 해커톤 삭제

    // 해커톤 투표 결과 다운로드

    // 해커톤 활성화 수정

    // 해커톤 상장 수정


}
