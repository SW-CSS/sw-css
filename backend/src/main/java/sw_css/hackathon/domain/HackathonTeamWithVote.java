package sw_css.hackathon.domain;

public record HackathonTeamWithVote(
        Long id,
        String name,
        String work,
        String githubUrl,
        String imageUrl,
        Long vote,
        String prize
) {
}
