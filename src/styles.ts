import { css } from "lit";

export const thermoMatrixStyles = css`
  :host {
    display: block;
    --tm-heat: #f97316;
    --tm-cool: #1d4ed8;
    --tm-dry: #10b981;
    --tm-fan: #0891b2;
    --tm-off: #94a3b8;
    --tm-neutral-border: rgba(156, 163, 175, 0.45);
    color: var(--primary-text-color);
  }

  ha-card {
    min-height: 420px;
    padding: 18px 20px;
    overflow: hidden;
    border: 2px solid var(--tm-border-color, var(--tm-neutral-border));
    border-radius: 18px;
    box-shadow: var(--tm-card-shadow, 0 4px 14px rgba(0, 0, 0, 0.1));
    box-sizing: border-box;
    background: var(--ha-card-background, var(--card-background-color));
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .layout {
    display: grid;
    gap: 10px;
  }

  .button-grid {
    display: grid;
    grid-template-columns: repeat(var(--columns, 1), minmax(0, 1fr));
    gap: 8px;
  }

  button {
    min-width: 0;
    min-height: 50px;
    padding: 7px 8px;
    border: 2px solid var(--tm-neutral-border);
    border-radius: 14px;
    box-sizing: border-box;
    color: var(--primary-text-color);
    background: transparent;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease,
      box-shadow 0.2s ease, transform 0.1s ease;
  }

  button:active {
    transform: scale(0.97);
  }

  button.active {
    border-color: var(--button-color);
    background: color-mix(in srgb, var(--button-color) 38%, transparent);
    box-shadow: 0 0 15px
      color-mix(in srgb, var(--button-color) 55%, transparent);
  }

  .mode-button {
    min-height: 58px;
  }

  .mode-icon {
    display: block;
    margin-bottom: 3px;
    font-size: 20px;
    line-height: 1;
  }

  .lcd-panel {
    width: 100%;
    padding: 14px;
    border: 2px solid color-mix(in srgb, currentColor 34%, transparent);
    border-radius: 14px;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2),
      0 3px 10px rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    color: #111827;
    background: var(--lcd-background);
    transition: background 0.3s ease, color 0.3s ease;
  }

  .lcd-panel.dark {
    color: #f8fafc;
  }

  .lcd-values {
    display: grid;
    grid-template-columns: minmax(0, 1.12fr) 54px minmax(0, 0.66fr);
    gap: 8px;
    align-items: center;
  }

  .lcd-values.external {
    grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.66fr);
    gap: 18px;
  }

  .lcd-reading {
    min-width: 0;
  }

  .lcd-reading.current {
    font-size: clamp(44px, 13vw, 54px);
    text-align: left;
  }

  .lcd-reading.target {
    font-size: clamp(26px, 7.2vw, 30px);
    text-align: right;
  }

  .lcd-reading-label {
    display: block;
    margin-bottom: 7px;
    font: 700 10px/1 sans-serif;
    letter-spacing: 0.06em;
    opacity: 0.68;
  }

  .lcd-display {
    display: inline-flex;
    align-items: flex-end;
    gap: 0.055em;
    height: 1em;
  }

  .lcd-digit {
    position: relative;
    display: inline-block;
    width: 0.58em;
    height: 1em;
  }

  .lcd-segment {
    position: absolute;
    display: block;
    border-radius: 0.035em;
    background: currentColor;
    opacity: 0.1;
  }

  .lcd-segment.on {
    opacity: 1;
  }

  .lcd-segment.a,
  .lcd-segment.d,
  .lcd-segment.g {
    left: 0.105em;
    width: 0.37em;
    height: 0.105em;
    clip-path: polygon(
      9% 0,
      91% 0,
      100% 50%,
      91% 100%,
      9% 100%,
      0 50%
    );
  }

  .lcd-segment.a {
    top: 0.02em;
  }
  .lcd-segment.g {
    top: 0.462em;
  }
  .lcd-segment.d {
    bottom: 0.02em;
  }

  .lcd-segment.b,
  .lcd-segment.c,
  .lcd-segment.e,
  .lcd-segment.f {
    width: 0.105em;
    height: 0.35em;
    clip-path: polygon(
      50% 0,
      100% 9%,
      100% 91%,
      50% 100%,
      0 91%,
      0 9%
    );
  }

  .lcd-segment.b {
    top: 0.09em;
    right: 0.025em;
  }
  .lcd-segment.c {
    right: 0.025em;
    bottom: 0.09em;
  }
  .lcd-segment.e {
    bottom: 0.09em;
    left: 0.025em;
  }
  .lcd-segment.f {
    top: 0.09em;
    left: 0.025em;
  }

  .lcd-dot {
    width: 0.1em;
    height: 0.1em;
    margin: 0 0.015em 0.02em;
    border-radius: 50%;
    background: currentColor;
  }

  .lcd-degree {
    width: 0.2em;
    height: 0.2em;
    margin: 0 0 0.75em 0.015em;
    border: 0.045em solid currentColor;
    border-radius: 50%;
    box-sizing: border-box;
  }

  .status-stack {
    position: relative;
    left: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .lcd-external-status {
    display: flex;
    width: 100%;
    min-height: 28px;
    margin-top: 9px;
    padding-top: 7px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-top: 1px solid color-mix(in srgb, currentColor 28%, transparent);
    box-sizing: border-box;
    text-align: center;
  }

  .lcd-external-status .matrix-word {
    max-width: 100%;
    justify-content: center;
    gap: 1.4px;
    --matrix-pixel-size: 1.05px;
    --matrix-pixel-gap: 0.42px;
  }

  .status-box {
    width: 50px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid currentColor;
    border-radius: 3px;
    box-sizing: border-box;
    opacity: 0.24;
  }

  .status-box.active {
    background: color-mix(in srgb, currentColor 13%, transparent);
    box-shadow: inset 0 0 0 1px currentColor,
      0 0 8px color-mix(in srgb, currentColor 42%, transparent);
    opacity: 1;
  }

  .status-box.active.blink .matrix-word {
    animation: status-text-blink 1.15s ease-in-out infinite;
  }

  @keyframes status-text-blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.22;
    }
  }

  .matrix-word {
    display: inline-flex;
    gap: 2px;
  }

  .matrix-char {
    display: grid;
    grid-template-columns: repeat(5, var(--matrix-pixel-size, 1.4px));
    grid-template-rows: repeat(7, var(--matrix-pixel-size, 1.4px));
    gap: var(--matrix-pixel-gap, 0.55px);
  }

  .matrix-pixel {
    width: var(--matrix-pixel-size, 1.4px);
    height: var(--matrix-pixel-size, 1.4px);
    border-radius: 0.3px;
    background: currentColor;
    opacity: 0.1;
  }

  .matrix-pixel.on {
    opacity: 1;
  }

  .temperature-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .temperature-controls button {
    min-height: 30px;
    padding: 2px 8px;
    border-width: 1px;
    border-radius: 10px;
    background: color-mix(
      in srgb,
      var(--primary-text-color) 8%,
      transparent
    );
    box-shadow: none;
    font-size: 19px;
    line-height: 1;
  }

  .consumption {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 10px;
    align-items: center;
    min-height: 58px;
    padding: 7px 14px;
    border: 2px solid var(--tm-neutral-border);
    border-radius: 14px;
    box-sizing: border-box;
    color: #111827;
    background: var(--consumption-background);
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.18),
      0 3px 10px rgba(0, 0, 0, 0.1);
    transition: background 0.35s ease, border-color 0.35s ease;
  }

  .consumption.active {
    border-color: color-mix(in srgb, currentColor 34%, transparent);
  }

  .consumption.dark {
    color: #f8fafc;
  }

  .consumption-icon {
    font-size: 18px;
  }

  .consumption-label {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    opacity: 0.72;
  }

  .preset-icon {
    display: block;
    margin-bottom: 3px;
    font-size: 17px;
    line-height: 1;
  }

  .consumption-value {
    display: inline-flex;
    align-items: flex-end;
    gap: 6px;
    font-size: 29px;
    line-height: 1;
  }

  .consumption-unit {
    padding-bottom: 2px;
    font: 800 11px/1 Arial, sans-serif;
    letter-spacing: 0.06em;
  }

  .unavailable {
    font: 700 11px/1.2 Arial, sans-serif;
  }

  .lcd-number {
    font-size: 29px;
  }

  .matrix-space {
    display: inline-block;
    width: 4px;
  }

  .brand {
    margin-top: 4px;
    overflow: hidden;
    color: var(--secondary-text-color);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.16em;
    line-height: 1.2;
    text-align: center;
    text-overflow: ellipsis;
    text-shadow: 0 -1px 0 var(--ha-card-background),
      0 1px 0 color-mix(in srgb, var(--primary-text-color) 28%, transparent);
    text-transform: uppercase;
    white-space: nowrap;
  }

  .warning {
    padding: 16px;
    color: var(--error-color, #db4437);
    text-align: center;
  }
`;
