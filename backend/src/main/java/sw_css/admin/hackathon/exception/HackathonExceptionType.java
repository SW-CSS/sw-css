package sw_css.admin.hackathon.exception;

import org.springframework.http.HttpStatus;
import sw_css.base.BaseExceptionType;

public enum HackathonExceptionType implements BaseExceptionType {
    NOT_FOUND_HACKATHON(HttpStatus.NOT_FOUND, "해당 해커톤이 존재하지 않습니다."),
    NOT_EXIST_FILE(HttpStatus.BAD_REQUEST, "파일을 첨부해야 합니다."),
    CANNOT_OPEN_FILE(HttpStatus.BAD_REQUEST, "파일을 열 수 없습니다."),
    INVALID_PRIZE_STATUS(HttpStatus.BAD_REQUEST,"올바르지 않는 상장 형식입니다."),
    INVALID_ACTIVE_STATUS(HttpStatus.BAD_REQUEST,"올바르지 않는 활성 형식입니다."),
    INVALID_APPLY_DATE(HttpStatus.BAD_REQUEST, "신청 시작일이 신청 마지막날 보다 이후일 수 없습니다."),
    INVALID_HACKATHON_DATE(HttpStatus.BAD_REQUEST, "대회 시작일이 대회 마지막날 보다 이후일 수 없습니다."),
    UNSUPPORTED_FILE_TYPE(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "파일 유형이 png, jpg, jpeg 가 아닙니다.");

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
