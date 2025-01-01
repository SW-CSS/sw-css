package sw_css.hackathon.application;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.hackathon.application.dto.response.HackathonTeamResponse;
import sw_css.hackathon.domain.repository.HackathonRepository;
import sw_css.hackathon.domain.repository.HackathonTeamRepository;
import sw_css.hackathon.exception.HackathonException;
import sw_css.hackathon.exception.HackathonExceptionType;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HackathonTeamQueryService {

    private final HackathonTeamRepository hackathonTeamRepository;
    private final HackathonRepository hackathonRepository;

    public Page<HackathonTeamResponse> findAllHackathonTeam(final Pageable pageable, final Long hackathonId) {
        hackathonRepository.findById(hackathonId).orElseThrow(() -> new HackathonException(HackathonExceptionType.NOT_FOUND_HACKATHON));

        return hackathonTeamRepository.findByHackathonIdWithPageable(hackathonId, pageable);
    }
}
