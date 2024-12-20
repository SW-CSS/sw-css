package sw_css.admin.hackathon.application;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.admin.hackathon.application.dto.response.HackathonDetailResponse;
import sw_css.admin.hackathon.application.dto.response.HackathonResponse;
import sw_css.admin.hackathon.exception.HackathonException;
import sw_css.admin.hackathon.exception.HackathonExceptionType;
import sw_css.hackathon.domain.Hackathon;
import sw_css.hackathon.domain.repository.HackathonRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HackathonQueryService {
    private final HackathonRepository hackathonRepository;

    public Page<HackathonResponse> findAllHackathons(final Pageable pageable,
                                                     final String name,
                                                     final String visibleStatus) {
        if(name != null && visibleStatus != null) {
            Page<Hackathon> hackathons =  hackathonRepository.findByNameContainingAndVisibleStatus(name, visibleStatus.equals("ACTIVE"), pageable);
            return HackathonResponse.from(hackathons);
        }
        if(name != null) {
            Page<Hackathon> hackathons = hackathonRepository.findByNameContaining(name, pageable);
            return HackathonResponse.from(hackathons);
        }
        if(visibleStatus != null) {
            Page<Hackathon> hackathons =  hackathonRepository.findByVisibleStatus(visibleStatus.equals("ACTIVE"), pageable);
            return HackathonResponse.from(hackathons);
        }

        Page<Hackathon> hackathons = hackathonRepository.findAll(pageable);
        return HackathonResponse.from(hackathons);
    }

    public HackathonDetailResponse findHackathonById(final Long id) {
        Hackathon hackathon = hackathonRepository.findById(id).orElseThrow(
                () -> new HackathonException(HackathonExceptionType.NOT_FOUND_HACKATHON));

        return HackathonDetailResponse.of(hackathon);
    }

}
