package sw_css.restdocs.docs.admin;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
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
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import org.springframework.restdocs.request.QueryParametersSnippet;
import org.springframework.restdocs.request.RequestPartsSnippet;
import sw_css.admin.hackathon.api.AdminHackathonController;
import sw_css.admin.hackathon.application.AdminHackathonQueryService;
import sw_css.admin.hackathon.application.dto.request.AdminHackathonActiveRequest;
import sw_css.admin.hackathon.application.dto.request.AdminHackathonPrizeRequest;
import sw_css.admin.hackathon.application.dto.request.AdminHackathonPrizeRequest.AdminTeam;
import sw_css.admin.hackathon.application.dto.request.AdminHackathonRequest;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonDetailResponse;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonResponse;
import sw_css.hackathon.domain.Hackathon;
import sw_css.hackathon.domain.HackathonPrize;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(AdminHackathonController.class)
public class AdminHackathonApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 관리자가 해커톤 전체 목록을 조회할 수 있다.")
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

    @Test
    @DisplayName("[성공] 관리자가 해커톤 상세 조회할 수 있다.")
    public void findHackathon() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(
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
                .andDo(document("admin-hackathon-find", pathParameters, responseBodySnippet));
    }

    @Test
    @DisplayName("[성공] 관리자의 해커톤 생성할 수 있다.")
    public void registerHackathon() throws Exception {
        // given
        final RequestPartsSnippet requestPartsSnippet = requestParts(
                partWithName("request").description(
                        "해커톤 정보( name: 해커톤 명, description: 해커톤 내용, password: 해커톤 비밀번호, applyStartDate: 해커톤 지원 시작일(yyy-MM-dd), applyEndDate: 해커톤 지원 미자믹일(yyy-MM-dd), hackathonStartDate: 해커돈 대회 시작일(yyy-MM-dd), hackathonEndDate: 해커톤 대회 마지막일(yyy-MM-dd))"),
                partWithName("file").description("해커톤 배너 이미지"));

        final MockMultipartFile file = new MockMultipartFile("file", "test.png", "multipart/form-data", "example".getBytes());
        final AdminHackathonRequest request = new AdminHackathonRequest("제5회 PNU 창의융합 소프트웨어해커톤", "# 해커톤 설명 **bold**", "1234", LocalDate.parse("2024-05-22"), LocalDate.parse("2024-05-29"), LocalDate.parse("2024-05-22"), LocalDate.parse("2024-09-07"));
        final MockMultipartFile requestFile = new MockMultipartFile("request", null, "application/json", objectMapper.writeValueAsString(request).getBytes());
        final String token = "Bearer AccessToken";
        final Long hackathonId = 1L;

        // when
        when(adminHackathonCommandService.registerHackathon(file, request)).thenReturn(hackathonId);

        // then
        mockMvc.perform(
                multipart("/admin/hackathons")
                        .file(file)
                        .file(requestFile)
                        .contentType(MediaType.MULTIPART_MIXED)
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isCreated())
                .andDo(document("admin-hackathon-register", requestPartsSnippet));
    }

    @Test
    @DisplayName("[성공] 관리자의 해커톤 수정할 수 있다.")
    public void updateHackathon() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("hackathonId").description("해커톤 id")
        );

        final RequestPartsSnippet requestPartsSnippet = requestParts(
                partWithName("request").description(
                        "해커톤 정보( name: 해커톤 명, description: 해커톤 내용, password: 해커톤 비밀번호, applyStartDate: 해커톤 지원 시작일(yyy-MM-dd), applyEndDate: 해커톤 지원 미자믹일(yyy-MM-dd), hackathonStartDate: 해커돈 대회 시작일(yyy-MM-dd), hackathonEndDate: 해커톤 대회 마지막일(yyy-MM-dd))"),
                partWithName("file").optional().description("해커톤 배너 이미지: optional"));

        final MockMultipartFile file = new MockMultipartFile("file", "test.png", "multipart/form-data", "example".getBytes());
        final AdminHackathonRequest request = new AdminHackathonRequest("제5회 PNU 창의융합 소프트웨어해커톤", "# 해커톤 설명 **bold**", "1234", LocalDate.parse("2024-05-22"), LocalDate.parse("2024-05-29"), LocalDate.parse("2024-05-22"), LocalDate.parse("2024-09-07"));
        final MockMultipartFile requestFile = new MockMultipartFile("request", null, "application/json", objectMapper.writeValueAsString(request).getBytes());
        final String token = "Bearer AccessToken";
        final Long hackathonId = 1L;

        // when
        doNothing().when(adminHackathonCommandService).updateHackathon(hackathonId, file, request);

        // then
        mockMvc.perform(
                    multipart("/admin/hackathons/{hackathonId}", hackathonId)
                            .file(file)
                            .file(requestFile)
                            .contentType(MediaType.MULTIPART_MIXED)
                            .content(objectMapper.writeValueAsString(request))
                            .header(HttpHeaders.AUTHORIZATION, token)
                            .with(request1 -> {
                                request1.setMethod("PATCH");
                                return request1;
                            }))
                .andExpect(status().isNoContent())
                .andDo(document("admin-hackathon-update", pathParameters, requestPartsSnippet));
    }

    @Test
    @DisplayName("[성공] 관리자는 해커톤을 삭제할 수 있다.")
    public void deleteHackathon() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("hackathonId").description("해커톤 id")
        );

        final Long hackathonId = 1L;
        final String token = "Bearer AccessToken";

        // when
        doNothing().when(adminHackathonCommandService).deleteHackathon(hackathonId);

        // then
        mockMvc.perform(delete("/admin/hackathons/{hackathonId}", hackathonId)
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isNoContent())
                .andDo(document("admin-hackathon-delete", pathParameters));
    }

    @Test
    @DisplayName("[성공] 관리자는 해커톤 투표 결과를 다운로드 받을 수 있다.")
    public void downloadHackathonVote() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("hackathonId").description("해커톤 id")
        );

        final byte[] response = new byte[]{};
        final Long hackathonId = 1L;
        final String token = "Bearer AccessToken";

        // when
        when(adminHackathonQueryService.downloadHackathonVotesById(hackathonId)).thenReturn(response);

        // then
        mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/admin/hackathons/{hackathonId}/download/votes", hackathonId)
                                .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isOk())
                .andDo(document("admin-hackathon-download-vote", pathParameters));
    }

    @Test
    @DisplayName("[성공] 관리자는 해커톤의 활성화를 수정할 수 있다.")
    public void updateHackathonActive() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(parameterWithName("hackathonId").description("해커톤 id"));
        final RequestFieldsSnippet requestFieldsSnippet = requestFields(fieldWithPath("visibleStatus").type(JsonFieldType.STRING).description("해커톤 활성화 상태 (ACTIVE / INACTIVE)"));

        final AdminHackathonActiveRequest request = new AdminHackathonActiveRequest("ACTIVE");
        final Long hackathonId = 1L;
        final String token = "Bearer AccessToken";

        // when
        doNothing().when(adminHackathonCommandService).activeHackathon(hackathonId, request.visibleStatus());

        // then
        mockMvc.perform(
                patch("/admin/hackathons/{hackathonId}/active", hackathonId)
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isNoContent())
                .andDo(document("admin-hackathon-update-active", pathParameters, requestFieldsSnippet));
    }

    @Test
    @DisplayName("[성공] 관리자는 해커톤 팀에게 상을 부여할 수 있다.")
    public void updateHackathonTeamPrize() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(parameterWithName("hackathonId").description("해커톤 id"));
        final RequestFieldsSnippet requestFieldsSnippet = requestFields(
                fieldWithPath("teams[].id").type(JsonFieldType.NUMBER).description("해커톤 팀의 id"),
                fieldWithPath("teams[].prize").type(JsonFieldType.STRING).description("해커톤 팀의 상 (GRAND_PRIZE: 대상, EXCELLENCE_PRIZE: 최우수상, MERIT_PRIZE: 우수상, ENCOURAGEMENT_PRIZE: 장려상, NONE_PRIZE: 상없음)")
        );

        final List<AdminTeam> AdminTeams = List.of(
                new AdminTeam(1L, HackathonPrize.GRAND_PRIZE.toString()),
                new AdminTeam(2L, HackathonPrize.NONE_PRIZE.toString())
        );
        final AdminHackathonPrizeRequest request = new AdminHackathonPrizeRequest(AdminTeams);
        final Long hackathonId = 1L;
        final String token = "Bearer AccessToken";

        // when
        doNothing().when(adminHackathonCommandService).hackathonChangePrize(hackathonId, request.teams());

        // then
        mockMvc.perform(
                patch("/admin/hackathons/{hackathonId}/prize", hackathonId)
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isNoContent())
                .andDo(document("admin-hackathon-change-prize", pathParameters, requestFieldsSnippet));
    }


}
