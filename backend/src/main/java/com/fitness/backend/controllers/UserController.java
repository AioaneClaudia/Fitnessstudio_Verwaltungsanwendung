package com.fitness.backend.controllers;

import com.fitness.backend.models.User;
import com.fitness.backend.storage.JsonStorage;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @GetMapping
    public List<User> getAll() {
        return JsonStorage.read("users", User.class);
    }

    @PutMapping("/{id}/rol")
    public Map<String, String> schimbaRol(@PathVariable int id, @RequestBody Map<String, String> body) {
        List<User> users = JsonStorage.read("users", User.class);
        for (User u : users) {
            if (u.getId() == id) {
                u.setRol(body.get("rol"));
            }
        }
        JsonStorage.write("users", users);
        return Map.of("status", "ok");
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable int id) {
        List<User> users = JsonStorage.read("users", User.class);
        users.removeIf(u -> u.getId() == id);
        JsonStorage.write("users", users);
        return Map.of("status", "ok");
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable int id) {
        List<User> users = JsonStorage.read("users", User.class);
        return users.stream()
                .filter(u -> u.getId() == id)
                .findFirst()
                .orElse(null);
    }

    @PutMapping("/{id}/profil")
    public Map<String, String> updateProfil(@PathVariable int id, @RequestBody User updated) {
        List<User> users = JsonStorage.read("users", User.class);
        for (User u : users) {
            if (u.getId() == id) {
                u.setNume(updated.getNume());
                u.setTelefon(updated.getTelefon());
                u.setAdresa(updated.getAdresa());
            }
        }
        JsonStorage.write("users", users);
        return Map.of("status", "ok");
    }
}