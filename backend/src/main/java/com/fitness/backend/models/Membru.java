package com.fitness.backend.models;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)

public class Membru {
    private int id;
    private String nume;
    private String email;
    private String telefon;
    private String dataInscriere;
    private boolean activ;
    private boolean estePontat = false;
    private String ultimaOraPontare;
    private List<Integer> cursuriInscriseIds = new ArrayList<>();

    public Membru() {}

    // Getters și Setters
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
    public boolean isEstePontat() { return estePontat; }
    public void setEstePontat(boolean estePontat) { this.estePontat = estePontat; }
    public String getUltimaOraPontare() { return ultimaOraPontare; }
    public void setUltimaOraPontare(String ultimaOraPontare) { this.ultimaOraPontare = ultimaOraPontare; }
    public List<Integer> getCursuriInscriseIds() { return cursuriInscriseIds; }
    public void setCursuriInscriseIds(List<Integer> cursuriInscriseIds) { this.cursuriInscriseIds = cursuriInscriseIds; }
}