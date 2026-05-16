# 🏋️ Fitnessstudio-Verwaltung

Eine Webanwendung zur Verwaltung eines Fitnessstudios – entwickelt im Rahmen eines Hochschulprojekts.

---

## 📋 Projektübersicht

Diese Anwendung ermöglicht die digitale Verwaltung aller wesentlichen Abläufe eines Fitnessstudios: von der Mitglieder- und Trainerverwaltung über den Kursplan bis hin zur Echtzeit-Auslastungsanzeige.

**Zielgruppen:**
- **Admins** – vollständige Verwaltung aller Bereiche
- **Trainer** – Einsicht in eigene Kurse und Studioauslastung
- **Mitglieder** – Self-Service-Portal, Kursanmeldung, Profilpflege

---

## 🧩 Module

| Modul | Beschreibung |
|---|---|
| Authentifizierung | Registrierung, Login, rollenbasierte Zugriffskontrolle (RBAC) |
| Mitgliederverwaltung | Profile anlegen, bearbeiten, Mitgliedschaft pausieren / kündigen, DSGVO-Export |
| Trainerverwaltung | Trainerprofile, Qualifikationen, Wochenplan, Auslastungsübersicht |
| Kursplan | Kurse erstellen, Wochenplan, Anmeldung / Abmeldung, Warteliste |
| Studioauslastung | Echtzeit-Check-in/out, Auslastungsanzeige, historische Analyse |
| Geräteverwaltung | Inventar, Wartungsplan, Defektmeldung |
| Benachrichtigungen | Automatische E-Mails für alle relevanten Ereignisse |
| Dashboard | KPI-Übersicht für Admins, Self-Service-Portal für Mitglieder |

---

## 🛠️ Technologie-Stack

> ⚠️ Dieser Abschnitt wird von den Entwicklern ausgefüllt.

| Bereich | Technologie |
|---|---|
| Frontend | – |
| Backend | – |
| Datenspeicherung | JSON-Dateien |
| Versionskontrolle | Git / GitHub |
| Deployment | – |

---

## 📁 Projektstruktur

> ⚠️ Dieser Abschnitt wird von den Entwicklern nach Aufsetzen des Projekts ergänzt.

```
/
├── frontend/         # UI-Komponenten und Seiten
├── backend/          # Server, API-Endpunkte, Geschäftslogik
├── data/             # JSON-Datendateien
│   ├── mitglieder.json
│   ├── trainer.json
│   ├── kurse.json
│   ├── kursanmeldungen.json
│   ├── geraete.json
│   ├── audit-log.json
│   └── auslastung-YYYY-MM.json
└── README.md
```

---

## 🚀 Installation und Setup

> ⚠️ Dieser Abschnitt wird von den Entwicklern ausgefüllt, sobald das Projekt aufgesetzt ist.

```bash
# Repository klonen
git clone https://github.com/DEIN-USERNAME/DEIN-REPO.git
cd DEIN-REPO

# Abhängigkeiten installieren
npm install

# Anwendung starten
npm start
```

---

## 🏷️ GitHub Labels

Issues werden mit folgenden Labels kategorisiert:

| Label | Bedeutung |
|---|---|
| `modul: mitglieder` | Mitgliederverwaltung |
| `modul: trainer` | Trainerverwaltung |
| `modul: kursplan` | Kursplan & Anmeldungen |
| `modul: auslastung` | Studioauslastung |
| `modul: auth` | Authentifizierung & Rollen |
| `modul: geräte` | Geräteverwaltung |
| `modul: benachrichtigungen` | E-Mail & In-App-Benachrichtigungen |
| `modul: dashboard` | Dashboard & Self-Service-Portal |
| `priorität: must-have` | Pflichtfunktionalität |
| `priorität: nice-to-have` | Wünschenswert, aber nicht zwingend |
| `typ: bug` | Gemeldeter Fehler |
| `typ: feature` | Neue Funktionalität |
| `typ: frage` | Klärungsbedarf (z. B. an den BA) |
| `status: in bearbeitung` | Wird gerade implementiert |
| `status: blockiert` | Wartet auf Klärung oder Abhängigkeit |

---

## 📋 Project Board

Das Projekt wird über ein GitHub Project Board (Kanban) verwaltet:

| Spalte | Bedeutung |
|---|---|
| **Backlog** | Alle noch nicht begonnenen Issues |
| **In Bearbeitung** | Wird aktuell implementiert |
| **Review / Test** | Implementierung fertig, wartet auf Review oder Tester |
| **Erledigt** | Abgeschlossen und geschlossen |

---

## 👥 Rollen im Team

| Rolle | Aufgabe |
|---|---|
| Business Analyst | Anforderungen definieren, Issues erstellen, Fragen der Entwickler beantworten |
| Designer | UI/UX-Entwürfe, Farbpalette, Logo, Figma-Prototypen |
| Developer | Issues implementieren, Bugs beheben, Code reviewen |
| Tester | Funktionalitäten testen, Bugs melden |

---

## 📞 Kontakt

Bei Unklarheiten zu Anforderungen oder Issues wendet euch an den **Business Analyst** des Projekts – entweder direkt über GitHub (Kommentar im Issue mit `@mention`) oder persönlich.

---

## ⚖️ DSGVO-Hinweis

Diese Anwendung verarbeitet personenbezogene Daten (Namen, E-Mail-Adressen, Geburtsdaten usw.). Alle Entwickler sind dafür verantwortlich, dass neue Funktionen datenschutzkonform implementiert werden. Bei Fragen zur DSGVO-Konformität den Business Analysten konsultieren.
