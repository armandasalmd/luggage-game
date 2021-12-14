import { useState, useEffect } from "react";
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
import GlobalUtils from "@utils/Global";
import { setLobbyState, addCoins } from "@redux/actions";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import FlagIcon from "@material-ui/icons/Flag";
import * as DValues from "./dropdownValues";
import { joinLobbyAsync } from "@socket/lobby";
import { useSurrender } from "@hooks/useSurrender";

const DashboardCreateJoinTab = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loss, surrender] = useSurrender();
  const [activeGameId, setActiveGameId] = useState("");
  const [playerCount, setPlayerCount] = useState("2");
  const [gamePrice, setGamePrice] = useState("250");
  const [gameRules, setGameRules] = useState("classic");
  const [gameIsPrivate, setGameIsPrivate] = useState(false);
  const [joinIdError, setJoinIdError] = useState("");
  const [joinId, setJoinId] = useState("");

  function onPlayersCountChange(id: string) {
    setPlayerCount(id);
  }

  function onGamePriceChange(id: string) {
    setGamePrice(id);
  }

  function onRulesChange(id: string) {
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
        message.warning(data.errorMessage);
      } else {
        joinLobbyAsync(data.roomCode).then((data) => {
          if (data.success) {
            dispatch(setLobbyState({...rest, ...options}));
            history.push("/lobby/" + data.lobbyState.roomCode);
          }
        });
      }
    } catch {
      message.error("Cannot create room");
    }
  }

  function onJoinGame() {
    if (joinId) {
      joinLobbyAsync(joinId.toLowerCase()).then((data) => {
        if (data.success) {
          dispatch(setLobbyState(data.lobbyState));
          history.push("/lobby/" + data.lobbyState.roomCode);
        } else {
          setJoinIdError(data.errorMessage.message);
        }
      });
    }
  }

  function onReconnect() {
    history.push("/play/" + activeGameId);
  }

  function onSurrender() {
    GlobalUtils.callIfFunction(surrender);
    setActiveGameId("");
    dispatch(addCoins(-loss));
  }

  useEffect(() => {
    async function fetchData() {
      const route = RouteUtils.routes.api.game.getActiveGameId;
  
      try {
        const { data } = await RouteUtils.sendApiRequest(route);
  
        if (data && data.success) setActiveGameId(data.roomId);
      } catch {
        console.warn("Cannot retrieve active game id");
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (loss > 0) {
      message.information("You lost " + loss + " coins");
    } else if (loss === 0) {
      message.success("Game finished with no rewards");
    }
  }, [loss]);

  if (activeGameId) {
    return (
      <div className="createJoinTab">
        <div className="createJoinTab__cards">
          <Card padded title={`Game ${activeGameId} is in progress`}>
          <div className="createJoinTab__flexRow">
            <Button
              icon={<FlagIcon />}
              type="danger"
              onClick={onSurrender}
            >
              Surrender
            </Button>
            <Button
              icon={<PlayCircleOutline />}
              type="accent"
              onClick={onReconnect}
              >
              Join running game
            </Button>
              </div>
          </Card>
        </div>
      </div>
    )
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
              value={joinId}
              setValue={setJoinId}
              error={joinIdError}
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
