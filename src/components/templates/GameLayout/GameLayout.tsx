import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./GameLayout.scss";
import { RewardAnimation, message } from "@components/atoms";
import { GameNavbar, GameActionBar } from "@components/organisms";
import { GameNavbarProps } from "@components/organisms/GameNavbar/GameNavbar";
import { Playground } from "@components/templates";
import { gameFinishedListener, gameRewardListener } from "@socket/game";
import { IPlayerReward } from "@utils/game/IPlayerReward";
import { RootState } from "@redux/store";
import RouteUtils from "@utils/Route";
import {
  addCoins,
  setReward as setReduxReward,
  clearGameState,
} from "@redux/actions";
import SocketManager from "@socket/SocketManager";

interface GameLayoutProps extends GameNavbarProps {
  gameId: string;
}

const GameLayout: FC<GameLayoutProps> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.user.user);
  const { gameId, ...rest } = props;
  const [reward, setReward] = useState(0);

  useEffect(() => {
    gameFinishedListener(function (rewards: IPlayerReward[]) {
      const reward = rewards.find((item) => item.username === username);

      if (reward && reward.reward > 0) {
        setReward(reward.reward);
        dispatch(addCoins(reward.reward));
      } else if (reward?.reward === 0) {
        message.success("Game finished win no rewards");
        setTimeout(exitGame, 4000);
      }
    });

    gameRewardListener(function (reward: number) {
      if (reward > 0) {
        setReward(reward);
        dispatch(addCoins(reward));
        dispatch(setReduxReward(reward));
      }
    });

    return () => {
      SocketManager.getInstance().removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  function exitGame() {
    history.replace(RouteUtils.routes.app.main.dashboard.path);
    dispatch(clearGameState());
  }

  return (
    <div className="gameLayout">
      <GameNavbar {...rest} />
      <Playground />
      <GameActionBar />
      <RewardAnimation reward={reward} afterAnimation={() => setReward(0)} />
    </div>
  );
};

export default GameLayout;
