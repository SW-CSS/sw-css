package sw_css.auth.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.auth.application.AuthSignInService;
import sw_css.auth.application.dto.request.SignInRequest;
import sw_css.auth.application.dto.response.SignInResponse;

@Validated
@RequestMapping("/sign-in")
@RestController
@RequiredArgsConstructor
public class SignInController {

    private final AuthSignInService authSignInService;

    // TODO 로그인
    @PostMapping
    public ResponseEntity<SignInResponse> signIn(
            @RequestBody @Valid SignInRequest request,
            HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        return ResponseEntity.ok(
                authSignInService.signIn(request.email(), request.password(), httpServletRequest, httpServletResponse)
        );
    }

    // TODO 비밀번호 수정 api
}
