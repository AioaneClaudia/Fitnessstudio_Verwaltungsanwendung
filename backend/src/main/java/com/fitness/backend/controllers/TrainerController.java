package com.fitness.backend.controllers;

import com.fitness.backend.models.Trainer;
import com.fitness.backend.services.TrainerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/traineri")
@CrossOrigin(origins = "*")
public class TrainerController {

    private final TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    @GetMapping
    public List<Trainer> getAll() {
        return trainerService.getAll();
    }

    @PostMapping
    public Trainer add(@RequestBody Trainer trainer) {
        return trainerService.add(trainer);
    }

    @PutMapping("/{id}")
    public Trainer update(@PathVariable int id, @RequestBody Trainer trainer) {
        return trainerService.update(id, trainer);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        trainerService.delete(id);
    }
}