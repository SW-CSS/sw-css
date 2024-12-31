package sw_css.hackathon.application;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.admin.hackathon.application.dto.response.AdminHackathonDetailResponse;
import sw_css.hackathon.application.dto.response.HackathonDetailResponse;
import sw_css.hackathon.application.dto.response.HackathonResponse;
import sw_css.hackathon.domain.Hackathon;
import sw_css.hackathon.domain.repository.HackathonRepository;
import sw_css.hackathon.exception.HackathonException;
import sw_css.hackathon.exception.HackathonExceptionType;

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

    public HackathonDetailResponse findHackathon(final Long id) {
        Hackathon hackathon = hackathonRepository.findByIdAndVisibleStatusIsTrue(id).orElseThrow(
                () -> new HackathonException(HackathonExceptionType.NOT_FOUND_HACKATHON));

        return HackathonDetailResponse.of(hackathon);
    }
}
