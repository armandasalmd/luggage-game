import { FC, useEffect } from "react";
import classNames from "classnames";
import "./TimedAvatar.scss";
import GlobalUtils from "@utils/Global";

interface TimedAvatarProps {
  running: boolean;
  onFinish?(): void;
  avatarUrl?: string;
}

const TimedAvatar: FC<TimedAvatarProps> = (props) => {
  const classes = classNames("timedAvatar", {
    "timedAvatar--running": props.running,
  });

  useEffect(() => {
    var timer: any;
    
    if (props.running === true) {
      timer = setTimeout(() => {
        GlobalUtils.callIfFunction(props.onFinish);
      }, 30000);
    }

    return () => {
      clearTimeout(timer);
    }
  }, [props]);

  const svg = (
    <svg>
      <rect
        x="2"
        y="2"
        rx="6"
        ry="6"
        width="60"
        height="60"
      />
    </svg>
  );

  return (
    <div className={classes}>
      <img alt="avatar" {...GlobalUtils.avatarImageProps(props.avatarUrl)} />
      {props.running && svg}
    </div>
  );
};

export default TimedAvatar;
