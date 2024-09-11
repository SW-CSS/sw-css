package sw_css.auth.application;

import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sw_css.auth.application.dto.response.SendAuthCodeResponse;
import sw_css.auth.domain.EmailAuthRedis;
import sw_css.auth.domain.repository.EmailAuthRedisRepository;
import sw_css.auth.exception.AuthException;
import sw_css.auth.exception.AuthExceptionType;
import sw_css.member.domain.repository.MemberRepository;
import sw_css.utils.MailUtil;

@Service
@RequiredArgsConstructor
@Transactional(rollbackOn = Exception.class)
public class AuthEmailService {
    public static final int EMAIL_EXPIRED_SECONDS = 600; // 10분
    public static final int AUTH_CODE_LENGTH = 10;

    private static final Random RANDOM = new Random();

    private final MailUtil mailUtil;
    private final EmailAuthRedisRepository emailAuthRedisRepository;
    private final AuthCheckDuplicateService authCheckDuplicateService;
    private final MemberRepository memberRepository;

    public SendAuthCodeResponse emailAuth(String email) {
        checkIsDuplicateEmail(email);

        String authCode = generateRandomAuthCode();
        emailAuthRedisRepository.save(EmailAuthRedis.of(email, authCode));
        sendAuthCode(email, authCode);
        return SendAuthCodeResponse.from(EMAIL_EXPIRED_SECONDS);
    }

    public void sendNewPassword(String email, String password) {
        List<String> toUserList = new ArrayList<>(List.of(email));
        String subject = "[부산대학교] SW역량강화플랫폼 임시 비밀번호 발송 메일입니다.";
        String text = "SW역량강화플랫폼 임시 비밀번호는 " + password + " 입니다.";
        mailUtil.sendMail(toUserList, subject, text);
    }

    private static String generateRandomAuthCode() {
        char leftLimit = '0';
        char rightLimit = 'z';

        return RANDOM.ints(leftLimit, rightLimit + 1)
                .filter(i -> Character.isAlphabetic(i) || Character.isDigit(i))
                .limit(AuthEmailService.AUTH_CODE_LENGTH)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    private void sendAuthCode(String email, String authCode) {
        List<String> toUserList = new ArrayList<>(List.of(email));
        String subject = "[부산대학교] SW역량강화플랫폼 인증코드 발송 메일입니다.";
        String text = "SW역량강화플랫폼 인증코드는 " + authCode + " 입니다.";
        mailUtil.sendMail(toUserList, subject, text);
    }

    private void checkIsDuplicateEmail(String email) {
        if (authCheckDuplicateService.isDuplicateEmail(email)) {
            throw new AuthException(AuthExceptionType.MEMBER_EMAIL_DUPLICATE);
        }
    }
}
