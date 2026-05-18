package com.fitness.backend.services;

import com.fitness.backend.models.Trainer;
import com.fitness.backend.storage.JsonStorage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    private static final String FILE = "traineri";

    public List<Trainer> getAll() {
        return JsonStorage.read(FILE, Trainer.class);
    }

    public Trainer add(Trainer trainer) {
        List<Trainer> traineri = getAll();
        trainer.setId(JsonStorage.nextId(traineri));
        traineri.add(trainer);
        JsonStorage.write(FILE, traineri);
        return trainer;
    }

    public Trainer update(int id, Trainer updated) {
        List<Trainer> traineri = getAll();
        for (Trainer t : traineri) {
            if (t.getId() == id) {
                t.setNume(updated.getNume());
                t.setSpecializare(updated.getSpecializare());
                t.setEmail(updated.getEmail());
                t.setTelefon(updated.getTelefon());
            }
        }
        JsonStorage.write(FILE, traineri);
        return updated;
    }

    public void delete(int id) {
        List<Trainer> traineri = getAll();
        traineri.removeIf(t -> t.getId() == id);
        JsonStorage.write(FILE, traineri);
    }
}