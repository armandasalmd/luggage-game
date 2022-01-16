import classNames from "classnames";
import "./Friend.scss";
import { ColorType } from "@utils/Types";
import GlobalUtils from "@utils/Global";
import { FC } from "react";

type FriendActionType = "button" | "label";

export interface FriendAction {
  type: FriendActionType;
  text: string;
  color?: ColorType;
  onClick?(username: string): void;
}

interface FriendProps {
  avatar?: string;
  name: string;
  actions?: FriendAction[];
}

interface FriendActionProps extends FriendAction {
  name: string;
}

const FriendActionComponent = (props: FriendActionProps) => {
  const classes = classNames(
    "friend__action",
    "friend__action--" + props.type,
    {
      "friend__action--secondary": props.color === "secondary",
    }
  );

  return (
    <div
      className={classes}
      onClick={() => GlobalUtils.callIfFunction(props.onClick, props.name)}
    >
      {props.text}
    </div>
  );
};

const Friend: FC<FriendProps> = (props) => {
  return (
    <div className="friend">
      <img
        className="friend__avatar"
        alt="avatar"
        src={props.avatar || "/images/avatar.png"}
      />
      <p className="friend__name">{props.name}</p>
      <div className="friend__actions">
        {props.actions?.map((item, index) => (
          <FriendActionComponent {...item} name={props.name} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Friend;
