package sw_css.milestone.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw_css.milestone.domain.repository.MilestoneRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class MilestoneCommandService {

    private final MilestoneRepository milestoneRepository;

}
