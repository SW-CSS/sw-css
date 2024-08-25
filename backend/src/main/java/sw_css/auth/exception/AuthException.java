package sw_css.auth.exception;

import sw_css.base.BaseException;
import sw_css.base.BaseExceptionType;

public class AuthException extends BaseException {
    private final AuthExceptionType authExceptionType;

    public AuthException(final AuthExceptionType exceptionType) {
        super(exceptionType.errorMessage());
        this.authExceptionType = exceptionType;

    }

    @Override
    public BaseExceptionType exceptionType() {
        return authExceptionType;
    }
}
