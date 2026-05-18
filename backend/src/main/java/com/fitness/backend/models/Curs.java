package com.fitness.backend.models;

public class Curs {
    private int id;
    private String nume;
    private int trainerId;
    private String zi;
    private String ora;
    private int capacitateMaxima;
    private int inscrisi;

    public Curs() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNume() { return nume; }
    public void setNume(String nume) { this.nume = nume; }

    public int getTrainerId() { return trainerId; }
    public void setTrainerId(int trainerId) { this.trainerId = trainerId; }

    public String getZi() { return zi; }
    public void setZi(String zi) { this.zi = zi; }

    public String getOra() { return ora; }
    public void setOra(String ora) { this.ora = ora; }

    public int getCapacitateMaxima() { return capacitateMaxima; }
    public void setCapacitateMaxima(int capacitateMaxima) { this.capacitateMaxima = capacitateMaxima; }

    public int getInscrisi() { return inscrisi; }
    public void setInscrisi(int inscrisi) { this.inscrisi = inscrisi; }
}