package sw_css.milestone.exception;

import org.springframework.http.HttpStatus;
import sw_css.base.BaseExceptionType;

public enum MilestoneExceptionType implements BaseExceptionType {
    NOT_FOUND_MILESTONE(HttpStatus.NOT_FOUND, "해당하는 마일스톤이 존재하지 않습니다.");


    private final HttpStatus httpStatus;
    private final String errorMessage;

    MilestoneExceptionType(final HttpStatus httpStatus, final String errorMessage) {
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
