package sw_css.hackathon.exception;


import sw_css.base.BaseException;
import sw_css.base.BaseExceptionType;

public class HackathonException extends BaseException {
    private final HackathonExceptionType exceptionType;

    public HackathonException(final HackathonExceptionType exceptionType) {
        super((exceptionType.errorMessage()));
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType exceptionType() { return exceptionType; }
}
