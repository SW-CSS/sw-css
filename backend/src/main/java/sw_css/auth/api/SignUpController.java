package sw_css.auth.api;


import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.auth.application.AuthCodeEmailService;
import sw_css.auth.application.AuthSignUpService;
import sw_css.auth.application.dto.request.SendAuthCodeRequest;
import sw_css.auth.application.dto.request.SignUpRequest;
import sw_css.auth.application.dto.response.SendAuthCodeResponse;

@Validated
@RequestMapping("/sign-up")
@RestController
@RequiredArgsConstructor
public class SignUpController {

    private final AuthSignUpService authSignUpService;
    private final AuthCodeEmailService authCodeEmailService;

    // TODO 회원가입
    @PostMapping
    public ResponseEntity<Void> signUp(@RequestBody @Valid SignUpRequest request) {
        long memberId = authSignUpService.signUp(request);
        return ResponseEntity.created(URI.create("/members/" + memberId)).build();
    }

    // TODO 이메일 인증 코드 요청
    @PostMapping("/send-auth-code")
    public ResponseEntity<SendAuthCodeResponse> sendAuthCode(@RequestBody @Valid SendAuthCodeRequest request) {
        int expiredSeconds = authCodeEmailService.emailAuth(request.email());
        return ResponseEntity.ok(SendAuthCodeResponse.from(expiredSeconds));
    }

    // TODO 존재하는 이메일

    // TODO 존재하는 학번

    // TODO 존재하는 전화번호
}
