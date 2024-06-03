package sw_css.milestone.exception;

import sw_css.base.BaseException;
import sw_css.base.BaseExceptionType;

public class MilestoneException extends BaseException {
    private final MilestoneExceptionType exceptionType;

    public MilestoneException(final MilestoneExceptionType exceptionType) {
        super(exceptionType.errorMessage());
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
