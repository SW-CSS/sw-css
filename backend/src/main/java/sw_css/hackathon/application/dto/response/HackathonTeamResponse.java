package sw_css.hackathon.application.dto.response;

public record HackathonTeamResponse(
        Long id,
        String name,
        String imageUrl,
        String work,
        String githubUrl,
        Long vote,
        String prize
) {
}
