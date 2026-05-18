package com.fitness.backend.services;

import com.fitness.backend.models.Curs;
import com.fitness.backend.storage.JsonStorage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CursService {

    private static final String FILE = "cursuri";

    public List<Curs> getAll() {
        return JsonStorage.read(FILE, Curs.class);
    }

    public Curs add(Curs curs) {
        List<Curs> cursuri = getAll();
        curs.setId(JsonStorage.nextId(cursuri));
        cursuri.add(curs);
        JsonStorage.write(FILE, cursuri);
        return curs;
    }

    public Curs update(int id, Curs updated) {
        List<Curs> cursuri = getAll();
        for (Curs c : cursuri) {
            if (c.getId() == id) {
                c.setNume(updated.getNume());
                c.setTrainerId(updated.getTrainerId());
                c.setZi(updated.getZi());
                c.setOra(updated.getOra());
                c.setCapacitateMaxima(updated.getCapacitateMaxima());
                c.setInscrisi(updated.getInscrisi());
            }
        }
        JsonStorage.write(FILE, cursuri);
        return updated;
    }

    public void delete(int id) {
        List<Curs> cursuri = getAll();
        cursuri.removeIf(c -> c.getId() == id);
        JsonStorage.write(FILE, cursuri);
    }

    public double getAuslastung(int id) {
        List<Curs> cursuri = getAll();
        for (Curs c : cursuri) {
            if (c.getId() == id) {
                return (double) c.getInscrisi() / c.getCapacitateMaxima() * 100;
            }
        }
        return 0;
    }
}