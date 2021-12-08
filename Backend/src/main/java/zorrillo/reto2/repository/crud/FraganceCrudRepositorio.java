package zorrillo.reto2.repository.crud;

import zorrillo.reto2.model.Fragance;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface FraganceCrudRepositorio extends MongoRepository<Fragance,String>{
    
}
