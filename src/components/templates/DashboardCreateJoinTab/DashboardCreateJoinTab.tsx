import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  Checkbox,
  Select,
  Input,
  message,
} from "@components/atoms";
import { useDispatch } from "react-redux";
import "./DashboardCreateJoinTab.scss";

import RouteUtils from "@utils/Route";
import { setLobbyState } from "@redux/actions";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import * as DValues from "./dropdownValues";

const DashboardCreateJoinTab = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [playerCount, setPlayerCount] = useState("2");
  const [gamePrice, setGamePrice] = useState("0");
  const [gameRules, setGameRules] = useState("classic");
  const [gameIsPrivate, setGameIsPrivate] = useState(false);

  function onPlayersCountChange(id: string, item: any) {
    setPlayerCount(id);
  }

  function onGamePriceChange(id: string, item: any) {
    setGamePrice(id);
  }

  function onRulesChange(id: string, item: any) {
    setGameRules(id);
  }

  async function onCreateGame() {
    const route = RouteUtils.routes.api.lobby.create;
    const options = {
      playerCount: parseInt(playerCount),
      gamePrice: parseInt(gamePrice),
      isPrivate: gameIsPrivate,
      gameRules,
    };

    try {
      const { data } = await RouteUtils.sendApiRequest(route, options);
      const { errorMessage, ...rest } = data;

      if (errorMessage) {
        message.error(data.errorMessage);
      } else {
        dispatch(setLobbyState({...rest, ...options}));
        history.push("/lobby/" + data.roomCode);
      }
    } catch {
      message.error("Cannot create room");
    }
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
                defaultSelectedId={playerCount}
                onChange={onPlayersCountChange}
                maxWidth="15rem"
              />
              <Select
                title="Game price"
                items={DValues.priceDropdown}
                idKey="key"
                textKey="value"
                placeholder="Select one value"
                defaultSelectedId={gamePrice}
                onChange={onGamePriceChange}
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
                defaultSelectedId={gameRules}
                onChange={onRulesChange}
              />
            </div>
            <div className="createJoinTab__flexRow" style={{ marginTop: 16 }}>
              <Button
                onClick={onCreateGame}
                icon={<PlayCircleOutline />}
                type="ghost"
              >
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
              <Button
                icon={<PlayCircleOutline />}
                type="ghost"
                onClick={onJoinGame}
              >
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
