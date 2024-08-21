package sw_css.config;

import java.util.List;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import sw_css.utils.JwtToken.JwtAuthorizationArgumentResolver;

public class WebConfig implements WebMvcConfigurer {

    private JwtAuthorizationArgumentResolver jwtAuthorizationArgumentResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(jwtAuthorizationArgumentResolver);
    }
}
