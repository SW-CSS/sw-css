package sw_css.admin.hackathon.exception;

import sw_css.base.BaseException;
import sw_css.base.BaseExceptionType;

public class AdminHackathonException extends BaseException {
    private final AdminHackathonExceptionType exceptionType;

    public AdminHackathonException(final AdminHackathonExceptionType exceptionType) {
        super((exceptionType.errorMessage()));
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType exceptionType() { return exceptionType; }
}
