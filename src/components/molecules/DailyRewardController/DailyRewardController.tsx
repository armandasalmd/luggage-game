import { FC } from "react";

import "./DailyRewardController.scss";
import { Button, DailyReward } from "@components/atoms";
import { RewardItem } from "@utils/game/Reward";
import TollIcon from "@material-ui/icons/Toll";
import GlobalUtils from "@utils/Global";

interface DailyRewardControllerProps {
  items: RewardItem[];
  onClaim?(): void;
}

const DailyRewardController: FC<DailyRewardControllerProps> = (props) => {
  const onClaim = () => GlobalUtils.callIfFunction(props.onClaim);

  const cards = props.items.map(function (item) {
    const onClick = item.state === "available" ? onClaim : undefined;

    return <DailyReward {...item} key={item.day} onClick={onClick} />;
  });

  const canClaim = !!props.items.find((item) => item.state === "available");
  const buttonType = canClaim ? "ghost" : "disabled";

  return (
    <div className="rewardController">
      <p className="rewardController__description">
        Claim free coin rewards for streak login every day
      </p>
      <div className="rewardController__cards">{cards}</div>
      <div className="rewardController__buttons">
        <Button type={buttonType} icon={<TollIcon />} onClick={onClaim}>
          Claim reward
        </Button>
      </div>
    </div>
  );
};

export default DailyRewardController;
