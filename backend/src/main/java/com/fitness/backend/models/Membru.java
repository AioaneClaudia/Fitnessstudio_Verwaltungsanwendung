package com.fitness.backend.models;

import java.util.ArrayList;
import java.util.List;

public class Membru {
    private int id;
    private String nume;
    private String email;
    private String telefon;
    private String dataInscriere;
    private boolean activ;

    private List<Integer> cursuriInscriseIds = new ArrayList<>();

    public Membru() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNume() { return nume; }
    public void setNume(String nume) { this.nume = nume; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefon() { return telefon; }
    public void setTelefon(String telefon) { this.telefon = telefon; }

    public String getDataInscriere() { return dataInscriere; }
    public void setDataInscriere(String dataInscriere) { this.dataInscriere = dataInscriere; }

    public boolean isActiv() { return activ; }
    public void setActiv(boolean activ) { this.activ = activ; }

    public List<Integer> getCursuriInscriseIds() {
        if (this.cursuriInscriseIds == null) this.cursuriInscriseIds = new ArrayList<>();
        return cursuriInscriseIds;
    }
    public void setCursuriInscriseIds(List<Integer> cursuriInscriseIds) { this.cursuriInscriseIds = cursuriInscriseIds; }
}