package sw_css.utils.JwtToken.exception;

import sw_css.base.BaseException;
import sw_css.base.BaseExceptionType;

public class JwtTokenException extends BaseException {
    private final JwtTokenExceptionType exceptionType;

    public JwtTokenException(final JwtTokenExceptionType exceptionType) {
        super(exceptionType.errorMessage());
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
