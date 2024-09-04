package sw_css.admin.auth.exception;


import sw_css.base.BaseException;
import sw_css.base.BaseExceptionType;

public class AdminAuthException extends BaseException {
    private final AdminAuthExceptionType adminAuthExceptionType;

    public AdminAuthException(final AdminAuthExceptionType exceptionType) {
        super(exceptionType.errorMessage());
        this.adminAuthExceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType exceptionType() {
        return adminAuthExceptionType;
    }
}
