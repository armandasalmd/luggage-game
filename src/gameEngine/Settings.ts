import { GameTheme } from "./Enums";
import { ISettings } from "./interfaces";

const DEFAULT_SETTINGS: ISettings = {
  autoComplete: true,
  cardSound: true,
  gameTheme: GameTheme.DarkBlue,
};
const SETTINGS_KEY = "settings";
type SettingKeys = keyof ISettings;

export function getSettings(): ISettings {
  try {
    const s: ISettings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    return { ...DEFAULT_SETTINGS, ...s };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function setSettings(s: ISettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

export function setGameTheme(theme: GameTheme) {
  setSetting("gameTheme", theme);
}

export function setCardSound(enabled: boolean) {
  setSetting("cardSound", enabled);
}

export function setAutoComplete(enabled: boolean) {
  setSetting("autoComplete", enabled);
}

function setSetting(key: SettingKeys, value: any) {
  const s = getSettings();
  s[key] = value as never;
  setSettings(s);
}