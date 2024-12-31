package sw_css.hackathon.application.dto.response;

import java.util.List;

public record HackathonPrizeResponse(
        String prize,
        List<HackathonTeamPrize> teams
) {
    public record HackathonTeamPrize(
            Long id,
            String name,
            Long memberCount,
            String work
    ){}
}
