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
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
  ): Promise<unknown>;
}

export type BorderMode = "state" | "neutral";

export interface ThermoMatrixConfig {
  type: string;
  entity: string;
  name?: string;
  show_presets?: boolean;
  show_consumption?: boolean;
  power_entity?: string;
  border_mode?: BorderMode;
  temperature_step?: number;
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}
