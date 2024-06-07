package sw_css.milestone.exception;

import org.springframework.http.HttpStatus;
import sw_css.base.BaseExceptionType;

public enum MilestoneHistoryExceptionType implements BaseExceptionType {
    NOT_FOUND_MILESTONE_HISTORY(HttpStatus.NOT_FOUND, "해당하는 마일스톤 실적이 존재하지 않습니다."),
    ALREADY_PROCESSED(HttpStatus.BAD_REQUEST, "해당 마일스톤 실적은 이미 처리된 상태입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    MilestoneHistoryExceptionType(final HttpStatus httpStatus, final String errorMessage) {
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
    }

    @Override
    public HttpStatus httpStatus() {
        return httpStatus;
    }

    @Override
    public String errorMessage() {
        return errorMessage;
    }
}
