import { FC, useEffect } from "react";
import { fireConfetti } from "@utils/game/Game";
import "./RewardAnimation.scss";
import GlobalUtils from "@utils/Global";

interface RewardAnimationProps {
  reward?: number;
  afterAnimation?(): void;
};

const RewardAnimation: FC<RewardAnimationProps> = (props) => {
  useEffect(() => {
    if (props.reward) {
      fireConfetti();

      setTimeout(() => {
        GlobalUtils.callIfFunction(props.afterAnimation);
      }, 4000);
    }
  });
  
  if (!props.reward) {
    return null;
  }

  return (
    <div className="rewardAnimation">
      <p className="rewardAnimation__text">You won {props.reward} coins</p>
    </div>
  )
};

export default RewardAnimation;