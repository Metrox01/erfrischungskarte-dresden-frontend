# Extracted JSDoc

## src/modules/RefreshmentMap/index.tsx

- Mapbox style URL used by the app.
- Important: this project uses mapbox-gl@2.x via react-map-gl@6.x.
- Styles that include an "imports" field (Mapbox Standard v3) are not
- compatible and can trigger runtime errors.
- Use a classic/legacy style export from Mapbox Studio (no "imports").
Target: export const MAP_STYLE_URL =

## src/modules/RefreshmentMap/content.tsx

- Uses heatstress data from the open-data-portal Dresden to display areas with different
- heatstress levels. This indicates cooler areas within the city.
Target: export const HEATSTRESS_DATA: Pick<
