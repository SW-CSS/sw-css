package sw_css.auth.application.dto.response;


public record SendAuthCodeResponse(int expiredSeconds) {

    public static SendAuthCodeResponse from(int expiredSeconds) {
        return new SendAuthCodeResponse(expiredSeconds);
    }
}
