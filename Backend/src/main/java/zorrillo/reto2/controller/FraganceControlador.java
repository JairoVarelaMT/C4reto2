package zorrillo.reto2.controller;

import java.util.List;
import java.util.Optional;

import zorrillo.reto2.model.Fragance;
import zorrillo.reto2.service.FraganceServicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fragance")
@CrossOrigin("*")
public class FraganceControlador {
    @Autowired
    private FraganceServicio fraganceServicio;

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Fragance save(@RequestBody Fragance fragance){
        return fraganceServicio.save(fragance);
    }
    
    @GetMapping("/all")
    public List<Fragance>getFragance(){
        return fraganceServicio.getAll();
    }

    @GetMapping("{reference}")
    public Optional<Fragance>getFragance(@PathVariable("reference") String reference){
        return fraganceServicio.getFragance(reference);
    }

    @DeleteMapping("{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteFragance(@PathVariable("reference") String reference){
        return fraganceServicio.deleteFragance(reference);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Fragance update(@RequestBody Fragance fragance){
        return fraganceServicio.update(fragance);
    }
}
