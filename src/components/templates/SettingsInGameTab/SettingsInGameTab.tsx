import { FC, useState } from "react";
import "./SettingsInGameTab.scss";

import { Checkbox, Select } from "@components/atoms";
import { ID } from "@utils/Types";
import { Settings, GameTheme } from "@engine/index";

const gameThemeSelect = [
  {
    key: GameTheme.Light,
    value: "Light theme",
  },
  {
    key: GameTheme.DarkBlue,
    value: "Dark blue theme",
  },
  {
    key: GameTheme.DarkGreen,
    value: "Dark green theme",
  },
];

const SettingsInGameTab: FC = () => {
  const s = Settings.getSettings();
  const [gameTheme, setGameTheme] = useState<ID>(s.gameTheme);
  const [sound, setSound] = useState(s.cardSound);
  const [premiumEmojis, setPremiumEmojis] = useState(s.premiumEmojis);
  const [autoCompl, setAutoCompl] = useState(s.autoComplete);

  return (
    <div className="settings__inGame" style={{ color: "#123123 " }}>
      <h3>Game settings</h3>
      <div className="settings__options">
        <Select
          idKey="key"
          textKey="value"
          items={gameThemeSelect}
          defaultSelectedId={gameTheme}
          onChange={(id: ID) => { setGameTheme(id); Settings.setGameTheme(id as GameTheme); }}
          title="Game color theme"
        />
        <Checkbox value={sound} onCheck={(val) => { setSound(val); Settings.setCardSound(val); }} title="Card sound" />
        <Checkbox value={premiumEmojis} onCheck={(val) => { setPremiumEmojis(val); Settings.setPremiumEmojis(val); }} title="Premium emojis" />
        <Checkbox
          value={autoCompl}
          onCheck={(val) => { setAutoCompl(val); Settings.setAutoComplete(val); }}
          title="Auto complete turn"
        />
      </div>
    </div>
  );
};

export default SettingsInGameTab;
