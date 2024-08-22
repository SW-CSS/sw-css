package sw_css.auth.api;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sw_css.auth.application.AuthEmailService;
import sw_css.auth.application.AuthSignUpService;
import sw_css.auth.application.dto.request.SendAuthCodeRequest;
import sw_css.auth.application.dto.request.SignUpRequest;
import sw_css.auth.application.dto.response.CheckDuplicateResponse;
import sw_css.auth.application.dto.response.SendAuthCodeResponse;

@Validated
@RequestMapping("/sign-up")
@RestController
@RequiredArgsConstructor
public class SignUpController {

    private final AuthSignUpService authSignUpService;
    private final AuthEmailService authEmailService;

    @PostMapping
    public ResponseEntity<Void> signUp(@RequestBody @Valid SignUpRequest request) {
        long memberId = authSignUpService.signUp(request);
        return ResponseEntity.created(URI.create("/members/" + memberId)).build();
    }

    @PostMapping("/send-auth-code")
    public ResponseEntity<SendAuthCodeResponse> sendAuthCode(@RequestBody @Valid SendAuthCodeRequest request) {
        return ResponseEntity.ok(authEmailService.emailAuth(request.email()));
    }

    @GetMapping("/exists/email")
    public ResponseEntity<CheckDuplicateResponse> checkDuplicateEmail(
            @RequestParam(value = "email") @NotBlank final String email) {
        return ResponseEntity.ok(authSignUpService.isDuplicateEmail(email));
    }

    @GetMapping("/exists/student-id")
    public ResponseEntity<CheckDuplicateResponse> checkDuplicateStudentId(
            @RequestParam(value = "student_id") @NotBlank final String studentId) {
        return ResponseEntity.ok(authSignUpService.isDuplicateStudentId(studentId));
    }

    @GetMapping("/exists/phone-number")
    public ResponseEntity<CheckDuplicateResponse> checkDuplicatePhoneNumber(
            @RequestParam(value = "phone_number") @NotBlank final String phoneNumber) {
        return ResponseEntity.ok(authSignUpService.isDuplicatePhoneNumber(phoneNumber));
    }
}
