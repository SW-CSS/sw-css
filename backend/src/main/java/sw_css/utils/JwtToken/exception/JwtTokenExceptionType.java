package sw_css.utils.JwtToken.exception;

import org.springframework.http.HttpStatus;
import sw_css.base.BaseExceptionType;

public enum JwtTokenExceptionType implements BaseExceptionType {
    JWT_TOKEN_INACCESSIBLE(HttpStatus.FORBIDDEN, "권한이 없습니다."),
    JWT_TOKEN_MALFORMED(HttpStatus.BAD_REQUEST, "만료된 토큰입니다."),
    JWT_TOKEN_EXPIRED(HttpStatus.BAD_REQUEST, "손상된 토큰입니다."),
    JWT_TOKEN_UNSUPPORTED(HttpStatus.BAD_REQUEST, "지원하지 않는 토큰입니다."),
    JWT_TOKEN_WRONG_SIGNATURE(HttpStatus.BAD_REQUEST, "시그니처 검증에 실패한  토큰입니다."),
    JWT_TOKEN_UNKNOWN(HttpStatus.BAD_REQUEST, "알 수 없는 이유로 유효하지 않은  토큰입니다."),
    JWT_TOKEN_EMPTY(HttpStatus.BAD_REQUEST, "토큰이 비어있습니다.");


    private final HttpStatus httpStatus;
    private final String errorMessage;

    JwtTokenExceptionType(HttpStatus httpStatus, String errorMessage) {
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
