package sw_css.milestone.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MilestoneGroup {
    ACTIVITY("실전적"), GLOBAL("글로벌"), COMMUNITY("커뮤니티");
    private final String label;
}
