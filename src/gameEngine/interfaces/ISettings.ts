import { GameTheme } from "@engine/Enums";

export interface ISettings {
    gameTheme: GameTheme;
    cardSound: boolean;
    autoComplete: boolean;
    premiumEmojis: boolean;
}