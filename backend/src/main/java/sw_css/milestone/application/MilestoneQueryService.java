package sw_css.milestone.application;

import static java.util.stream.Collectors.groupingBy;

import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.milestone.application.dto.response.MilestonesByCategoryResponse;
import sw_css.milestone.domain.MilestoneGroup;
import sw_css.milestone.domain.repository.MilestoneCategoryRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MilestoneQueryService {

    private final MilestoneCategoryRepository milestoneCategoryRepository;

    public Map<MilestoneGroup, List<MilestonesByCategoryResponse>> findMilestones() {
        return MilestonesByCategoryResponse.from(milestoneCategoryRepository.findAll())
                .stream()
                .collect(groupingBy(MilestonesByCategoryResponse::group));

    }
}
