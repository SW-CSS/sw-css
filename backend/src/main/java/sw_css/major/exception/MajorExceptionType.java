package sw_css.major.exception;

import org.springframework.http.HttpStatus;
import sw_css.base.BaseExceptionType;

public enum MajorExceptionType implements BaseExceptionType {
    NOT_FOUND_COLLEGE(HttpStatus.NOT_FOUND, "해당하는 단과대학이 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    MajorExceptionType(final HttpStatus httpStatus, final String errorMessage) {
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

