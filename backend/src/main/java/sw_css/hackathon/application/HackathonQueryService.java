package sw_css.hackathon.application;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonResponse;
import sw_css.admin.hackathon.domain.HackathonStatus;
import sw_css.hackathon.application.dto.response.HackathonResponse;
import sw_css.hackathon.domain.Hackathon;
import sw_css.hackathon.domain.repository.HackathonRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HackathonQueryService {

    private final HackathonRepository hackathonRepository;

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
}
