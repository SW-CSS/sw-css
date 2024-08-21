package sw_css.auth.application.dto.response;


public record SendAuthCodeResponse(int expired_seconds) {

    public static SendAuthCodeResponse from(int expired_seconds) {
        return new SendAuthCodeResponse(expired_seconds);
    }
}
