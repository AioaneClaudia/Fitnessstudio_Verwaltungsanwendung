package com.fitness.backend.services;

import com.fitness.backend.models.Curs;
import com.fitness.backend.models.Membru;
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

    public boolean proceseazaInscriere(int cursId, int membruId, boolean peListaAsteptare) {
        List<Curs> cursuri = getAll();
        Curs cursCautat = null;

        // 1. Căutăm cursul dorit
        for (Curs c : cursuri) {
            if (c.getId() == cursId) {
                cursCautat = c;
                break;
            }
        }

        if (cursCautat == null) return false; // Cursul nu există

        // Inițializăm listele în caz că sunt null din JSON
        if (cursCautat.getMembriInscrisiIds() == null) cursCautat.setMembriInscrisiIds(new java.util.ArrayList<>());
        if (cursCautat.getListaAsteptareIds() == null) cursCautat.setListaAsteptareIds(new java.util.ArrayList<>());

        // 2. Verificăm dacă membrul este deja înscris la acest curs (fie activ, fie pe lista de așteptare)
        if (cursCautat.getMembriInscrisiIds().contains(membruId) || cursCautat.getListaAsteptareIds().contains(membruId)) {
            return false; // Este deja înscris/înregistrat la curs
        }

        // 3. Procesăm înscrierea în funcție de locuri și de dorința utilizatorului
        if (peListaAsteptare) {
            cursCautat.getListaAsteptareIds().add(membruId);
        } else {
            // Verificare de siguranță: dacă între timp s-a ocupat cursul, îl refuzăm sau îl punem pe lista de așteptare
            if (cursCautat.getInscrisi() >= cursCautat.getCapacitateMaxima()) {
                return false; // Cursul s-a umplut!
            }

            cursCautat.getMembriInscrisiIds().add(membruId);
            // Actualizăm numărul total de înscriși pentru a fi randat corect pe frontend
            cursCautat.setInscrisi(cursCautat.getMembriInscrisiIds().size());
        }

        // 4. Actualizăm și profilul Membrului (în membri.json) pentru a avea istoricul cursurilor lui
        List<Membru> membri = JsonStorage.read("membri", Membru.class);
        for (Membru m : membri) {
            if (m.getId() == membruId) {
                if (m.getCursuriInscriseIds() == null) m.setCursuriInscriseIds(new java.util.ArrayList<>());
                m.getCursuriInscriseIds().add(cursId);
                break;
            }
        }

        // 5. Salvăm ambele fișiere JSON înapoi pe hard disk
        JsonStorage.write(FILE, cursuri);
        JsonStorage.write("membri", membri);

        return true;
    }
}