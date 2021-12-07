import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Checkbox, Select, Input, message } from "@components/atoms";
import "./DashboardCreateJoinTab.scss";

import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import * as DValues from "./dropdownValues";

const DashboardCreateJoinTab = () => {
  const history = useHistory();
  const [gameIsPrivate, setGameIsPrivate] = useState(false);

  function onPlayersCountChange(id: string | number, item: any) {
    console.log("Players count changed", id, item);
  }

  function onGamePriceChange(id: string | number, item: any) {
    console.log("Game price changed", id, item);
  }

  function onRulesChange(id: string | number, item: any) {
    console.log("Game rules changed", id, item);
  }

  function onCreateGame() {
    const ROOM_ID = "hh6t3a56";
    
    history.push("/lobby/" + ROOM_ID);
  }

  function onJoinGame() {
    message.information("This feature is not implemented yet");
  }

  return (
    <div className="createJoinTab">
      <div className="createJoinTab__cards">
        <Card padded title="Create game">
          <div className="createJoinTab__container">
            <div className="createJoinTab__flexRow">
              <Select
                title="Players count"
                items={DValues.playersDropdown}
                idKey="key"
                textKey="value"
                placeholder="Select count"
                defaultSelectedId={2}
                onSelectChange={onPlayersCountChange}
                maxWidth="15rem"
              />
              <Select
                title="Game price"
                items={DValues.priceDropdown}
                idKey="key"
                textKey="value"
                placeholder="Select one value"
                defaultSelectedId={2}
                onSelectChange={onGamePriceChange}
                maxWidth="15rem"
              />
              <Checkbox
                title="Game is private"
                value={gameIsPrivate}
                onCheck={setGameIsPrivate}
              />
            </div>
            <div className="createJoinTab__flexRow">
              <Select
                title="Game rules mode"
                items={DValues.gameRulesDropdown}
                idKey="key"
                textKey="value"
                defaultSelectedId={1}
                onSelectChange={onRulesChange}
              />
            </div>
            <div className="createJoinTab__flexRow" style={{ marginTop: 16 }}>
              <Button onClick={onCreateGame} icon={<PlayCircleOutline />} type="ghost">
                Start game
              </Button>
            </div>
          </div>
        </Card>
        <Card padded title="Join existing game">
          <div className="createJoinTab__container">
            <Input
              placeholder="Room code"
              title="Existing room code"
              maxWidth="15rem"
            />
            <div className="createJoinTab__flexRow" style={{ marginTop: 16 }}>
              <Button icon={<PlayCircleOutline />} type="ghost" onClick={onJoinGame}>
                Join game
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCreateJoinTab;
