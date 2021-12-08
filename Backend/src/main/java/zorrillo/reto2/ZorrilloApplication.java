package zorrillo.reto2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import zorrillo.reto2.repository.crud.UserCrudRepository;



@SpringBootApplication
public class ZorrilloApplication implements CommandLineRunner {
	@Autowired
	private UserCrudRepository userCrudRepository;
	

	public static void main(String[] args) {
		SpringApplication.run(ZorrilloApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		userCrudRepository.deleteAll();  //Borra la base de datos al inicio de la aplicacion
		//fraganceCrudRepositorio.deleteAll();
	}
}
