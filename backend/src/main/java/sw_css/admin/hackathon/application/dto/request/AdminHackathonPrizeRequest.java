package sw_css.admin.hackathon.application.dto.request;

import java.util.List;

public record AdminHackathonPrizeRequest(List<AdminTeam> teams) {
    public record AdminTeam(Long id, String prize){}
}
