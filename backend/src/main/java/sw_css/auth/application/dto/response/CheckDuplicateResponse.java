package sw_css.auth.application.dto.response;


public record CheckDuplicateResponse(boolean is_duplicate) {

    public static CheckDuplicateResponse from(boolean is_duplicate) {
        return new CheckDuplicateResponse(is_duplicate);
    }
}
