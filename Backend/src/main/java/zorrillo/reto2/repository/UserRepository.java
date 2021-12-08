package zorrillo.reto2.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import zorrillo.reto2.model.User;
import zorrillo.reto2.repository.crud.UserCrudRepository;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author LUIS GERMAN ORTEGA M.
 */
@Repository
public class UserRepository {
    @Autowired
    private UserCrudRepository userCrudRepository;

    public Optional<User> getUser(int id){
        return userCrudRepository.findById(id);
    }

    public User create(User user){
        return userCrudRepository.save(user);
    }

    public void update (User user){
        userCrudRepository.save(user);
    }
    public List<User> getAll(){
        return userCrudRepository.findAll();
    }

    public boolean existeEmail(String email){
        Optional<User> usuario=userCrudRepository.findByEmail(email);
        return !usuario.isEmpty();
    }

    public  Optional<User> autenticateUser(String email, String password){
        return userCrudRepository.findByEmailAndPassword(email, password);
    }

    public void delete(User user){
        userCrudRepository.delete(user);
    }
}
