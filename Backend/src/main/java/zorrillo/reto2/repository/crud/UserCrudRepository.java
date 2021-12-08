package zorrillo.reto2.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;
import zorrillo.reto2.model.User;

import java.util.Optional;

/**
 *
 * @author LUIS GERMAN ORTEGA M.
 */
public interface UserCrudRepository extends MongoRepository<User, Integer> {
    Optional <User> findByEmail(String email);
    Optional <User> findByEmailAndPassword(String email, String password);
}
