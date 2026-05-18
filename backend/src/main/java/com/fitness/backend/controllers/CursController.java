package com.fitness.backend.controllers;

import com.fitness.backend.models.Curs;
import com.fitness.backend.services.CursService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursuri")
@CrossOrigin(origins = "*")
public class CursController {

    private final CursService cursService;

    public CursController(CursService cursService) {
        this.cursService = cursService;
    }

    @GetMapping
    public List<Curs> getAll() {
        return cursService.getAll();
    }

    @PostMapping
    public Curs add(@RequestBody Curs curs) {
        return cursService.add(curs);
    }

    @PutMapping("/{id}")
    public Curs update(@PathVariable int id, @RequestBody Curs curs) {
        return cursService.update(id, curs);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        cursService.delete(id);
    }

    @GetMapping("/{id}/auslastung")
    public double getAuslastung(@PathVariable int id) {
        return cursService.getAuslastung(id);
    }
}