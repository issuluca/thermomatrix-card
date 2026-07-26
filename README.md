# ThermoMatrix Card

Una card Lovelace modulare in stile LCD per controllare entità `climate` in
Home Assistant.

> Stato del progetto: versione di sviluppo installabile come archivio
> personalizzato HACS.

## Funzioni già previste

- modalità HVAC generate automaticamente da `hvac_modes`;
- temperatura ambiente e target con display a sette segmenti;
- indicatori LCD `ON`, `IDLE` e `OFF`;
- regolazione della temperatura;
- preset generati automaticamente e disattivabili;
- modulo opzionale per un sensore di consumo, con valore a sette segmenti;
- indicatore inferiore dello stato operativo;
- bordo dinamico secondo la modalità o neutro;
- adattamento al tema chiaro e scuro;
- configurazione dall'editor visuale di Home Assistant.

## Configurazione di sviluppo

```yaml
type: custom:thermomatrix-card
entity: climate.termostato_sala
show_presets: true
show_consumption: false
border_mode: state
temperature_step: 0.1
```

Con il modulo consumo:

```yaml
type: custom:thermomatrix-card
entity: climate.termostato_sala
show_presets: true
show_consumption: true
power_entity: sensor.climatizzatore_power
border_mode: state
```

### Stato operativo avanzato

L'indicatore inferiore usa normalmente l'attributo `hvac_action` dell'entità
`climate` (con fallback allo stato principale).

È possibile indicare un'entità separata tramite `status_entity` per mostrare
stati specifici, ad esempio `In attivazione` o `In spegnimento`, ricavati da
un'automazione o dal sensore di consumo:

```yaml
type: custom:thermomatrix-card
entity: climate.termostato_sala
status_entity: sensor.stato_climatizzatore
show_consumption: true
power_entity: sensor.climatizzatore_power
```

`status_entity` è una funzione opzionale pensata per impianti che espongono
fasi operative aggiuntive. Non è necessaria per il normale funzionamento della
card.

## Sviluppo

```shell
npm install
npm run build
```

Il file destinato a Home Assistant e HACS viene generato in
`dist/thermomatrix-card.js`.

## Prova manuale in Home Assistant

1. Copiare `dist/thermomatrix-card.js` in
   `/config/www/thermomatrix-card.js`.
2. Aggiungere una risorsa JavaScript di tipo modulo con URL
   `/local/thermomatrix-card.js`.
3. Aggiungere una nuova card scegliendo **ThermoMatrix Card** dall'editor,
   oppure usare uno degli esempi YAML riportati sopra.
4. Dopo ogni aggiornamento del file, ricaricare completamente il browser per
   evitare la cache della risorsa precedente.

## Distribuzione

Il repository finale conterrà `hacs.json` nella radice e
`dist/thermomatrix-card.js`, come richiesto da HACS per le card Dashboard.

## Licenza

Da definire prima della prima pubblicazione.
