import { html, LitElement, nothing, type TemplateResult } from "lit";
import { thermoMatrixStyles } from "./styles";
import type {
  HassEntity,
  HomeAssistant,
  ThermoMatrixConfig,
} from "./types";

const VERSION = "0.1.0";
const WORKING_ACTIONS = new Set(["heating", "cooling", "drying", "fan"]);

const MODE_META: Record<string, { label: string; icon: string; color: string }> =
  {
    off: { label: "Spento", icon: "⏻", color: "#94a3b8" },
    heat: { label: "Caldo", icon: "♨", color: "#f97316" },
    cool: { label: "Freddo", icon: "❄", color: "#1d4ed8" },
    dry: { label: "Dry", icon: "◉", color: "#10b981" },
    fan_only: { label: "Ventola", icon: "✣", color: "#0891b2" },
    auto: { label: "Auto", icon: "A", color: "#8b5cf6" },
    heat_cool: { label: "Auto", icon: "↕", color: "#8b5cf6" },
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
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
};

const PRESET_META: Record<string, { label: string; color: string }> = {
  none: { label: "Manuale", color: "#c026d3" },
  home: { label: "Home", color: "#1d4ed8" },
  away: { label: "Away", color: "#94a3b8" },
  sleep: { label: "Sleep", color: "#8b5cf6" },
  comfort: { label: "Comfort", color: "#10b981" },
  eco: { label: "Eco", color: "#16a34a" },
};

export class ThermoMatrixCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static styles = thermoMatrixStyles;

  public hass!: HomeAssistant;
  private _config!: ThermoMatrixConfig;

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
          name: "border_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "state", label: "Colorato secondo lo stato" },
                { value: "neutral", label: "Neutro" },
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
          entity: "Climatizzatore",
          name: "Nome personalizzato",
          show_presets: "Mostra preset",
          show_consumption: "Mostra consumo",
          power_entity: "Sensore di consumo",
          border_mode: "Bordo della card",
          temperature_step: "Incremento temperatura",
        })[schema.name ?? ""] ?? schema.name,
      computeHelper: (schema: { name?: string }) =>
        schema.name === "power_entity"
          ? "Usato soltanto quando il modulo consumo è attivo."
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
    };
  }

  public setConfig(config: ThermoMatrixConfig): void {
    if (!config?.entity) {
      throw new Error("ThermoMatrix Card richiede un'entità climate.");
    }
    if (!config.entity.startsWith("climate.")) {
      throw new Error("L'entità configurata deve appartenere al dominio climate.");
    }

    this._config = {
      ...config,
      show_presets: config.show_presets ?? true,
      show_consumption: config.show_consumption ?? false,
      border_mode: config.border_mode ?? "state",
    };
  }

  public getCardSize(): number {
    return this._config?.show_consumption ? 9 : 8;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html`<ha-card><div class="warning">Caricamento…</div></ha-card>`;
    }

    const climate = this.hass.states[this._config.entity];
    if (!climate) {
      return html`<ha-card>
        <div class="warning">
          Entità ${this._config.entity} non disponibile
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
        class="button-grid"
        style=${`--columns:${Math.min(visibleModes.length, 5)}`}
      >
        ${visibleModes.map((mode) => {
          const meta = MODE_META[mode] ?? {
            label: this._humanize(mode),
            icon: "●",
            color: "#64748b",
          };
          return html`
            <button
              class="mode-button ${climate.state === mode ? "active" : ""}"
              style=${`--button-color:${meta.color}`}
              title=${`Imposta ${meta.label}`}
              @click=${() => this._setHvacMode(mode)}
            >
              <span class="mode-icon">${meta.icon}</span>
              ${meta.label}
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderDisplay(climate: HassEntity): TemplateResult {
    const mode = climate.state;
    const action = String(climate.attributes.hvac_action ?? "");
    const isOn = WORKING_ACTIONS.has(action);
    const isIdle = mode !== "off" && action === "idle";
    const isOff = mode === "off";
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
        <div class="lcd-values">
          <div class="lcd-reading current">
            <span class="lcd-reading-label">AMBIENTE</span>
            ${this._renderTemperature(climate.attributes.current_temperature)}
          </div>
          <div class="status-stack">
            ${this._renderStatus("ON", isOn, true)}
            ${this._renderStatus("IDLE", isIdle, true)}
            ${this._renderStatus("OFF", isOff, false)}
          </div>
          <div class="lcd-reading target">
            <span class="lcd-reading-label">TARGET</span>
            ${this._renderTemperature(climate.attributes.temperature)}
          </div>
        </div>
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

  private _renderStatus(
    label: string,
    active: boolean,
    blink: boolean,
  ): TemplateResult {
    return html`
      <span class="status-box ${active ? "active" : ""} ${active && blink
        ? "blink"
        : ""}">
        <span class="matrix-word">
          ${[...label].map((character) => this._renderMatrixChar(character))}
        </span>
      </span>
    `;
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
        class="button-grid"
        style=${`--columns:${Math.min(presets.length, 5)}`}
      >
        ${presets.map((preset) => {
          const meta = PRESET_META[preset] ?? {
            label: this._humanize(preset),
            color: "#64748b",
          };
          return html`
            <button
              class=${activePreset === preset ? "active" : ""}
              style=${`--button-color:${meta.color}`}
              @click=${() => this._setPreset(preset)}
            >
              ${meta.label}
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
    const active = Number.isFinite(numeric) && numeric > 5;
    const unit = String(power?.attributes.unit_of_measurement ?? "");

    return html`
      <div class="consumption ${active ? "active" : ""}">
        <span>⚡</span>
        <span>Consumo attuale</span>
        <span>${power ? `${power.state} ${unit}`.trim() : "Non disponibile"}</span>
      </div>
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
