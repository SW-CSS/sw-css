package sw_css.member.exception;

import org.springframework.http.HttpStatus;
import sw_css.base.BaseExceptionType;

public enum MemberExceptionType implements BaseExceptionType {
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 회원을 찾을 수 없습니다."),
    MEMBER_WRONG_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호가 잘못되었습니다."),
    NOT_FOUND_STUDENT(HttpStatus.NOT_FOUND, "해당하는 학생이 존재하지 않습니다."),
    INVALID_SEARCH_FIELD_ID(HttpStatus.BAD_REQUEST, "검색 유형이 올바르지 않습니다."),
    ;


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
