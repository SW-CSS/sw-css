package sw_css.auth.exception;

import org.springframework.http.HttpStatus;
import sw_css.base.BaseExceptionType;

public enum AuthExceptionType implements BaseExceptionType {
    MEMBER_EMAIL_DUPLICATE(HttpStatus.CONFLICT, "이메일이 중복됩니다."),
    MEMBER_STUDENT_ID_DUPLICATE(HttpStatus.CONFLICT, "학번이 중복됩니다."),
    MEMBER_PHONE_NUMBER_DUPLICATE(HttpStatus.CONFLICT, "전화번호가 중복됩니다."),
    MAJOR_NOT_EXIST(HttpStatus.BAD_REQUEST, "존재하지 않는 전공 입니다."),
    AUTH_CODE_EXPIRED(HttpStatus.BAD_REQUEST, "만료된 인증코드입니다."),
    AUTH_CODE_MISMATCH(HttpStatus.BAD_REQUEST, "인증코드가 일치하지 않습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String errorMessage;

    AuthExceptionType(final HttpStatus httpStatus, final String errorMessage) {
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
