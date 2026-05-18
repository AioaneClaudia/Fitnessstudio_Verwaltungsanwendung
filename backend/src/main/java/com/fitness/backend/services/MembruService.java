package com.fitness.backend.services;

import com.fitness.backend.models.Membru;
import com.fitness.backend.storage.JsonStorage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MembruService {

    private static final String FILE = "membri";

    public List<Membru> getAll() {
        return JsonStorage.read(FILE, Membru.class);
    }

    public Membru add(Membru membru) {
        List<Membru> membri = getAll();
        membru.setId(JsonStorage.nextId(membri));
        membri.add(membru);
        JsonStorage.write(FILE, membri);
        return membru;
    }

    public Membru update(int id, Membru updated) {
        List<Membru> membri = getAll();
        for (Membru m : membri) {
            if (m.getId() == id) {
                m.setNume(updated.getNume());
                m.setEmail(updated.getEmail());
                m.setTelefon(updated.getTelefon());
                m.setDataInscriere(updated.getDataInscriere());
                m.setActiv(updated.isActiv());
            }
        }
        JsonStorage.write(FILE, membri);
        return updated;
    }

    public void delete(int id) {
        List<Membru> membri = getAll();
        membri.removeIf(m -> m.getId() == id);
        JsonStorage.write(FILE, membri);
    }
}