package sw_css.admin.auth.exception;

import lombok.Setter;
import org.springframework.http.HttpStatus;
import sw_css.base.BaseExceptionType;

public enum AdminAuthExceptionType implements BaseExceptionType {
    NO_MATCH_EXTENSION(HttpStatus.BAD_REQUEST, "파일 확장자가 올바르지 않습니다."),
    CANNOT_OPEN_FILE(HttpStatus.BAD_REQUEST, "파일을 열 수 없습니다."),
    FAILED_REGISTER_FACULTY(HttpStatus.BAD_REQUEST, ""),
    MEMBER_EMAIL_DUPLICATE(HttpStatus.CONFLICT, "이메일이 중복됩니다."),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 회원을 찾을 수 없습니다."),
    ;

    private final HttpStatus httpStatus;
    @Setter
    private String errorMessage;

    AdminAuthExceptionType(final HttpStatus httpStatus, final String errorMessage) {
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
