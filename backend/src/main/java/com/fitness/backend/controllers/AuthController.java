package com.fitness.backend.controllers;

import com.fitness.backend.models.User;
import com.fitness.backend.models.Membru;
import com.fitness.backend.models.Trainer;
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
                // Returnăm toate datele importante, inclusiv ID-ul ca String
               return Map.of(
                "status", "ok",
                "nume", u.getNume(),
                "rol", u.getRol(),
                "id", String.valueOf(u.getId())
                );
            }
        }

        return Map.of("status", "error", "mesaj", "Email sau parolă greșită!");
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User userNou) {
        List<User> users = JsonStorage.read("users", User.class);

        // 1. Verifică dacă emailul există deja
        for (User u : users) {
            if (u.getEmail().equalsIgnoreCase(userNou.getEmail())) {
                return Map.of("status", "error", "mesaj", "Email deja înregistrat!");
            }
        }

        // 2. Generăm și setăm ID-ul unic pentru noul utilizator
        int noulId = JsonStorage.nextId(users);
        userNou.setId(noulId);

        // 3. Salvăm utilizatorul în users.json (își va păstra rolul selectat în dropdown)
        users.add(userNou);
        JsonStorage.write("users", users);

        // 4. Ramificația logică: creăm entitatea corespunzătoare în funcție de rol
        if ("trainer".equalsIgnoreCase(userNou.getRol())) {
            // Dacă s-a înregistrat ca trainer, adăugăm o înregistrare în traineri.json
            List<Trainer> traineri = JsonStorage.read("traineri", Trainer.class);

            Trainer trainerNou = new Trainer();
            trainerNou.setId(noulId);
            trainerNou.setNume(userNou.getNume());

            traineri.add(trainerNou);
            JsonStorage.write("traineri", traineri);

        } else {
            // Implicit (sau dacă s-a ales "membru"), adăugăm o înregistrare în membri.json
            List<Membru> membri = JsonStorage.read("membri", Membru.class);

            Membru membruNou = new Membru();
            membruNou.setId(noulId);
            membruNou.setNume(userNou.getNume());
            membruNou.setEmail(userNou.getEmail());
            membruNou.setActiv(true); // Îl setăm ca membru activ implicit
            membruNou.setCursuriInscriseIds(new java.util.ArrayList<>()); // Listă inițială goală de cursuri

            membri.add(membruNou);
            JsonStorage.write("membri", membri);
        }

        return Map.of("status", "ok");
    }
}