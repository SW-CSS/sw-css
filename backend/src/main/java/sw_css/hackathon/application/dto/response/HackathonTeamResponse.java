package sw_css.hackathon.application.dto.response;

import java.util.List;
import java.util.Map;
import sw_css.hackathon.domain.HackathonTeamWithVote;

public record HackathonTeamResponse(
        Long id,
        String name,
        String work,
        String githubUrl,
        String imageUrl,
        Long vote,
        String prize,
        Map<String, List<HackathonTeamMemberResponse>> members
) {
    public record HackathonTeamMemberResponse(
            Long id,
            String name,
            String major,
            boolean isLeader
    ) {}

    static public HackathonTeamResponse of(HackathonTeamWithVote team, Map<String, List<HackathonTeamMemberResponse>> members) {
        return new HackathonTeamResponse(
                team.id(), team.name(), team.work(), team.githubUrl(), team.imageUrl(), team.vote(), team.prize(), members
        );
    }
}
