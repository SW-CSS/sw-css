package sw_css.hackathon.domain;

public record HackathonTeamWithVote(
        Long id,
        Long hackathonId,
        String name,
        String work,
        String githubUrl,
        String imageUrl,
        Long vote,
        String prize
) {
    static public HackathonTeamWithVote of(HackathonTeam team, Long vote) {
        return new HackathonTeamWithVote(team.getId(), team.getHackathon().getId(), team.getName(), team.getWork(), team.getGithubUrl(), team.getImageUrl(), vote, team.getPrize());
    }
}
