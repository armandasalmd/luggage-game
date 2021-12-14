import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./GameLayout.scss";
import { RewardAnimation, message } from "@components/atoms";
import { GameNavbar, GameActionBar } from "@components/organisms";
import { GameNavbarProps } from "@components/organisms/GameNavbar/GameNavbar";
import { Playground } from "@components/templates";
import { onGameFinishedListener } from "@socket/game";
import { IPlayerReward } from "@utils/game/IPlayerReward";
import { RootState } from "@redux/store";
import RouteUtils from "@utils/Route";
import { addCoins } from "@redux/actions";
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
    onGameFinishedListener(function (rewards: IPlayerReward[]) {
      const reward = rewards.find((item) => item.username === username);

      if (reward && reward.reward > 0) {
        setReward(reward.reward);
        dispatch(addCoins(reward.reward));
      } else if (reward?.reward === 0) {
        message.success("Game finished win no rewards");
        setTimeout(exitGame, 4000);
      }
    });

    return () => {
      SocketManager.getInstance().removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  function exitGame() {
    history.push(RouteUtils.routes.app.main.dashboard.path);
  }

  return (
    <div className="gameLayout">
      <GameNavbar {...rest} />
      <Playground />
      <GameActionBar />
      <RewardAnimation reward={reward} afterAnimation={exitGame} />
    </div>
  );
};

export default GameLayout;
