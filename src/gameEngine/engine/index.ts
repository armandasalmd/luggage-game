import { GameRulesType } from "../Enums";
import { BaseEngine } from "./BaseEngine";
import { ClassicEngine } from "./ClassicEngine";

export function getEngine(rules: GameRulesType): BaseEngine {
  switch (rules) {
    case GameRulesType.Classic:
    default:
      return new ClassicEngine();
  }
}
