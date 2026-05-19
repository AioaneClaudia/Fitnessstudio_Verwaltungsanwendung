package com.fitness.backend.models;

import java.util.ArrayList;
import java.util.List;

public class Curs {
    private int id;
    private String nume;
    private int trainerId;
    private String zi;
    private String ora;
    private int capacitateMaxima;
    private int inscrisi;

    private List<Integer> membriInscrisiIds = new ArrayList<>();
    private List<Integer> listaAsteptareIds = new ArrayList<>();

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

    public List<Integer> getMembriInscrisiIds() {
        if (this.membriInscrisiIds == null) this.membriInscrisiIds = new ArrayList<>();
        return membriInscrisiIds;
    }
    public void setMembriInscrisiIds(List<Integer> membriInscrisiIds) { this.membriInscrisiIds = membriInscrisiIds; }

    public List<Integer> getListaAsteptareIds() {
        if (this.listaAsteptareIds == null) this.listaAsteptareIds = new ArrayList<>();
        return listaAsteptareIds;
    }
    public void setListaAsteptareIds(List<Integer> listaAsteptareIds) { this.listaAsteptareIds = listaAsteptareIds; }
}