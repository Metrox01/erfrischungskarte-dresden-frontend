import { TemperatureIcon, WindIcon } from '@components/Icons'
import { LayerLegendBlockType } from '@components/LayerLegendBlock'
import { MapPointLayerType } from '@components/MapPointLayer'
import classNames from 'classnames'
import { MapExtrusionLayerType } from '../../components/MapExtrusionLayer'
import { MapFilledPolygonLayerType } from '../../components/MapFilledPolygonLayer'
import colors from '../../style/colors'
import { LayerLegendFigure } from '@components/LayerLegendFigure'

export interface SearchSuggestionItemType {
  type: string
  properties: {
    name: string
    conditions: string
    category: PoiCategory
    bezirk?: string
    bezirksreg?: string
  }
  geometry: {
    type: 'Point'
    coordinates: [latitude: number, longitude: number]
  }
}

export type HourType =
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'

export type HourDataType = {
  [key in HourType]: {
    displayName: string
    vectorTilesetKey: string
    shadeTilesetId: string
  }
}

// Note: Hours are mapped. In mapbox the tiles are labeled with solar time not local time, that is 66 minutes behind. For example the shadow layer '2 am' in mapbox actually shows the shadows for 3 am.
export const HOURS: HourDataType = {
  '10': {
    displayName: '10 Uhr',
    vectorTilesetKey: '10Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.6pkd1c22',
  },
  '11': {
    displayName: '11 Uhr',
    vectorTilesetKey: '11Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.a7c0dvqi',
  },
  '12': {
    displayName: '12 Uhr',
    vectorTilesetKey: '12Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.czmr5c6o',
  },
  '13': {
    displayName: '13 Uhr',
    vectorTilesetKey: '13Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.6i6vo02j',
  },
  '14': {
    displayName: '14 Uhr',
    vectorTilesetKey: '14Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.79eus56w',
  },
  '15': {
    displayName: '15 Uhr',
    vectorTilesetKey: '15Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.0gpw7ll3',
  },
  '16': {
    displayName: '16 Uhr',
    vectorTilesetKey: '16Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.b7kilqew',
  },
  '17': {
    displayName: '17 Uhr',
    vectorTilesetKey: '17Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.77hu0gps',
  },
  '18': {
    displayName: '18 Uhr',
    vectorTilesetKey: '18Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.5w67kmqm',
  },
  '19': {
    displayName: '19 Uhr',
    vectorTilesetKey: '19Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.6291ii6g',
  },
  '20': {
    displayName: '20 Uhr',
    vectorTilesetKey: '20Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.9gfkjbpe',
  },
}

export type QuantileValues = 1 | 2 | 3 | 4 | 5

/* export const WIND_DATA: Pick<
  MapFilledPolygonLayerType,
  'id' | 'tileset' | 'fillColorMap'
> = {
  id: 'wind-data',
  tileset: {
    url: 'mapbox://technologiestiftung.1hrk87mv',
    layerName: 'wind_data-dgvmuc',
  },
  fillColorMap: new Map([
    // Note: the mapping here is different than the one for the temperature data.
    [5, colors['layer-green'][400]],
    [4, colors['layer-green'][300]],
    [3, colors['layer-green'][200]],
    [2, colors['layer-green'][100]],
    [1, 'rgba(255,255,255,0)'],
  ]),
} */

export const WIND_DATA: Pick<
  MapFilledPolygonLayerType,
  'id' | 'tileset' | 'fillColorMap' | 'fillColorMode'
> = {
  id: 'wind-data',
  tileset: {
    url: 'mapbox://laschfabian.5t9g5dk7',
    layerName: 'windgeschwindigkeiten-mittel_-64ynyu',
  },
  fillColorMode: 'step',
  fillColorMap: new Map([
    [1.943, 'rgba(255,255,255,0)'],
    [2.72, colors['layer-green'][100]],
    [3.044, colors['layer-green'][200]],
    [3.477, colors['layer-green'][300]],
    [4.021, colors['layer-green'][400]],
    [5.312, colors['layer-green'][500]],
  ]),
}

/* export const TEMPERATURE_DATA: Pick<
  MapFilledPolygonLayerType,
  'id' | 'tileset' | 'fillColorMap'
> = {
  id: 'temperature-data',
  tileset: {
    url: 'mapbox://technologiestiftung.4e9mfohk',
    layerName: 'temperature_data-5k7yue',
  },
  fillColorMap: new Map([
    [1, colors['layer-blue'][400]],
    [2, colors['layer-blue'][300]],
    [3, colors['layer-blue'][200]],
    [4, colors['layer-blue'][100]],
    [5, 'rgba(255,255,255,0)'],
  ]),
} */

/**
 * Uses heatstress data from the open-data-portal Dresden to display areas with different
 * heatstress levels. This indicates cooler areas within the city.
 */
export const TEMPERATURE_DATA: Pick<
  MapFilledPolygonLayerType,
  'id' | 'tileset' | 'fillColorMap'
> = {
  id: 'temperature-data',
  tileset: {
    url: 'mapbox://laschfabian.dw3vul58',
    layerName: 'waermebelastung_dd-50a3sc',
  },
  fillColorMap: new Map([
    ['höchste', 'rgba(255,255,255,0)'],
    ['hohes', colors['layer-blue'][100]],
    ['mittlere', colors['layer-blue'][200]],
    ['geringe', colors['layer-blue'][300]],
    ['kein bis geringstes', colors['layer-blue'][400]],
  ]),
}

export const EXTRUDED_BUILDINGS_DATA: MapExtrusionLayerType = {
  id: '3d-buildings',
  url: 'mapbox://mapbox.mapbox-streets-v8',
  source: 'composite',
  sourceLayer: 'building',
  extrusionProperties: {
    base: 'min_height',
    height: 'height',
  },
  extrusionColor: '#ddd',
}

export type PoiCategory =
  // | 'Sitzbank' // not available in Dresden
  // | 'Picknicktisch' // not available in Dresden
  | 'Grünanlage'
  | 'Trinkbrunnen'
  // | 'Brunnen' // not available in Dresden
  | 'Refill Station'
  // | 'Wasserspielplatz' // not available in Dresden
  // | 'Badestelle' // not available in Dresden
  // | 'Strandbad' // not available in Dresden
  | 'Freibad'
  | 'Schwimmhalle'
  | 'Toilette'
  // | 'Öffentlicher "Kühler Raum"' // not available in Dresden
  | 'Wassersportstätte'

export const POI_CATEGORY_COLOR_MAP: Map<PoiCategory, string> = new Map([
  // ['Badestelle' — not available in Dresden data]
  // ['Badestelle', colors['poi-darkblue']],
  // ['Strandbad' — not available in Dresden data]
  // ['Strandbad', colors['poi-darkblue']],
  ['Freibad', colors['poi-darkblue']],
  ['Schwimmhalle', colors['poi-darkblue']],
  // ['Wasserspielplatz' — not available in Dresden data]
  // ['Wasserspielplatz', colors['poi-pink']],
  ['Trinkbrunnen', colors['poi-lightblue']],
  // ['Brunnen' — not available in Dresden data]
  // ['Brunnen', colors['poi-turquoise']],
  ['Refill Station', colors['poi-lightblue']],
  ['Grünanlage', colors['poi-green']],
  // ['Sitzbank' — not available in Dresden data]
  // ['Sitzbank', colors['poi-yellow']],
  // ['Picknicktisch' — not available in Dresden data]
  // ['Picknicktisch', colors['poi-red']],
  ['Toilette', colors['poi-orange']],
  // ['Öffentlicher "Kühler Raum"' — not available in Dresden data]
  // ['Öffentlicher "Kühler Raum"', colors['poi-darkgrey']],
  ['Wassersportstätte', colors['poi-darkblue']],
])

type PoiCategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14

export const POI_CATEGORY_ID_MAP: { [key in PoiCategory]: PoiCategoryId } = {
  // Badestelle: 1, // not available in Dresden
  // Strandbad: 2, // not available in Dresden
  Freibad: 3,
  Schwimmhalle: 4,
  // Wasserspielplatz: 5, // not available in Dresden
  Trinkbrunnen: 6,
  // Brunnen: 7, // not available in Dresden
  Grünanlage: 8,
  // Sitzbank: 9, // not available in Dresden
  // Picknicktisch: 10, // not available in Dresden
  Toilette: 11,
  // 'Öffentlicher "Kühler Raum"': 12, // not available in Dresden
  'Refill Station': 13,
  Wassersportstätte: 14,
}

export interface PoiDataType extends MapPointLayerType {
  id: string
  fillColorMap: Map<PoiCategory, string>
  activePropertyKeys: Partial<PoiCategory>[]
}

export const POI_DATA: PoiDataType = {
  id: 'poi-data',
  /* tileset: {
    url: 'mapbox://technologiestiftung.8zk96hlq',
    layerName: 'pois_jun2025-bkayoz',
  }, */
  tileset: {
    url: 'mapbox://laschfabian.cmp4c190b0al51po1r764uy9e-4422h',
    layerName: 'pois_dresden_may',
  },
  fillColorProperty: 'category',
  fillColorMap: POI_CATEGORY_COLOR_MAP,
  activePropertyKeys: [
    // 'Badestelle', // not available in Dresden
    // 'Strandbad', // not available in Dresden
    'Freibad',
    'Schwimmhalle',
    // 'Wasserspielplatz', // not available in Dresden
    'Trinkbrunnen',
    // 'Brunnen', // not available in Dresden
    'Refill Station',
    'Grünanlage',
    // 'Sitzbank', // not available in Dresden
    // 'Picknicktisch', // not available in Dresden
    'Toilette',
    // 'Öffentlicher "Kühler Raum"', // not available in Dresden
    'Wassersportstätte',
  ],
}

export const ABOUT_INTRODUCTION_TEXT = (
  <>
    Der Klimawandel sorgt an vielen Orten für immer heißeres, trockeneres
    Wetter. Auch Dresden erlebte in den vergangenen Jahren zunehmend mehr
    Hitzetage. Wo ihr an solchen Tagen Erfrischung findet, seht ihr in dieser
    Karte. Sie zeigt euch, wo es tendenziell eher kühl ist und wo für gewöhnlich
    eine frische Brise weht. Aufgrund der differenzierten Topographie kann es
    zum Teil erhebliche Unterschiede innerhalb des Stadtgebietes geben. Entdeckt
    außerdem erfrischende Orte, wie Freibäder, Trinkbrunnen und Parks. Mit einem
    Klick über die Teilenfunktion könnt ihr euren neuen Lieblingsplatz mit
    anderen teilen.
    <br />
    <br />
    Diese Anwendung basiert komplett auf offenen Daten und ist eine Adaption der{' '}
    <a
      target="blank"
      href="https://erfrischungskarte.odis-berlin.de"
      className="text-gray-800 underline"
    >
      Berliner Erfrischungskarte
    </a>{' '}
    der Technologiestiftung Berlin. Die Dresdner Version nutzt offene Geodaten
    der Stadt Dresden aus dem{' '}
    <a
      target="blank"
      href="https://opendata.dresden.de"
      className="text-gray-800 underline"
    >
      Open-Data-Portal Dresden
    </a>
    .
  </>
)

export const ABOUT_CONTACT_TEXT = (
  <>
    <p>
      Bei{' '}
      <a
        target="blank"
        href="https://refill-deutschland.de"
        className="text-gray-800 underline"
      >
        Refill Deutschland
      </a>{' '}
      findest du Standorte von Geschäften, bei denen du kostenlos Wasser
      auffüllen kannst.
    </p>
    <p className="mt-3">
      Diese Anwendung basiert auf der{' '}
      <a
        href="https://github.com/technologiestiftung/erfrischungskarte-frontend/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 underline"
      >
        Berliner Erfrischungskarte
      </a>{' '}
      der Technologiestiftung Berlin (MIT-Lizenz).
    </p>
  </>
)

export const ABOUT_HOW_TO = (
  <>
    Mit dieser Karte ist es möglich, verschiedene Bereiche in Dresden im
    Hinblick auf ihre klimatische Funktion zu entdecken. Die Untersuchung des
    Stadtklimas ist ein wichtiger Aspekt in der Stadtentwicklung und -planung,
    um die Lebensqualität zu erhöhen und gesundheitliche Risiken durch Hitze zu
    verringern. Zwei wichtige Faktoren, die das lokale Klima ausmachen, sind
    Lufttemperatur bzw. Wärmebelastung und Windgeschwindigkeit. Über die
    Filterfunktion können diese Faktoren einzeln angezeigt oder ausgeblendet
    werden. Die Karte zeigt anhand der Farbskalen, wie sich Wärmebelastung und
    Windverhältnisse an verschiedenen Orten der Stadt unterscheiden. Dunklere
    Flächen zeigen an, dass dies ein erfrischender Ort für heiße Sommertage ist.
    Helle Flächen dagegen sprechen für sich stark aufheizende Bereiche. Die
    Daten beruhen auf Modellierungen und Geodaten aus dem Open-Data-Portal der
    Stadt Dresden.
  </>
)

export const ABOUT_SHADOW_TEXT = (
  <>
    Ein wichtiger Faktor für das lokale Aufheizen und die Entstehung von
    Hitzeinseln an heißen Tagen ist, wie lange ein Bereich der Sonne ausgesetzt
    oder beschattet ist. Klimatisch und für das Wohlbefinden von Vorteil sind
    Parks und Straßenzüge mit vielen Bäumen, die Schatten spenden. Für die
    Berliner Erfrischungskarte wurden Schattendaten auf Grundlage eines
    bildbasierten Digitalen Oberflächenmodells (bDOM) berechnet. Für Dresden
    steht ein solches Modell derzeit nicht als offener Datensatz zur Verfügung,
    weshalb die Schattendarstellung in dieser Adaption nicht aktiviert ist. Bei
    zukünftiger Verfügbarkeit entsprechender Daten kann dieses Feature ergänzt
    werden.
  </>
)

export const ABOUT_COOL_TEXT = (
  <>
    Die Darstellung der Wärmebelastung basiert auf Geodaten aus dem{' '}
    <a
      target="blank"
      href="https://opendata.dresden.de"
      className="text-gray-800 underline"
    >
      Open-Data-Portal der Stadt Dresden
    </a>
    . Der Datensatz klassifiziert die Wärmebelastung in fünf qualitative
    Kategorien: &quot;höchste&quot;, &quot;hohes&quot;, &quot;mittlere&quot;,
    &quot;geringe&quot; und &quot;kein bis geringstes&quot;. Im Unterschied zur
    Berliner Vorlage, die auf einem numerischen Klimamodell mit stundengenauer
    Auflösung basiert, handelt es sich bei den Dresdner Daten um eine statische
    Klassifizierung ohne Tagesverlauf. <br></br>
    Für die Wärmebelastung ausschlaggebend sind u.a. die Boden- und
    Oberflächeneigenschaften. Waldflächen und größere Grünanlagen wie der Große
    Garten weisen eine deutlich geringere Wärmebelastung auf als baulich
    geprägte Gebiete. Wasserflächen wie die Elbe wirken aufgrund ihrer
    spezifischen Wärmekapazität klimatisch ausgleichend.
  </>
)
export const ABOUT_WINDY_TEXT = (
  <>
    Die Darstellung der Windverhältnisse basiert auf Geodaten zu mittleren
    Windgeschwindigkeiten aus dem{' '}
    <a
      target="blank"
      href="https://opendata.dresden.de"
      className="text-gray-800 underline"
    >
      Open-Data-Portal der Stadt Dresden
    </a>
    . Im Unterschied zur Berliner Vorlage, die Kaltluftvolumenströme als
    Quintile darstellt, werden hier die numerischen Windgeschwindigkeitswerte in
    Meter pro Sekunde verwendet und über definierte Schwellenwerte in Farbstufen
    eingeteilt. Auch diese Darstellung ist statisch und bildet keinen
    Tagesverlauf ab. <br></br>
    Bereiche mit höheren Windgeschwindigkeiten bieten an heißen Sommertagen eine
    bessere Durchlüftung. Diese finden sich häufig in Freiflächen, entlang des
    Elbtals und in größeren Parkanlagen. Die gute Durchlüftung kann die
    Hitzebelastung reduzieren und wirkt sich auch auf umliegende Bereiche aus.
  </>
)

export const ABOUT_WEATHER_TEXT = (
  <>
    Die Wetterdaten stammen vom{' '}
    <a
      target="blank"
      href="https://www.dwd.de/DE/Home/home_node.html"
      className="text-gray-800 underline"
    >
      Deutschen Wetterdienst (DWD)
    </a>{' '}
    , der im Rahmen seines{' '}
    <a
      target="blank"
      href="https://www.dwd.de/DE/leistungen/opendata/opendata.html"
      className="text-gray-800 underline"
    >
      Open-Data-Programms
    </a>{' '}
    eine Vielzahl von meteorologischen Beobachtungen und Berechnungen
    veröffentlicht.
    <br />
    <br />
    Das Open-Source-Projekt{' '}
    <a
      target="blank"
      href="https://brightsky.dev/"
      className="text-gray-800 underline"
    >
      BrightSky
    </a>{' '}
    , bietet eine kostenlose JSON-API an, um Wetterdaten ganz einfach
    abzufragen. So können die Wettervorhersagen für Dresden stundengenau
    dargestellt werden.
  </>
)

export const ABOUT_POINTS_TEXT = (
  <>
    Die Erfrischungsorte stammen aus verschiedenen offenen Datenquellen der
    Stadt Dresden. Die Standorte der{' '}
    <a
      target="blank"
      href="https://opendata.dresden.de"
      className="text-gray-800 underline"
    >
      Parkanlagen
    </a>{' '}
    wurden aus dem Open-Data-Portal der Stadt Dresden bezogen. Die{' '}
    <b>Freibäder</b>, <b>Schwimmhallen</b> und <b>Wassersportstätten</b> stammen
    ebenfalls aus offenen Datensätzen der Stadt. Die Standorte der{' '}
    <b>öffentlichen Toiletten</b> umfassen sowohl städtische Anlagen als auch
    barrierefreie WCs und Standorte der{' '}
    <a
      target="blank"
      href="https://www.nette-toilette.de/"
      className="text-gray-800 underline"
    >
      Nette-Toilette-Initiative
    </a>
    . Die <b>Trinkbrunnen</b> wurden aus den offenen Geodaten der Stadt
    übernommen. Die Daten für die Refill-Stationen stammen von dem Projekt{' '}
    <a
      target="blank"
      href="https://refill-deutschland.de/"
      className="text-gray-800 underline"
    >
      Refill Deutschland
    </a>
    . Alle Datenquellen wurden mittels eines eigenen ETL-Scripts zusammengeführt
    und als einheitliches GeoJSON für die Kartenvisualisierung aufbereitet.
  </>
)

export const ABOUT_ACCORDION_ITEMS = [
  {
    id: 'howto',
    title: 'Wie liest man die Erfrischungskarte?',
    content: ABOUT_HOW_TO,
  },
  // Shadow accordion item disabled for Dresden – no bDOM data available yet.
  // {
  //   id: 'shadows',
  //   title: 'Schatten',
  //   content: ABOUT_SHADOW_TEXT,
  // },
  {
    id: 'cool-areas',
    title: 'Kühle Bereiche',
    content: ABOUT_COOL_TEXT,
  },
  {
    id: 'windy-areas',
    title: 'Kalt-windige Bereiche',
    content: ABOUT_WINDY_TEXT,
  },
  {
    id: 'weather',
    title: 'Wetter',
    content: ABOUT_WEATHER_TEXT,
  },
  {
    id: 'places',
    title: 'Orte',
    content: ABOUT_POINTS_TEXT,
  },
]

export const SEARCH_SUGGESTIONS: SearchSuggestionItemType[] = [
  {
    type: 'Feature',
    properties: {
      name: 'Großer Garten (Palaisteich)',
      conditions: 'kühl, viel Schatten',
      category: 'Grünanlage',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.76295, 51.04178],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Georg-Arnhold-Bad',
      conditions: 'Ort zum Schwimmen',
      category: 'Freibad',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.75385, 51.04555],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Alaunpark',
      conditions: 'kühl, Schattenplatz',
      category: 'Grünanlage',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.75862, 51.06579],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Freibad Wostra',
      conditions: 'Ort zum Schwimmen',
      category: 'Freibad',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.82726, 51.00776],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Blüherpark',
      conditions: 'kühl, viel Schatten',
      category: 'Grünanlage',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.74613, 51.04442],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Elbwiesen Johannstadt',
      conditions: 'frische Brise, kühl',
      category: 'Grünanlage',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.77245, 51.05623],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Freibad Cotta',
      conditions: 'Ort zum Schwimmen',
      category: 'Freibad',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.69275, 51.05119],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Waldpark Blasewitz',
      conditions: 'kühl, frische Brise, viel Schatten',
      category: 'Grünanlage',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.79736, 51.04788],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Stauseebad Cossebaude',
      conditions: 'Ort zum Schwimmen',
      category: 'Freibad',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.63784, 51.08072],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Dresdner Heide (Prießnitzwasserfall)',
      conditions: 'kühl, viel Schatten, frische Brise',
      category: 'Grünanlage',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.79518, 51.08153],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Schwimmhalle Freiberger Platz',
      conditions: 'Ort zum Schwimmen',
      category: 'Schwimmhalle',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.72215, 51.04608],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Ostragehege / Flutrinne',
      conditions: 'frische Brise, kühl',
      category: 'Grünanlage',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.71462, 51.06138],
    },
  },
]

// Shadow labels disabled for Dresden – no bDOM data available yet.
// const maxShadeLabel = (
//   <div className="flex items-center">
//     <div className="w-2 h-2 bg-[#808080] rounded-full"></div>
//     <span className="ml-1">Schattig</span>
//   </div>
// )
//
// const minShadeLabel = (
//   <div className="flex items-center">
//     <div className="w-2 h-2 bg-[#F4F4F2] rounded-full"></div>
//     <span className="ml-1">Sonnig</span>
//   </div>
// )

export const LAYER_LEGEND_ITEMS: {
  shade: Pick<
    LayerLegendBlockType,
    'title' | 'description' | 'icon' | 'legendFigure'
  > | null
  temperature: Pick<
    LayerLegendBlockType,
    'title' | 'description' | 'icon' | 'legendFigure'
  >
  wind: Pick<
    LayerLegendBlockType,
    'title' | 'description' | 'icon' | 'legendFigure'
  >
} = {
  // Shadow legend disabled for Dresden – no bDOM data available yet.
  // Kept in code for future implementation.
  shade: null,
  temperature: {
    title: 'Kühle Bereiche',
    description: 'Zeigt die vergleichsweise kühlsten Bereiche in der Stadt.',
    icon: <TemperatureIcon />,
    legendFigure: (
      <LayerLegendFigure maxLabel="Kühl" minLabel="Weniger kühl">
        <div className={classNames('h-[10px]', 'grid grid-cols-5')}>
          <div className={classNames('bg-layer-blue-400 opacity-50')}></div>
          <div className={classNames('bg-layer-blue-300 opacity-50')}></div>
          <div className={classNames('bg-layer-blue-200 opacity-50')}></div>
          <div className={classNames('bg-layer-blue-100 opacity-50')}></div>
          <div className={classNames('bg-white opacity-50')}></div>
        </div>
      </LayerLegendFigure>
    ),
  },
  wind: {
    title: 'Frischer Wind',
    description: 'Zeigt, wo vergleichsweise viel kalter Wind weht.',
    icon: <WindIcon />,
    legendFigure: (
      <LayerLegendFigure maxLabel="Windig" minLabel="Weniger windig">
        <div className={classNames('h-[10px]', 'grid grid-cols-5')}>
          <div className={classNames('bg-layer-green-400 opacity-50')}></div>
          <div className={classNames('bg-layer-green-300 opacity-50')}></div>
          <div className={classNames('bg-layer-green-200 opacity-50')}></div>
          <div className={classNames('bg-layer-green-100 opacity-50')}></div>
          <div className={classNames('bg-white opacity-50')}></div>
        </div>
      </LayerLegendFigure>
    ),
  },
}

export const SHADE_SUPPORT_NOTE = (
  <p className="text-xs">
    Leider können die Schatten auf diesem Endgerät oder in diesem Browser nicht
    dargestellt werden. Bitte versuche ein anderes Endgerät oder einen anderen
    Browser, um die Karte zu öffnen.
  </p>
)
