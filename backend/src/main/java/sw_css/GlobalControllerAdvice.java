package sw_css;

import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import sw_css.base.BaseException;
import sw_css.base.BaseExceptionType;

@Slf4j
@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ExceptionResponse> handleException(final BaseException e) {

        final BaseExceptionType type = e.exceptionType();

        if (type.httpStatus().is5xxServerError()) {
            log.error("[ERROR] MESSAGE : {}, 에러가 발생한 상황에 대한 설명과 함께 소프트웨어 융합교육원에 연락주세요 : ", type.errorMessage(),
                    e);
            return new ResponseEntity<>(ExceptionResponse.from(e), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        log.warn("[WARN] MESSAGE: {}", type.errorMessage());
        log.debug("stackTrace : ", e);
        return new ResponseEntity<>(ExceptionResponse.from(e), type.httpStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleValidationException(
            final MethodArgumentNotValidException e) {
        final String message = e.getBindingResult().getAllErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining("\n"));
        log.warn("[WARN] MESSAGE: {}", message);
        return new ResponseEntity<>(new ExceptionResponse(message), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionResponse> handleHttpMessageNotReadableException(
            final HttpMessageNotReadableException e) {
        final String message = "입력 형식이 올바르지 않습니다.";
        log.warn("[WARN] MESSAGE: " + message);
        return new ResponseEntity<>(new ExceptionResponse(message), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ExceptionResponse> handleMissingServletRequestParameterException(
            final MissingServletRequestParameterException e) {
        final String message = "요청 파라미터가 올바르지 않습니다.";
        log.warn("[WARN] MESSAGE: " + message);
        return new ResponseEntity<>(new ExceptionResponse(message), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<ExceptionResponse> handleBindExceptionHandler(final BindException e) {
        final String message = "요청 파라미터가 올바르지 않습니다.";
        log.warn("[WARN] MESSAGE: " + message);
        return new ResponseEntity<>(new ExceptionResponse(message), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(final Exception exception) {
        log.error("[ERROR] 에러가 발생한 상황에 대한 설명과 함께 소프트웨어 융합교육원에 연락주세요 : ", exception);
        return new ResponseEntity<>(
                ExceptionResponse.from(exception),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    static class ExceptionResponse {

        private final String message;

        private ExceptionResponse(final String message) {
            this.message = message;
        }

        private static ExceptionResponse from(final BaseException e) {
            final BaseExceptionType type = e.exceptionType();
            return new ExceptionResponse(type.errorMessage());
        }

        private static ExceptionResponse from(final Exception exception) {
            return new ExceptionResponse(exception.getMessage());
        }

        public String getMessage() {
            return message;
        }
    }
}

