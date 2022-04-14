import { FC, useState } from "react";
import "./SettingsInGameTab.scss";

import { Checkbox, Select } from "@components/atoms";
import { GameTheme } from "@utils/game/Game";
import { ID } from "@utils/Types";

const gameThemeSelect = [
  {
    key: GameTheme.Light,
    value: "Light theme",
  },
  {
    key: GameTheme.DarkBlue,
    value: "Dark blue theme",
  },
];

const SettingsInGameTab: FC = () => {
  const [gameTheme, setGameTheme] = useState<ID>(GameTheme.DarkBlue);
  const [sound, setSound] = useState(true);
  const [autoCompl, setAutoCompl] = useState(true);

  return (
    <div className="settings__inGame" style={{ color: "#123123 " }}>
      <h3>Game settings</h3>
      <div className="settings__options">
        <Select
          idKey="key"
          textKey="value"
          items={gameThemeSelect}
          defaultSelectedId={gameTheme}
          onChange={setGameTheme}
          title="Game color theme"
        />
        <Checkbox value={sound} onCheck={setSound} title="Enable card sound" />
        <Checkbox
          value={autoCompl}
          onCheck={setAutoCompl}
          title="Enable turn auto complete"
        />
      </div>
    </div>
  );
};

export default SettingsInGameTab;
