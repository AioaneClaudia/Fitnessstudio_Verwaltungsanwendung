package com.fitness.backend.controllers;

import com.fitness.backend.models.Membru;
import com.fitness.backend.services.MembruService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/membri")
@CrossOrigin(origins = "*")
public class MembruController {

    private final MembruService membruService;

    public MembruController(MembruService membruService) {
        this.membruService = membruService;
    }

    @GetMapping
    public List<Membru> getAll() {
        return membruService.getAll();
    }

    @PostMapping
    public Membru add(@RequestBody Membru membru) {
        return membruService.add(membru);
    }

    @PutMapping("/{id}")
    public Membru update(@PathVariable int id, @RequestBody Membru membru) {
        return membruService.update(id, membru);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        membruService.delete(id);
    }
}