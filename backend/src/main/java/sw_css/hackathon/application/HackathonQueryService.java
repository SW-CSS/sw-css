package sw_css.hackathon.application;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.hackathon.application.dto.response.HackathonDetailResponse;
import sw_css.hackathon.application.dto.response.HackathonPrizeResponse;
import sw_css.hackathon.application.dto.response.HackathonPrizeResponse.HackathonTeamPrize;
import sw_css.hackathon.application.dto.response.HackathonResponse;
import sw_css.hackathon.domain.Hackathon;
import sw_css.hackathon.domain.HackathonPrize;
import sw_css.hackathon.domain.HackathonTeam;
import sw_css.hackathon.domain.repository.HackathonRepository;
import sw_css.hackathon.domain.repository.HackathonTeamMemberRepository;
import sw_css.hackathon.domain.repository.HackathonTeamRepository;
import sw_css.hackathon.exception.HackathonException;
import sw_css.hackathon.exception.HackathonExceptionType;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HackathonQueryService {

    private final HackathonRepository hackathonRepository;
    private final HackathonTeamRepository hackathonTeamRepository;
    private final HackathonTeamMemberRepository hackathonTeamMemberRepository;

    public Page<HackathonResponse> findAllHackathon(Pageable pageable,
                                                    final String name) {
        Sort sort = Sort.by(Sort.Order.desc("hackathonStartDate"));
        Pageable pageableWithSort = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        if(name != null) {
            Page<Hackathon> hackathons =  hackathonRepository.findAllByNameContainingAndVisibleStatusIsTrue(name, pageableWithSort);
            return HackathonResponse.from(hackathons);
        }
        Page<Hackathon> hackathons = hackathonRepository.findAllByVisibleStatusIsTrue(pageableWithSort);
        return HackathonResponse.from(hackathons);
    }

    public HackathonDetailResponse findHackathon(final Long id) {
        Hackathon hackathon = hackathonRepository.findByIdAndVisibleStatusIsTrue(id).orElseThrow(
                () -> new HackathonException(HackathonExceptionType.NOT_FOUND_HACKATHON));

        return HackathonDetailResponse.of(hackathon);
    }

    public List<HackathonPrizeResponse> findHackathonPrizes(final Long id) {
        List<HackathonTeamPrize> grandTeams = findHackathonTeamPrizeByIdAndPrizeName(id, HackathonPrize.GRAND_PRIZE.toString());
        List<HackathonTeamPrize> excellenceTeams = findHackathonTeamPrizeByIdAndPrizeName(id, HackathonPrize.EXCELLENCE_PRIZE.toString());
        List<HackathonTeamPrize> meritTeams = findHackathonTeamPrizeByIdAndPrizeName(id, HackathonPrize.MERIT_PRIZE.toString());
        List<HackathonTeamPrize> encouragementTeams = findHackathonTeamPrizeByIdAndPrizeName(id, HackathonPrize.ENCOURAGEMENT_PRIZE.toString());

        List<HackathonPrizeResponse> prizes = new ArrayList<>();
        prizes.add(new HackathonPrizeResponse(HackathonPrize.GRAND_PRIZE.toString(), grandTeams));
        prizes.add(new HackathonPrizeResponse(HackathonPrize.EXCELLENCE_PRIZE.toString(), excellenceTeams));
        prizes.add(new HackathonPrizeResponse(HackathonPrize.MERIT_PRIZE.toString(), meritTeams));
        prizes.add(new HackathonPrizeResponse(HackathonPrize.ENCOURAGEMENT_PRIZE.toString(), encouragementTeams));

        return prizes;
    }

    private List<HackathonTeamPrize> findHackathonTeamPrizeByIdAndPrizeName(Long id, String prize) {
        List<HackathonTeam> teams = hackathonTeamRepository.findByHackathonIdAndPrizeEquals(id, prize);
        return convertHackathonTeamToHackathonTeamPrize(teams);
    }

    private List<HackathonTeamPrize> convertHackathonTeamToHackathonTeamPrize(List<HackathonTeam> teams) {
        return teams.stream().map(team -> {
            Long teamCount = hackathonTeamMemberRepository.countByHackathonIdAndTeamId(team.getId(), team.getId());
            return new HackathonTeamPrize(team.getId(), team.getName(), teamCount, team.getWork());
        }).toList();
    }
}
