package sw_css.restdocs.docs.admin;

import static org.mockito.Mockito.doNothing;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpHeaders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import sw_css.admin.hackathon.api.AdminHackathonTeamController;
import sw_css.hackathon.application.dto.request.HackathonTeamRequest;
import sw_css.hackathon.application.dto.request.HackathonTeamRequest.HackathonTeamMemberRequest;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(AdminHackathonTeamController.class)
public class AdminHackathonTeamApiDocsTest  extends RestDocsTest {

    @Test
    @DisplayName("[성공] 관리자는 해커톤 팀의 정보를 수정할 수 있다.")
    public void updateHackathonTeam() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("hackathonId").description("해커톤의 id"),
                parameterWithName("teamId").description("팀의 id")
        );
        final RequestFieldsSnippet requestFieldsSnippet = requestFields(
                fieldWithPath("name").type(JsonFieldType.STRING).description("팀명"),
                fieldWithPath("work").type(JsonFieldType.STRING).description("프로젝트 명"),
                fieldWithPath("githubUrl").type(JsonFieldType.STRING).description("프로젝트 명"),
                fieldWithPath("leader.id").type(JsonFieldType.NUMBER).description("팀 리더의 학번"),
                fieldWithPath("leader.role").type(JsonFieldType.STRING).description("팀 리더의 역할 (DEVELOPER: 개발자, DESIGNER: 디자이너, PLANNER: 기획자, OTHER: 기타)"),
                fieldWithPath("members[].id").type(JsonFieldType.NUMBER).description("팀원의 학번"),
                fieldWithPath("members[].role").type(JsonFieldType.STRING).description("팀원의 역할 (DEVELOPER: 개발자, DESIGNER: 디자이너, PLANNER: 기획자, OTHER: 기타)")
        );

        final Long hackathonId = 1L;
        final Long teamId = 1L;
        final HackathonTeamMemberRequest leader = new HackathonTeamMemberRequest(202055555L, "DEVELOPER");
        final HackathonTeamRequest request = new HackathonTeamRequest("팀명", "프로젝트명", "https://www.github.com", leader, List.of(new HackathonTeamMemberRequest(202012345L, "OTHER")));
        final String token = "Bearer AccessToken";

        // when
        doNothing().when(adminHackathonTeamCommandService).updateHackathonTeam(hackathonId, teamId, request);

        // then
        mockMvc.perform(
                        patch("/admin/hackathons/{hackathonId}/teams/{teamId}", hackathonId, teamId)
                                .contentType(APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                                .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isNoContent())
                .andDo(document("admin-hackathon-team-update", pathParameters, requestFieldsSnippet));
    }

    @Test
    @DisplayName("[성공] 관리자는 해커톤의 팀을 삭제할 수 있다.")
    public void deleteHackathonTeam() throws Exception {
        // given
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("hackathonId").description("해커톤의 id"),
                parameterWithName("teamId").description("팀의 id")
        );
        final Long hackathonId = 1L;
        final Long teamId = 1L;
        final String token = "Bearer AccessToken";

        // when
        doNothing().when(adminHackathonTeamCommandService).deleteHackathonTeam(hackathonId, teamId);

        // then
        mockMvc.perform(
                delete("/admin/hackathons/{hackathonId}/teams/{teamId}", hackathonId, teamId)
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isNoContent())
                .andDo(document("admin-hackathon-team-delete", pathParameters));
    }
}
