package com.fitness.backend.models;

public class User {
    private int id;
    private String nume;
    private String email;
    private String parola;
    private String rol;
    private String dataInregistrare;
    private String telefon;
    private String adresa;

    public User() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNume() { return nume; }
    public void setNume(String nume) { this.nume = nume; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getParola() { return parola; }
    public void setParola(String parola) { this.parola = parola; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getDataInregistrare() { return dataInregistrare; }
    public void setDataInregistrare(String dataInregistrare) { this.dataInregistrare = dataInregistrare; }

    public String getTelefon() { return telefon; }
    public void setTelefon(String telefon) { this.telefon = telefon; }

    public String getAdresa() { return adresa; }
    public void setAdresa(String adresa) { this.adresa = adresa; }
}