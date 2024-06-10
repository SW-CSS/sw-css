package sw_css.member.exception;

import sw_css.base.BaseException;
import sw_css.base.BaseExceptionType;

public class MemberException extends BaseException {
    private final MemberExceptionType exceptionType;

    public MemberException(final MemberExceptionType exceptionType) {
        super(exceptionType.errorMessage());
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
