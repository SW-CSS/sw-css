package sw_css.hackathon.exception;

import org.springframework.http.HttpStatus;
import sw_css.base.BaseExceptionType;

public enum HackathonExceptionType implements BaseExceptionType {
    NOT_FOUND_HACKATHON(HttpStatus.NOT_FOUND, "해당 해커톤이 존재하지 않습니다."),
    NOT_FOUND_HACKATHON_TEAM(HttpStatus.NOT_FOUND, "해당하는 팀이 존재하지 않습니다."),
    INVALID_ROLE_STATUS(HttpStatus.BAD_REQUEST,"올바르지 않는 형식의 팀원 역할입니다."),
    INVALID_STUDENT_ID(HttpStatus.BAD_REQUEST,"올바르지 않는 형식의 팀원 학번입니다."),
    INVALID_TEAM_MEMBER(HttpStatus.BAD_REQUEST, "팀원이 중복으로 존재할 수 없습니다."),
    INVALID_TEAM_CREATOR(HttpStatus.BAD_REQUEST, "팀원이 아닌 사람이 팀을 만들 수 없습니다."),
    INVALID_TEAM_UPDATER(HttpStatus.BAD_REQUEST, "해당 팀의 수정 권한이 없습니다.");


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
