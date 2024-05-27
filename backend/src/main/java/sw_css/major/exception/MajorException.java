package sw_css.major.exception;

import sw_css.base.BaseException;
import sw_css.base.BaseExceptionType;

public class MajorException extends BaseException {
    private final MajorExceptionType exceptionType;

    public MajorException(final MajorExceptionType exceptionType) {
        super(exceptionType.errorMessage());
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
