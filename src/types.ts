export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  themes?: {
    darkMode?: boolean;
  };
  locale?: {
    language?: string;
  };
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
  ): Promise<unknown>;
}

export type BorderMode = "state" | "neutral";
export type ButtonLabelMode = "auto" | "show" | "hide";

export interface ThermoMatrixConfig {
  type: string;
  entity: string;
  name?: string;
  show_presets?: boolean;
  show_consumption?: boolean;
  power_entity?: string;
  status_entity?: string;
  language?: "auto" | "en" | "it" | "es" | "fr" | "de" | "pt";
  border_mode?: BorderMode;
  hvac_button_labels?: ButtonLabelMode;
  preset_button_labels?: ButtonLabelMode;
  temperature_step?: number;
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}
