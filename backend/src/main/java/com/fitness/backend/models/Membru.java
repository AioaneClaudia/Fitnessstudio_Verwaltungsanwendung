package com.fitness.backend.models;

public class Membru {
    private int id;
    private String nume;
    private String email;
    private String telefon;
    private String dataInscriere;
    private boolean activ;

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
}