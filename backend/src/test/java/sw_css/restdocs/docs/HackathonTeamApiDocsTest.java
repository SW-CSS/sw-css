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


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import sw_css.hackathon.api.HackathonTeamController;
import sw_css.hackathon.application.HackathonTeamQueryService;
import sw_css.hackathon.application.dto.response.HackathonTeamResponse;
import sw_css.hackathon.application.dto.response.HackathonTeamResponse.HackathonTeamMemberResponse;
import sw_css.hackathon.domain.HackathonPrize;
import sw_css.hackathon.domain.HackathonRole;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(HackathonTeamController.class)
public class HackathonTeamApiDocsTest  extends RestDocsTest {

    @Autowired
    private HackathonTeamQueryService hackathonTeamQueryService;

    @Test
    @DisplayName("[성공] 모든 사용자는 해커톤 팀 목록을 조회할 수 있다.")
    public void findAllHackathonTeams() throws Exception {
        // given
        final PathParametersSnippet pathParameterSnippet = pathParameters(
                parameterWithName("hackathonId").description("해커톤 id"),
                parameterWithName("page").optional().description("조회할 해커톤 팀의 페이지"),
                parameterWithName("size").optional().description("조회할 해커톤의 페이지 당 데이터 수")
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
                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("팀의 id"),
                fieldWithPath("content[].name").type(JsonFieldType.STRING).description("팀의 이름"),
                fieldWithPath("content[].work").type(JsonFieldType.STRING).description("팀의 프로젝트 명"),
                fieldWithPath("content[].githubUrl").type(JsonFieldType.STRING).description("팀의 깃헙 레포 url"),
                fieldWithPath("content[].imageUrl").type(JsonFieldType.STRING).description("팀의 썸네일 이미지"),
                fieldWithPath("content[].prize").type(JsonFieldType.STRING).description("팀의 상장 타입 (GRAND_PRIZE, EXCELLENCE_PRIZE, MERIT_PRIZE, ENCOURAGEMENT_PRIZE, NONE_PRIZE)"),
                fieldWithPath("content[].vote").type(JsonFieldType.NUMBER).description("팀의 투표 득표수"),
                fieldWithPath("content[].members.DEVELOPER[].id").type(JsonFieldType.NUMBER).description("팀원 중 개발자의 학번"),
                fieldWithPath("content[].members.DEVELOPER[].name").type(JsonFieldType.STRING).description("팀원 중 개발자의 이름"),
                fieldWithPath("content[].members.DEVELOPER[].major").type(JsonFieldType.STRING).description("팀원 중 개발자의 전공"),
                fieldWithPath("content[].members.DEVELOPER[].isLeader").type(JsonFieldType.BOOLEAN).description("팀이 팀장 여부"),
                fieldWithPath("content[].members.DESIGNER[].id").type(JsonFieldType.NUMBER).description("팀원 중 개발자의 학번"),
                fieldWithPath("content[].members.DESIGNER[].name").type(JsonFieldType.STRING).description("팀원 중 개발자의 이름"),
                fieldWithPath("content[].members.DESIGNER[].major").type(JsonFieldType.STRING).description("팀원 중 개발자의 전공"),
                fieldWithPath("content[].members.DESIGNER[].isLeader").type(JsonFieldType.BOOLEAN).description("팀이 팀장 여부"),
                fieldWithPath("content[].members.PLANNER[].id").type(JsonFieldType.NUMBER).description("팀원 중 개발자의 학번"),
                fieldWithPath("content[].members.PLANNER[].name").type(JsonFieldType.STRING).description("팀원 중 개발자의 이름"),
                fieldWithPath("content[].members.PLANNER[].major").type(JsonFieldType.STRING).description("팀원 중 개발자의 전공"),
                fieldWithPath("content[].members.PLANNER[].isLeader").type(JsonFieldType.BOOLEAN).description("팀이 팀장 여부"),
                fieldWithPath("content[].members.OTHER[].id").type(JsonFieldType.NUMBER).description("팀원 중 개발자의 학번"),
                fieldWithPath("content[].members.OTHER[].name").type(JsonFieldType.STRING).description("팀원 중 개발자의 이름"),
                fieldWithPath("content[].members.OTHER[].major").type(JsonFieldType.STRING).description("팀원 중 개발자의 전공"),
                fieldWithPath("content[].members.OTHER[].isLeader").type(JsonFieldType.BOOLEAN).description("팀이 팀장 여부")
        );

        final Long hackathonId = 1L;
        final Pageable pageable = PageRequest.of(0, 10);

        final List<HackathonTeamMemberResponse> members = List.of(
                new HackathonTeamMemberResponse(202012345L, "학생 이름", "학생 전공", true),
                new HackathonTeamMemberResponse(202012345L, "학생 이름", "학생 전공", false));
        final Map<String, List<HackathonTeamMemberResponse>> memberMap =  new HashMap<>();
        memberMap.put(HackathonRole.DEVELOPER.toString(), members);
        memberMap.put(HackathonRole.DESIGNER.toString(), members);
        memberMap.put(HackathonRole.PLANNER.toString(), members);
        memberMap.put(HackathonRole.OTHER.toString(), members);

        Page<HackathonTeamResponse> response = new PageImpl<>(
                List.of(
                        new HackathonTeamResponse(1L, "팀명1", "프로젝트명1", "https://github.com/SW-CSS/sw-css", "1.png", 98L, HackathonPrize.GRAND_PRIZE.toString(), memberMap),
                        new HackathonTeamResponse(2L, "팀명2", "프로젝트명2", "https://github.com/SW-CSS/sw-css", "2.png", 60L, HackathonPrize.GRAND_PRIZE.toString(), memberMap)),
                pageable, 2
        );

        // when
        when(hackathonTeamQueryService.findAllHackathonTeam(pageable, hackathonId)).thenReturn(response);

        // then
        mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/hackathons/{hackathonId}/teams", hackathonId)
                                .param("page", "0")
                                .param("size", "10"))
                .andExpect(status().isOk())
                .andDo(document("hackathon-team-find-all", pathParameterSnippet, responseBodySnippet));
    }

}
