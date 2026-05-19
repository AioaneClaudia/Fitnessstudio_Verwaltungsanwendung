package com.fitness.backend.controllers;

import com.fitness.backend.models.Membru;
import com.fitness.backend.services.MembruService;
import com.fitness.backend.storage.JsonStorage;
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

    @PostMapping("/{id}/pontaj")
    public Membru pontaj(@PathVariable int id) {
        List<Membru> membri = JsonStorage.read("membri", Membru.class);
        for (Membru m : membri) {
            if (m.getId() == id) {
                m.setEstePontat(!m.isEstePontat());
                m.setUltimaOraPontare(java.time.LocalTime.now().format(java.time.format.DateTimeFormatter.ofPattern("HH:mm")));
                JsonStorage.write("membri", membri);
                return m;
            }
        }
        return null;
    }
}