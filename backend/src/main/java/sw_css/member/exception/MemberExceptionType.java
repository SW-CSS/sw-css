package sw_css.member.exception;

import org.springframework.http.HttpStatus;
import sw_css.base.BaseExceptionType;

public enum MemberExceptionType implements BaseExceptionType {
    NOT_FOUND_STUDENT(HttpStatus.NOT_FOUND, "해당하는 학생이 존재하지 않습니다.");


    private final HttpStatus httpStatus;
    private final String errorMessage;

    MemberExceptionType(final HttpStatus httpStatus, final String errorMessage) {
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
