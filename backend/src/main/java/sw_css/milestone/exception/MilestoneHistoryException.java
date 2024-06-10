package sw_css.milestone.exception;

import sw_css.base.BaseException;
import sw_css.base.BaseExceptionType;

public class MilestoneHistoryException extends BaseException {
    private final MilestoneHistoryExceptionType exceptionType;

    public MilestoneHistoryException(final MilestoneHistoryExceptionType exceptionType) {
        super(exceptionType.errorMessage());
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
