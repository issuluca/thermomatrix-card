import {
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { keyed } from "lit/directives/keyed.js";
import { thermoMatrixStyles } from "./styles";
import type {
  HassEntity,
  HomeAssistant,
  ThermoMatrixConfig,
} from "./types";

const VERSION = "0.4.0";
const WORKING_ACTIONS = new Set(["heating", "cooling", "drying", "fan"]);
const WHEEL_CHARACTERS = [" ", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const MODE_META: Record<string, { icon: string; color: string }> = {
    off: { icon: "mdi:power", color: "#94a3b8" },
    heat: { icon: "mdi:fire", color: "#f97316" },
    cool: { icon: "mdi:snowflake", color: "#1d4ed8" },
    dry: { icon: "mdi:water-percent", color: "#10b981" },
    fan_only: { icon: "mdi:fan", color: "#0891b2" },
    auto: { icon: "mdi:thermostat-auto", color: "#8b5cf6" },
    heat_cool: { icon: "mdi:autorenew", color: "#8b5cf6" },
  };

const SEGMENTS: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abdeg",
  "3": "abcdg",
  "4": "bcfg",
  "5": "acdfg",
  "6": "acdefg",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  "-": "g",
};

const LETTERS: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  G: ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  J: ["00111", "00010", "00010", "00010", "10010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
};

const PRESET_META: Record<string, { icon: string; color: string }> = {
  none: { icon: "mdi:hand-back-right", color: "#c026d3" },
  home: { icon: "mdi:home", color: "#1d4ed8" },
  away: { icon: "mdi:bag-checked", color: "#94a3b8" },
  sleep: { icon: "mdi:sleep", color: "#8b5cf6" },
  comfort: { icon: "mdi:sofa", color: "#10b981" },
  eco: { icon: "mdi:leaf", color: "#16a34a" },
};

type Language = "en" | "it" | "es" | "fr" | "de" | "pt";
type TranslationKey =
  | "loading" | "unavailable" | "environment" | "target" | "consumption"
  | "off" | "heat" | "cool" | "dry" | "fan_only" | "auto" | "heat_cool"
  | "none" | "home" | "away" | "sleep" | "comfort" | "eco";

const TRANSLATIONS: Record<Language, Record<TranslationKey, string>> = {
  en: { loading: "Loading…", unavailable: "Unavailable", environment: "ROOM", target: "TARGET", consumption: "POWER", off: "Off", heat: "Heat", cool: "Cool", dry: "Dry", fan_only: "Fan", auto: "Auto", heat_cool: "Auto", none: "Manual", home: "Home", away: "Away", sleep: "Sleep", comfort: "Comfort", eco: "Eco" },
  it: { loading: "Caricamento…", unavailable: "Non disponibile", environment: "AMBIENTE", target: "TARGET", consumption: "CONSUMO", off: "Spento", heat: "Caldo", cool: "Freddo", dry: "Deumidifica", fan_only: "Ventola", auto: "Auto", heat_cool: "Auto", none: "Manuale", home: "Casa", away: "Assente", sleep: "Notte", comfort: "Comfort", eco: "Eco" },
  es: { loading: "Cargando…", unavailable: "No disponible", environment: "AMBIENTE", target: "OBJETIVO", consumption: "CONSUMO", off: "Apagado", heat: "Calor", cool: "Frío", dry: "Deshumidificar", fan_only: "Ventilador", auto: "Auto", heat_cool: "Auto", none: "Manual", home: "Casa", away: "Ausente", sleep: "Noche", comfort: "Confort", eco: "Eco" },
  fr: { loading: "Chargement…", unavailable: "Indisponible", environment: "AMBIANCE", target: "CIBLE", consumption: "PUISSANCE", off: "Arrêt", heat: "Chauffage", cool: "Froid", dry: "Déshumidifier", fan_only: "Ventilateur", auto: "Auto", heat_cool: "Auto", none: "Manuel", home: "Maison", away: "Absent", sleep: "Nuit", comfort: "Confort", eco: "Éco" },
  de: { loading: "Laden…", unavailable: "Nicht verfügbar", environment: "RAUM", target: "ZIEL", consumption: "LEISTUNG", off: "Aus", heat: "Heizen", cool: "Kühlen", dry: "Entfeuchten", fan_only: "Lüfter", auto: "Auto", heat_cool: "Auto", none: "Manuell", home: "Zuhause", away: "Abwesend", sleep: "Nacht", comfort: "Komfort", eco: "Eco" },
  pt: { loading: "A carregar…", unavailable: "Indisponível", environment: "AMBIENTE", target: "ALVO", consumption: "CONSUMO", off: "Desligado", heat: "Aquecer", cool: "Arrefecer", dry: "Desumidificar", fan_only: "Ventoinha", auto: "Auto", heat_cool: "Auto", none: "Manual", home: "Casa", away: "Ausente", sleep: "Noite", comfort: "Conforto", eco: "Eco" },
};

export class ThermoMatrixCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static styles = thermoMatrixStyles;

  public hass!: HomeAssistant;
  private _config!: ThermoMatrixConfig;
  private _labelResizeObserver?: ResizeObserver;
  private _labelSyncFrame?: number;

  public static getConfigForm(): Record<string, unknown> {
    return {
      schema: [
        {
          name: "entity",
          required: true,
          selector: { entity: { domain: "climate" } },
        },
        { name: "name", selector: { text: {} } },
        { name: "show_presets", selector: { boolean: {} } },
        { name: "show_consumption", selector: { boolean: {} } },
        {
          name: "power_entity",
          selector: { entity: { domain: "sensor" } },
        },
        {
          name: "status_entity",
          selector: { entity: {} },
        },
        {
          name: "language",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "auto", label: "Automatic (Home Assistant)" },
                { value: "en", label: "English" },
                { value: "it", label: "Italiano" },
                { value: "es", label: "Español" },
                { value: "fr", label: "Français" },
                { value: "de", label: "Deutsch" },
                { value: "pt", label: "Português" },
              ],
            },
          },
        },
        {
          name: "border_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "state", label: "State color" },
                { value: "neutral", label: "Neutral" },
              ],
            },
          },
        },
        {
          name: "hvac_button_labels",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "auto", label: "Automatic" },
                { value: "show", label: "Always show" },
                { value: "hide", label: "Icons only" },
              ],
            },
          },
        },
        {
          name: "preset_button_labels",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "auto", label: "Automatic" },
                { value: "show", label: "Always show" },
                { value: "hide", label: "Icons only" },
              ],
            },
          },
        },
        {
          name: "temperature_step",
          selector: {
            number: { min: 0.1, max: 5, step: 0.1, mode: "box" },
          },
        },
      ],
      computeLabel: (schema: { name?: string }) =>
        ({
          entity: "Climate entity",
          name: "Custom name",
          show_presets: "Show presets",
          show_consumption: "Show power consumption",
          power_entity: "Power sensor",
          status_entity: "Advanced status sensor",
          language: "Language",
          border_mode: "Card border",
          hvac_button_labels: "HVAC button labels",
          preset_button_labels: "Preset button labels",
          temperature_step: "Temperature step",
        })[schema.name ?? ""] ?? schema.name,
      computeHelper: (schema: { name?: string }) =>
        schema.name === "power_entity"
          ? "Used only when the power module is enabled."
          : schema.name === "status_entity"
            ? "Optional. Replaces ON, IDLE and OFF inside the LCD."
            : undefined,
    };
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
  ): Omit<ThermoMatrixConfig, "type"> {
    const suggested =
      entities.find((entityId) => entityId.startsWith("climate.")) ??
      Object.keys(hass.states).find((entityId) =>
        entityId.startsWith("climate."),
      ) ??
      "";

    return {
      entity: suggested,
      show_presets: true,
      show_consumption: false,
      border_mode: "state",
      language: "auto",
      hvac_button_labels: "auto",
      preset_button_labels: "auto",
    };
  }

  public setConfig(config: ThermoMatrixConfig): void {
    if (!config?.entity) {
      throw new Error("ThermoMatrix Card requires a climate entity.");
    }
    if (!config.entity.startsWith("climate.")) {
      throw new Error("The configured entity must use the climate domain.");
    }

    this._config = {
      ...config,
      show_presets: config.show_presets ?? true,
      show_consumption: config.show_consumption ?? false,
      border_mode: config.border_mode ?? "state",
      language: config.language ?? "auto",
      hvac_button_labels: config.hvac_button_labels ?? "auto",
      preset_button_labels: config.preset_button_labels ?? "auto",
    };
  }

  protected firstUpdated(): void {
    this._labelResizeObserver = new ResizeObserver(() =>
      this._scheduleLabelSync(),
    );
    this._labelResizeObserver.observe(this);
    this._scheduleLabelSync();
  }

  protected updated(_changedProperties: PropertyValues): void {
    this._scheduleLabelSync();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._labelResizeObserver?.disconnect();
    if (this._labelSyncFrame !== undefined) {
      cancelAnimationFrame(this._labelSyncFrame);
    }
  }

  public getCardSize(): number {
    return this._config?.show_consumption ? 9 : 8;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html`<ha-card><div class="warning">${this._t("loading")}</div></ha-card>`;
    }

    const climate = this.hass.states[this._config.entity];
    if (!climate) {
      return html`<ha-card>
        <div class="warning">
          ${this._config.entity}: ${this._t("unavailable")}
        </div>
      </ha-card>`;
    }

    const mode = climate.state;
    const modeColor = MODE_META[mode]?.color ?? "#94a3b8";
    const dynamicBorder = this._config.border_mode === "state";
    const shadow =
      dynamicBorder && mode !== "off"
        ? `0 0 18px color-mix(in srgb, ${modeColor} 58%, transparent)`
        : "0 4px 14px rgba(0,0,0,0.10)";

    return html`
      <ha-card
        style=${`--tm-border-color:${
          dynamicBorder ? modeColor : "var(--tm-neutral-border)"
        };--tm-card-shadow:${shadow};`}
      >
        <div class="layout">
          ${this._renderModes(climate)} ${this._renderDisplay(climate)}
          ${this._renderTemperatureControls(climate)}
          ${this._renderPresets(climate)}
          ${this._renderConsumption()}
          <div class="brand">
            ${this._config.name ??
            (climate.attributes.friendly_name as string | undefined) ??
            "ThermoMatrix"}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderModes(climate: HassEntity): TemplateResult {
    const modes = this._stringArray(climate.attributes.hvac_modes);
    const visibleModes = modes.length > 0 ? modes : [climate.state];

    return html`
      <div
        class="button-grid button-grid-modes label-${this._config
          .hvac_button_labels ?? "auto"}"
        style=${`--columns:${Math.min(visibleModes.length, 5)}`}
      >
        ${visibleModes.map((mode) => {
          const meta = MODE_META[mode] ?? {
            icon: "mdi:radiobox-blank",
            color: "#64748b",
          };
          const label = this._translateValue(mode);
          return html`
            <button
              class="mode-button ${climate.state === mode ? "active" : ""}"
              style=${`--button-color:${meta.color}`}
              title=${label}
              aria-label=${label}
              @click=${() => this._setHvacMode(mode)}
            >
              <ha-icon class="mode-icon" icon=${meta.icon}></ha-icon>
              <span class="button-label">${label}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderDisplay(climate: HassEntity): TemplateResult {
    const mode = climate.state;
    const action = String(climate.attributes.hvac_action ?? "");
    const status = mode === "off"
      ? "OFF"
      : action === "idle"
        ? "IDLE"
        : WORKING_ACTIONS.has(action)
          ? "ON"
          : "ON";
    const externalStatus = this._config.status_entity
      ? this.hass.states[this._config.status_entity]
      : undefined;
    const dark = this.hass.themes?.darkMode === true;
    const backgrounds = dark
      ? {
          heat: "#9a3412",
          cool: "#172554",
          dry: "#065f46",
          fan_only: "#155e75",
          off: "#374151",
        }
      : {
          heat: "#fed7aa",
          cool: "#bfdbfe",
          dry: "#a7f3d0",
          fan_only: "#a5f3fc",
          off: "#d1d5db",
        };
    const background =
      backgrounds[mode as keyof typeof backgrounds] ??
      (dark ? "#334155" : "#cbd5e1");

    return html`
      <div
        class="lcd-panel ${dark ? "dark" : ""}"
        style=${`--lcd-background:${background}`}
      >
        <div class="lcd-values ${this._config.status_entity ? "external" : ""}">
          <div class="lcd-reading current">
            <span class="lcd-reading-label">${this._t("environment")}</span>
            ${this._renderTemperature(climate.attributes.current_temperature)}
          </div>
          ${!this._config.status_entity
            ? html`
                ${this._renderStatusWheel(status)}
              `
            : nothing}
          <div class="lcd-reading target">
            <span class="lcd-reading-label">${this._t("target")}</span>
            ${this._renderTemperature(climate.attributes.temperature)}
          </div>
        </div>
        ${this._config.status_entity
          ? html`
              <div
                class="lcd-external-status"
                title=${externalStatus
                  ? this._humanize(externalStatus.state)
                  : this._t("unavailable")}
              >
                ${this._renderExternalStatus(
                  externalStatus
                    ? this._humanize(externalStatus.state).toUpperCase()
                    : this._t("unavailable").toUpperCase(),
                )}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private _renderTemperature(value: unknown): TemplateResult {
    const numeric = Number(value);
    const formatted = Number.isFinite(numeric) ? numeric.toFixed(1) : "--";

    return html`
      <span class="lcd-display">
        ${[...formatted].map((character) =>
          character === "."
            ? html`<i class="lcd-dot"></i>`
            : this._renderDigit(character),
        )}
        <i class="lcd-degree"></i>
      </span>
    `;
  }

  private _renderDigit(value: string): TemplateResult {
    const active = SEGMENTS[value] ?? "";
    return html`
      <span class="lcd-digit">
        ${[..."abcdefg"].map(
          (segment) =>
            html`<i
              class="lcd-segment ${segment} ${active.includes(segment)
                ? "on"
                : ""}"
            ></i>`,
        )}
      </span>
    `;
  }

  private _renderStatusWheel(status: string): TemplateResult {
    const padded = status === "IDLE"
      ? status
      : status === "OFF"
        ? "OFF "
        : " ON ";

    return html`
      <div class="status-wheel" role="status" aria-label=${status}>
        ${[...padded].map((character, index) =>
          keyed(
            `${status}-${index}`,
            this._renderWheelReel(character, index),
          ),
        )}
      </div>
    `;
  }

  private _renderWheelReel(character: string, index: number): TemplateResult {
    const wheelIndex = Math.max(0, WHEEL_CHARACTERS.indexOf(character));
    return html`
      <span class="wheel-window" aria-hidden="true">
        <span
          class="wheel-strip"
          style=${`--wheel-offset:${6 - wheelIndex * 14}px;--wheel-delay:${
            index * 55
          }ms`}
        >
          ${WHEEL_CHARACTERS.map(
            (wheelCharacter) =>
              html`<i class=${wheelCharacter === character ? "selected" : ""}>
                ${wheelCharacter === " " ? "\u00a0" : wheelCharacter}
              </i>`,
          )}
        </span>
      </span>
    `;
  }

  private _renderExternalStatus(value: string): unknown {
    return keyed(
      value,
      html`<span class="external-status-slide">
        ${this._renderMatrixWord(value)}
      </span>`,
    );
  }

  private _renderMatrixChar(value: string): TemplateResult {
    const pattern = (LETTERS[value] ?? Array(7).fill("00000")).join("");
    return html`
      <span class="matrix-char">
        ${[...pattern].map(
          (pixel) =>
            html`<i class="matrix-pixel ${pixel === "1" ? "on" : ""}"></i>`,
        )}
      </span>
    `;
  }

  private _renderTemperatureControls(climate: HassEntity): TemplateResult {
    return html`
      <div class="temperature-controls">
        <button title="Diminuisci temperatura" @click=${() => this._step(climate, -1)}>
          −
        </button>
        <button title="Aumenta temperatura" @click=${() => this._step(climate, 1)}>
          +
        </button>
      </div>
    `;
  }

  private _renderPresets(climate: HassEntity): TemplateResult | typeof nothing {
    if (!this._config.show_presets) {
      return nothing;
    }

    const presets = this._stringArray(climate.attributes.preset_modes);
    if (presets.length === 0) {
      return nothing;
    }

    const activePreset = String(climate.attributes.preset_mode ?? "");
    return html`
      <div
        class="button-grid button-grid-presets label-${this._config
          .preset_button_labels ?? "auto"}"
        style=${`--columns:${Math.min(presets.length, 5)}`}
      >
        ${presets.map((preset) => {
          const meta = PRESET_META[preset] ?? {
            icon: "mdi:bookmark-outline",
            color: "#64748b",
          };
          const label = this._translateValue(preset);
          return html`
            <button
              class=${activePreset === preset ? "active" : ""}
              style=${`--button-color:${meta.color}`}
              title=${label}
              aria-label=${label}
              @click=${() => this._setPreset(preset)}
            >
              <ha-icon class="preset-icon" icon=${meta.icon}></ha-icon>
              <span class="button-label">${label}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderConsumption(): TemplateResult | typeof nothing {
    if (!this._config.show_consumption || !this._config.power_entity) {
      return nothing;
    }

    const power = this.hass.states[this._config.power_entity];
    const numeric = Number(power?.state);
    const active = Number.isFinite(numeric) && numeric > 20;
    const unit = String(power?.attributes.unit_of_measurement ?? "");
    const displayPower = Number.isFinite(numeric) ? numeric : 0;
    const ratio = Math.min(1, Math.max(0, (displayPower - 20) / 1480));
    const hue = Math.round(120 * (1 - ratio));
    const dark = this.hass.themes?.darkMode === true;
    const background =
      displayPower <= 20
        ? dark
          ? "#374151"
          : "#d1d5db"
        : dark
          ? `hsl(${hue} 62% 28%)`
          : `hsl(${hue} 72% 78%)`;

    return html`
      <div
        class="consumption ${active ? "active" : ""} ${dark ? "dark" : ""}"
        style=${`--consumption-background:${background}`}
      >
        <span class="consumption-icon">⚡</span>
        <span class="consumption-label">
          ${this._renderMatrixWord(this._t("consumption").toUpperCase())}
        </span>
        <span class="consumption-value">
          ${power
            ? html`${this._renderLcdNumber(power.state)}
                <span class="consumption-unit">${unit}</span>`
            : html`<span class="unavailable">${this._t("unavailable")}</span>`}
        </span>
      </div>
    `;
  }

  private _renderLcdNumber(value: unknown): TemplateResult {
    const numeric = Number(value);
    const formatted = Number.isFinite(numeric)
      ? String(Math.round(numeric * 10) / 10)
      : "--";

    return html`
      <span class="lcd-display lcd-number">
        ${[...formatted].map((character) =>
          character === "."
            ? html`<i class="lcd-dot"></i>`
            : this._renderDigit(character),
        )}
      </span>
    `;
  }

  private _renderMatrixWord(value: string): TemplateResult {
    return html`
      <span class="matrix-word">
        ${[...value].map((character) =>
          character === " "
            ? html`<span class="matrix-space"></span>`
            : this._renderMatrixChar(character),
        )}
      </span>
    `;
  }

  private async _setHvacMode(hvacMode: string): Promise<void> {
    await this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this._config.entity,
      hvac_mode: hvacMode,
    });
  }

  private async _setPreset(presetMode: string): Promise<void> {
    await this.hass.callService("climate", "set_preset_mode", {
      entity_id: this._config.entity,
      preset_mode: presetMode,
    });
  }

  private async _step(climate: HassEntity, direction: -1 | 1): Promise<void> {
    const target = Number(climate.attributes.temperature);
    if (!Number.isFinite(target)) {
      return;
    }

    const configuredStep = Number(this._config.temperature_step);
    const entityStep = Number(climate.attributes.target_temp_step);
    const step = Number.isFinite(configuredStep)
      ? configuredStep
      : Number.isFinite(entityStep)
        ? entityStep
        : 0.5;
    const temperature = Math.round((target + direction * step) * 10) / 10;

    await this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature,
    });
  }

  private _stringArray(value: unknown): string[] {
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  }

  private _humanize(value: string): string {
    return value
      .replaceAll("_", " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }

  private _language(): Language {
    const configured = this._config.language ?? "auto";
    const requested =
      configured === "auto"
        ? String(this.hass.locale?.language ?? "en").toLowerCase().split("-")[0]
        : configured;
    return requested in TRANSLATIONS ? (requested as Language) : "en";
  }

  private _t(key: TranslationKey): string {
    return TRANSLATIONS[this._language()][key] ?? TRANSLATIONS.en[key];
  }

  private _translateValue(value: string): string {
    return value in TRANSLATIONS.en
      ? this._t(value as TranslationKey)
      : this._humanize(value);
  }

  private _scheduleLabelSync(): void {
    if (this._labelSyncFrame !== undefined) {
      cancelAnimationFrame(this._labelSyncFrame);
    }
    this._labelSyncFrame = requestAnimationFrame(() => {
      this._labelSyncFrame = undefined;
      this._syncAutoLabels();
    });
  }

  private _syncAutoLabels(): void {
    this.renderRoot
      .querySelectorAll<HTMLElement>(".button-grid.label-auto")
      .forEach((grid) => {
        const buttons = [...grid.querySelectorAll<HTMLButtonElement>("button")];
        const compact = buttons.some((button) => {
          const label = button.querySelector<HTMLElement>(".button-label");
          if (!label) {
            return false;
          }
          const availableWidth = button.getBoundingClientRect().width - 20;
          return label.scrollWidth > availableWidth;
        });
        grid.classList.toggle("labels-compact", compact);
      });
  }
}

if (!customElements.get("thermomatrix-card")) {
  customElements.define("thermomatrix-card", ThermoMatrixCard);
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "thermomatrix-card",
  name: "ThermoMatrix Card",
  description: "Termostato LCD modulare per entità climate",
  preview: true,
  getEntitySuggestion: (_hass: HomeAssistant, entityId: string) =>
    entityId.startsWith("climate.")
      ? {
          entity: entityId,
          show_presets: true,
          border_mode: "state",
        }
      : null,
});

console.info(
  `%c THERMOMATRIX-CARD %c v${VERSION} `,
  "color:white;background:#172554;font-weight:700",
  "color:#172554;background:#bfdbfe",
);
