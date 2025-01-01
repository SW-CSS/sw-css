package sw_css.hackathon.application.dto.response;

public record HackathonTeamResponse(
        Long id,
        String name,
        String work,
        String githubUrl,
        String imageUrl,
        Long vote,
        String prize
) {
}
