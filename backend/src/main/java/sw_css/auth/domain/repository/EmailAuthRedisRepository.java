package sw_css.auth.domain.repository;

import org.springframework.data.repository.CrudRepository;
import sw_css.auth.domain.EmailAuthRedis;

public interface EmailAuthRedisRepository extends CrudRepository<EmailAuthRedis, String> {

}
