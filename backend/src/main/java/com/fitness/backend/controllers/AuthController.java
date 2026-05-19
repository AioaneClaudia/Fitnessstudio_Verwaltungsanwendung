package com.fitness.backend.controllers;

import com.fitness.backend.models.User;
import com.fitness.backend.storage.JsonStorage;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String parola = credentials.get("parola");

        List<User> users = JsonStorage.read("users", User.class);

        for (User u : users) {
            if (u.getEmail().equals(email) && u.getParola().equals(parola)) {
                return Map.of(
                    "status", "ok",
                    "nume", u.getNume(),
                    "rol", u.getRol()
                );
            }
        }

        return Map.of("status", "error", "mesaj", "Email sau parolă greșită!");
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User userNou) {
    List<User> users = JsonStorage.read("users", User.class);

    // Verifică dacă emailul există deja
    for (User u : users) {
        if (u.getEmail().equals(userNou.getEmail())) {
            return Map.of("status", "error", "mesaj", "Email deja înregistrat!");
        }
    }

    userNou.setId(JsonStorage.nextId(users));
    userNou.setRol("membru");
    users.add(userNou);
    JsonStorage.write("users", users);

    return Map.of("status", "ok");
    }
}