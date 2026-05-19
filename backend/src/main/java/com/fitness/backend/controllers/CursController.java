package com.fitness.backend.controllers;

import com.fitness.backend.models.Curs;
import com.fitness.backend.services.CursService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping("/{cursId}/inscrie")
    public org.springframework.http.ResponseEntity<?> inscrieMembruLaCurs(
            @PathVariable int cursId,
            @RequestBody java.util.Map<String, Object> payload) {

        // Verificăm dacă payload-ul este gol
        if (payload == null) {
            return org.springframework.http.ResponseEntity.badRequest().body("Payload-ul este gol!");
        }

        // Căutăm ID-ul membrului sub ambele forme posibile (membruId sau userId) ca să fim siguri
        Object idObj = payload.get("membruId");
        if (idObj == null) {
            idObj = payload.get("userId"); // Încercăm și denumirea alternativă din frontend
        }

        if (idObj == null) {
            return org.springframework.http.ResponseEntity.badRequest().body("Eroare: ID-ul utilizatorului lipsește din cerere!");
        }

        // Conversie sigură la int care previne NullPointerException
        int membruId;
        try {
            membruId = Integer.parseInt(idObj.toString());
        } catch (NumberFormatException e) {
            return org.springframework.http.ResponseEntity.badRequest().body("Eroare: ID-ul utilizatorului nu este un număr valid!");
        }

        // Citim și parametrul de listă de așteptare (dacă lipsește, presupunem false)
        boolean peListaAsteptare = false;
        if (payload.get("peListaAsteptare") != null) {
            peListaAsteptare = Boolean.parseBoolean(payload.get("peListaAsteptare").toString());
        }

        // Apelăm serviciul tău care este deja perfect implementat
        boolean succes = cursService.proceseazaInscriere(cursId, membruId, peListaAsteptare);

        if (succes) {
            return org.springframework.http.ResponseEntity.ok(java.util.Map.of("message", "Înscriere realizată cu succes!"));
        } else {
            return org.springframework.http.ResponseEntity.badRequest().body("Înscrierea a eșuat! Posibil să fii deja înscris sau cursul este plin.");
        }
    }
}