package sw_css.auth.application;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sw_css.auth.domain.EmailAuthRedis;
import sw_css.auth.domain.repository.EmailAuthRedisRepository;
import sw_css.utils.MailUtil;

@Service
@RequiredArgsConstructor
public class AuthCodeEmailService {
    public static final int EMAIL_EXPIRED_SECONDS = 600; // 10분
    public static final int AUTH_CODE_LENGTH = 10;

    private static final Random RANDOM = new Random();

    private final MailUtil mailUtil;
    private final EmailAuthRedisRepository emailAuthRedisRepository;

    public int emailAuth(String email) {
        String authCode = generateRandomAuthCode();
        emailAuthRedisRepository.save(EmailAuthRedis.of(email, authCode));
        sendAuthCode(email, authCode);
        return EMAIL_EXPIRED_SECONDS;
    }

    private static String generateRandomAuthCode() {
        char leftLimit = '0';
        char rightLimit = 'z';

        return RANDOM.ints(leftLimit, rightLimit + 1)
                .filter(i -> Character.isAlphabetic(i) || Character.isDigit(i))
                .limit(AuthCodeEmailService.AUTH_CODE_LENGTH)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    private void sendAuthCode(String email, String authCode) {
        List<String> toUserList = new ArrayList<>(List.of(email));
        String subject = "[부산대학교] SW역량강화플랫폼 인증코드 발송 메일입니다.";
        String text = "SW역량강화플랫폼 인증코드는 " + authCode + " 입니다.";
        mailUtil.sendMail(toUserList, subject, text);
    }
}
