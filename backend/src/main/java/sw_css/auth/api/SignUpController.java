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
import sw_css.auth.application.AuthSignUpService;
import sw_css.auth.application.dto.request.SignUpRequest;

@Validated
@RequestMapping("/sign-up")
@RestController
@RequiredArgsConstructor
public class SignUpController {

    private final AuthSignUpService authSignUpService;

    // TODO 회원가입
    @PostMapping
    public ResponseEntity<Void> signUp(@RequestBody @Valid SignUpRequest request) {
        long memberId = authSignUpService.signUp(request);
        return ResponseEntity.created(URI.create("/members/" + memberId)).build();
    }

    // TODO 이메일 인증

    // TODO 존재하는 이메일

    // TODO 존재하는 학번
}
