package com.fitness.backend.services;

import com.fitness.backend.models.Curs;
import com.fitness.backend.storage.JsonStorage;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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

    public Map<String, String> inscriere(int cursId, int membruId) {
        List<Curs> cursuri = getAll();

        for (Curs c : cursuri) {
            if (c.getId() == cursId) {

                // Deja inscris?
                if (c.getMembriInscrisi().contains(membruId)) {
                    return Map.of("status", "error", "mesaj", "Ești deja înscris la acest curs!");
                }

                // Deja pe waiting list?
                if (c.getWaitingList().contains(membruId)) {
                    return Map.of("status", "error", "mesaj", "Ești deja pe lista de așteptare!");
                }

                // Loc disponibil?
                if (c.getInscrisi() < c.getCapacitateMaxima()) {
                    c.getMembriInscrisi().add(membruId);
                    c.setInscrisi(c.getInscrisi() + 1);
                    JsonStorage.write(FILE, cursuri);
                    return Map.of("status", "ok", "mesaj", "Înscris cu succes!");
                } else {
                    // Waiting list
                    c.getWaitingList().add(membruId);
                    JsonStorage.write(FILE, cursuri);
                    return Map.of("status", "waiting", "mesaj", "Cursul e plin! Ai fost adăugat pe lista de așteptare.");
                }
            }
        }

        return Map.of("status", "error", "mesaj", "Cursul nu există!");
    }

    public Map<String, String> dezinscriere(int cursId, int membruId) {
        List<Curs> cursuri = getAll();

        for (Curs c : cursuri) {
            if (c.getId() == cursId) {
                if (c.getMembriInscrisi().contains(membruId)) {
                    c.getMembriInscrisi().remove(Integer.valueOf(membruId));
                    c.setInscrisi(c.getInscrisi() - 1);

                    // Primul din waiting list trece la inscris
                    if (!c.getWaitingList().isEmpty()) {
                        int urmatorul = c.getWaitingList().remove(0);
                        c.getMembriInscrisi().add(urmatorul);
                        c.setInscrisi(c.getInscrisi() + 1);
                    }

                    JsonStorage.write(FILE, cursuri);
                    return Map.of("status", "ok", "mesaj", "Dezînscris cu succes!");
                }

                if (c.getWaitingList().contains(membruId)) {
                    c.getWaitingList().remove(Integer.valueOf(membruId));
                    JsonStorage.write(FILE, cursuri);
                    return Map.of("status", "ok", "mesaj", "Scos din lista de așteptare!");
                }
            }
        }

        return Map.of("status", "error", "mesaj", "Nu ești înscris la acest curs!");
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