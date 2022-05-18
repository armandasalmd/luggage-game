import { FC, useRef } from "react";
import classNames from "classnames";
import { create } from "canvas-confetti";

import "./DailyReward.scss";
import TollIcon from "@material-ui/icons/Toll";
import { RewardItem } from "@utils/interfaces";

interface DailyRewardProps extends RewardItem {
  onClick?(): void;
}

const DailyReward: FC<DailyRewardProps> = (props) => {
  const containerRef = useRef(null);
  const classes = classNames("dailyReward", {
    "dailyReward--primary": props.state === "available",
    "dailyReward--gold": props.state === "claimed",
    "dailyReward--select": typeof props.onClick === "function"
  });

  let label = "";
  if (props.state === "claimed") {
    label = "Claimed";
  } else if (props.state === "available") {
    label = "Claim";
  } else {
    label = `Day ${props.day}`;
  }

  function onClick() {
    if (typeof props.onClick === "function") {
      fireConfetti();
      props.onClick();
    }
  }

  function fireConfetti() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";

    if (containerRef.current) {
      const container: HTMLElement = containerRef.current as HTMLElement;
      container.appendChild(canvas);

      const confetti = create(canvas, { resize: true });

      confetti({
        spread: 30,
        particleCount: 30,
        startVelocity: 28,
        origin: { y: 1.2 }
      });

      setTimeout(() => {
        confetti.reset();
        container.removeChild(canvas);
      }, 2500);
    }
  }

  return (
    <div className={classes} onClick={onClick} ref={containerRef}>
      <div className="dailyReward__main">
        <TollIcon />
        <p>{props.reward}</p>
      </div>
      <p>{label}</p>
    </div>
  );
};

export default DailyReward;
