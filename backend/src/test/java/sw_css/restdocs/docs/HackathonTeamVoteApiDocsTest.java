package sw_css.restdocs.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpHeaders;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import sw_css.hackathon.api.HackathonTeamVoteController;
import sw_css.hackathon.application.dto.response.HackathonTeamVoteResponse;
import sw_css.member.domain.Member;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(HackathonTeamVoteController.class)
public class HackathonTeamVoteApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 회원은 팀 투표를 조회할 수 있다.")
    public void findHackathonTeamVote() throws Exception {
        // given
        final PathParametersSnippet pathParameterSnippet = pathParameters(
                parameterWithName("hackathonId").description("해당 팀이 속한 해커톤 id"),
                parameterWithName("teamId").description("팀의 id")
        );

        final ResponseFieldsSnippet responseFieldSnippet = responseFields(
                fieldWithPath("voted").type(JsonFieldType.BOOLEAN).description("해당 팀에 투표했는지 여부"));

        final Long hackathonId = 1L;
        final Long teamId = 1L;
        final HackathonTeamVoteResponse response = new HackathonTeamVoteResponse(true);
        final String token = "Bearer Access Token";

        // when
        when(hackathonTeamVoteQueryService.findHackathonTeamVote(any(), any(), any())).thenReturn(response);

        // then
        mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/hackathons/{hackathonId}/teams/{teamId}/vote", hackathonId, teamId)
                                .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isOk())
                .andDo(document("hackathon-team-vote", pathParameterSnippet, responseFieldSnippet));
    }

    @Test
    @DisplayName("[성공] 회원은 팀에 투표할 수 있다.")
    public void registerHackathonTeamVote() throws Exception {
        // given
        final PathParametersSnippet pathParameterSnippet = pathParameters(
                parameterWithName("hackathonId").description("해당 팀이 속한 해커톤 id"),
                parameterWithName("teamId").description("팀의 id")
        );

        final Member me = new Member(1L, "ddang@pusan.ac.kr", "ddang", "qwer1234!", "01012341234");
        final Long hackathonId = 1L;
        final Long teamId = 1L;
        final String token = "Bearer Access Token";

        // when
        doNothing().when(hackathonTeamVoteCommandService).registerHackathonTeamVote(me, hackathonId, teamId);

        // then
        mockMvc.perform(
                        post("/hackathons/{hackathonId}/teams/{teamId}/vote", hackathonId, teamId)
                                .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isNoContent())
                .andDo(document("hackathon-team-vote-register", pathParameterSnippet));
    }

    @Test
    @DisplayName("[성공] 회원은 팀의 투표를 취소할 수 있다.")
    public void cancelHackathonTeamVote() throws Exception {
        // given
        final PathParametersSnippet pathParameterSnippet = pathParameters(
                parameterWithName("hackathonId").description("해당 팀이 속한 해커톤 id"),
                parameterWithName("teamId").description("팀의 id")
        );

        final Member me = new Member(1L, "ddang@pusan.ac.kr", "ddang", "qwer1234!", "01012341234");
        final Long hackathonId = 1L;
        final Long teamId = 1L;
        final String token = "Bearer Access Token";

        // when
        doNothing().when(hackathonTeamVoteCommandService).deleteHackathonTeamVote(me, hackathonId, teamId);

        // then
        mockMvc.perform(
                        delete("/hackathons/{hackathonId}/teams/{teamId}/vote", hackathonId, teamId)
                                .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isNoContent())
                .andDo(document("hackathon-team-vote-cancel", pathParameterSnippet));
    }
}
