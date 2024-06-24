package sw_css.milestone.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.milestone.application.dto.response.MilestonesByCategoryResponse;
import sw_css.milestone.domain.repository.MilestoneCategoryRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MilestoneQueryService {

    private final MilestoneCategoryRepository milestoneCategoryRepository;

    public List<MilestonesByCategoryResponse> findMilestones() {
        return MilestonesByCategoryResponse.from(milestoneCategoryRepository.findAll());

    }
}
