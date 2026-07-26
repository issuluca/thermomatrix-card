# ThermoMatrix Card roadmap

## Identità

- Nome: **ThermoMatrix Card**
- Elemento Lovelace: `custom:thermomatrix-card`
- Bundle HACS: `dist/thermomatrix-card.js`

## Principi

- Card autonoma, senza dipendenza da `custom:button-card`.
- Compatibile con qualsiasi entità `climate`.
- Controlli generati esclusivamente dalle capacità dichiarate dall'entità.
- Moduli opzionali che non compromettono la card quando non configurati.
- Configurazione YAML ed editor visuale.
- Layout responsive e coerente con temi chiari e scuri.

## Display

- Temperature con cifre LCD a sette segmenti e segmenti spenti visibili.
- Indicatori rettangolari `ON`, `IDLE` e `OFF` a matrice di pixel.
- `ON` lampeggia durante `heating`, `cooling`, `drying` o `fan`.
- `IDLE` lampeggia quando `hvac_action` è `idle`.
- `OFF` resta fisso quando il climatizzatore è spento.
- Nome del dispositivo in fondo alla card, come marchio in rilievo.
- Sfondo legato alla modalità, tenue nel tema chiaro e intenso nel tema scuro.

## Moduli

- Preset attivabili o disattivabili.
- Pulsanti preset generati da `preset_modes`.
- `none` viene presentato come `Manuale`.
- Consumo attivabile con un sensore di potenza dedicato.
- Bordo colorato secondo modalità oppure neutro.

## Fasi

1. **Fondazione** — componente Lit/TypeScript, bundle e manifest HACS.
2. **Parità visiva** — confronto con il prototipo `button-card` in Home
   Assistant.
3. **Editor** — rifinitura della configurazione visuale e anteprima.
4. **Robustezza** — test con capacità HVAC diverse, entità mancanti e layout
   stretti.
5. **Distribuzione** — repository GitHub pubblico, licenza, immagini,
   automazioni di controllo e prima release.
6. **HACS** — installazione come repository personalizzato e successiva
   candidatura al catalogo predefinito.
