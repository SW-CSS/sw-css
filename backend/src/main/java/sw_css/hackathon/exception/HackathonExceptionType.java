package sw_css.hackathon.exception;

import org.springframework.http.HttpStatus;
import sw_css.base.BaseExceptionType;

public enum HackathonExceptionType implements BaseExceptionType {
    NOT_FOUND_HACKATHON(HttpStatus.NOT_FOUND, "해당 해커톤이 존재하지 않습니다."),
    NOT_FOUND_HACKATHON_TEAM(HttpStatus.NOT_FOUND, "해당하는 팀이 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    HackathonExceptionType(final HttpStatus httpStatus, final String errorMessage) {
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
