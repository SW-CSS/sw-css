package sw_css.hackathon.api;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sw_css.hackathon.application.HackathonQueryService;
import sw_css.hackathon.application.dto.response.HackathonDetailResponse;
import sw_css.hackathon.application.dto.response.HackathonPrizeResponse;
import sw_css.hackathon.application.dto.response.HackathonResponse;

@Validated
@RequestMapping("/hackathons")
@RestController
@RequiredArgsConstructor
public class HackathonController {

    private final HackathonQueryService hackathonQueryService;

    @GetMapping
    public ResponseEntity<Page<HackathonResponse>> findAllHackathons(
            final Pageable pageable,
            @RequestParam(value = "name", required = false) final String name
    ) {
        return ResponseEntity.ok(
                hackathonQueryService.findAllHackathon(pageable, name)
        );
    }

    @GetMapping("{hackathonId}")
    public ResponseEntity<HackathonDetailResponse> findHackathonById(
            final @PathVariable Long hackathonId
    ) {
        return ResponseEntity.ok(
                hackathonQueryService.findHackathon(hackathonId)
        );
    }

    @GetMapping("{hackathonId}/prize")
    public ResponseEntity<List<HackathonPrizeResponse>> findHackathonPrize(
            final @PathVariable Long hackathonId
    ) {
        return ResponseEntity.ok(
                hackathonQueryService.findHackathonPrizes(hackathonId)
        );
    }
}
