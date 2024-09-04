package sw_css.config;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import sw_css.utils.JwtToken.AdminArgumentResolver;
import sw_css.utils.JwtToken.JwtAuthorizationArgumentResolver;
import sw_css.utils.JwtToken.SuperAdminArgumentResolver;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final JwtAuthorizationArgumentResolver jwtAuthorizationArgumentResolver;
    private final AdminArgumentResolver adminArgumentResolver;
    private final SuperAdminArgumentResolver superAdminArgumentResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(jwtAuthorizationArgumentResolver);
        resolvers.add(adminArgumentResolver);
        resolvers.add(superAdminArgumentResolver);
    }
}
