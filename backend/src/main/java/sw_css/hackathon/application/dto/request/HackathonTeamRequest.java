package sw_css.hackathon.application.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record HackathonTeamRequest(
        @NotBlank(message="팀명을 기재해주세요.")
        String name,
        @NotBlank(message="프로젝트명을 기재해주세요.")
        String work,
        @NotBlank(message="프로젝트의 깃헙 레포지토리의 url을 기재해주세요.")
        String githubUrl,
        @NotNull(message="팀장의 학번과 역할을 기재해주세요.")
        HackathonTeamMemberRequest leader,
        @NotNull(message="팀원의 정보를 넣어주세요.")
        List<HackathonTeamMemberRequest> members
) {
    public record HackathonTeamMemberRequest(
            @NotNull(message="팀원의 학번을 기재해주세요.")
            Long id,
            @NotBlank(message="팀원의 역할을 기재해주세요.")
            String role
    ){}
}

