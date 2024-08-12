package sw_css.milestone.exception;

import org.springframework.http.HttpStatus;
import sw_css.base.BaseExceptionType;

public enum MilestoneHistoryExceptionType implements BaseExceptionType {
    NOT_FOUND_MILESTONE_HISTORY(HttpStatus.NOT_FOUND, "해당하는 마일스톤 실적이 존재하지 않습니다."),
    ALREADY_PROCESSED(HttpStatus.BAD_REQUEST, "해당 마일스톤 실적은 이미 처리된 상태입니다."),
    NOT_PROCESSED(HttpStatus.BAD_REQUEST, "해당 마일스톤 실적은 처리되지 않은 상태입니다."),
    NO_MATCH_EXTENSION(HttpStatus.BAD_REQUEST, "파일 확장자가 올바르지 않습니다."),
    CANNOT_OPEN_FILE(HttpStatus.BAD_REQUEST, "파일을 열 수 없습니다."),
    INVALID_DATE_FORMAT(HttpStatus.BAD_REQUEST, "날짜 형식이 올바르지 않습니다."),
    INVALID_SEARCH_FIELD_ID(HttpStatus.BAD_REQUEST, "검색 유형이 올바르지 않습니다."),
    UNSUPPORTED_FILE_TYPE(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "파일 유형이 png, jpg, jpeg, pdf가 아닙니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    MilestoneHistoryExceptionType(final HttpStatus httpStatus, final String errorMessage) {
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
