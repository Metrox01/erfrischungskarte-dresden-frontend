# _Dresdner Erfrischungskarte_

> Die Dresdner Erfrischungskarte ist eine interaktive Karte von Dresden, die Temperaturintensitäten, Kaltluftbereiche und erfrischende Orte (POIs) an einem typischen Sommertag zeigt. Sie basiert auf der [Berliner Erfrischungskarte](https://github.com/technologiestiftung/erfrischungskarte-frontend) der Technologiestiftung Berlin.

## Kontext

Der Klimawandel sorgt an vielen Orten für zunehmend heißes, trockenes Wetter. Auch in Dresden hat die Zahl der Hitzetage in den letzten Jahren zugenommen.
Diese Karte zeigt dir, wo und wie du an solchen Tagen Erfrischung finden kannst. Sie zeigt Bereiche mit unterschiedlicher Wärmebelastung, Gebiete mit kühlendem Wind sowie erfrischende Orte wie Freibäder, Schwimmhallen, Trinkbrunnen, Parkanlagen und mehr.

Diese Anwendung basiert vollständig auf offenen Daten, die größtenteils aus dem [Open-Data-Portal der Stadt Dresden](https://opendata.dresden.de/) stammen.

## Adaption vom Berliner Original

Dieses Projekt ist ein Fork der [Berliner Erfrischungskarte](https://github.com/technologiestiftung/erfrischungskarte-frontend), entwickelt von ODIS / Technologiestiftung Berlin. Die Adaption für Dresden umfasst:

- **Kartenzentrum und Bounding-Box**: Von Berlin auf Dresden verschoben
- **Temperaturdaten**: Wärmebelastungskategorien der Stadt Dresden (qualitativ statt quantitativ)
- **Winddaten**: Mittlere Windgeschwindigkeiten mit Step-basierter Farbzuordnung
- **Schattendaten**: Im UI deaktiviert (keine bDOM-Daten für Dresden verfügbar), Code erhalten
- **POIs**: Eigenes ETL-Script mit 9 Dresdner Datenquellen (Toiletten, Freibäder, Schwimmhallen, Wassersportstätten, Parkanlagen, Refill-Stationen, Trinkbrunnen)
- **Suchvorschläge**: 12 Dresdner Orte mit exakten Koordinaten
- **Alle UI-Texte**: Für Dresden angepasst

### Neue Features (nicht im Berliner Original)

- **Rechtsklick-Kontextmenü**: "In Google Maps öffnen" per Rechtsklick auf die Karte, mit automatischer POI-Erkennung
- **Verbesserte Suchfokussierung**: Zuverlässige Kartenzentrierung beim Klick auf Suchergebnisse

## Tech Stack

Diese Website ist eine NextJS-App konfiguriert mit:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/) (v17) mit [react-map-gl](https://visgl.github.io/react-map-gl/) (v6)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) für Kartenvisualisierung
- Linting mit [ESLint](https://eslint.org/)
- Formatierung mit [Prettier](https://prettier.io/)
- Testing mit [Jest](https://jestjs.io/) und [react-testing-library](https://testing-library.com/docs/react-testing-library/intro)

## Daten

Dieses Repository enthält den **Frontend-Code** der Dresdner Erfrischungskarte. Die **Daten** und Datenverarbeitungsscripts befinden sich in einem separaten Repository: [erfrischungskarte-dresden-daten](https://github.com/Metrox01/erfrischungskarte-dresden-daten/tree/dresden).

Datenquellen für Dresden:
- Wärmebelastungsdaten (Open-Data-Portal Dresden)
- Windgeschwindigkeitsdaten (Open-Data-Portal Dresden)
- POIs: Barrierefreie WCs, Nette Toiletten, öffentliche Toiletten, Freibäder, Schwimmhallen, Wassersportstätten, Parkanlagen, Refill-Stationen, Trinkbrunnen

## Installation

### Voraussetzungen

#### [Mapbox](https://www.mapbox.com/)
Du benötigst einen [Mapbox](https://www.mapbox.com/)-Account, um die Karte lokal zu rendern. Trage deinen Mapbox-Access-Token in die Umgebungsvariable `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` ein.

### Setup

```bash
# Repository klonen
git clone <repo-url>

# In das Verzeichnis wechseln
cd erfrischungskarte-dresden

# npm-Abhängigkeiten installieren
npm install

# Eigene .env-Datei erstellen
cp .env.example .env

# .env-Datei mit eigenen Werten bearbeiten
vim .env

# Entwicklungsserver starten
npm run dev
```

## Credits

Dieses Projekt basiert auf der [Berliner Erfrischungskarte](https://github.com/technologiestiftung/erfrischungskarte-frontend), entwickelt von:

- [ODIS (Open Data Informationsstelle Berlin)](https://odis-berlin.de)
- [CityLAB Berlin](https://citylab-berlin.org)
- [Technologiestiftung Berlin](https://www.technologiestiftung-berlin.de)

Adaption für Dresden im Rahmen einer Belegarbeit an der TU Dresden.

## Lizenz

Texte und Inhalte verfügbar als [CC BY](https://creativecommons.org/licenses/by/3.0/de/).
