import { FC } from "react";
// Default
import { ReactComponent as happy } from "./happy-450464.svg";
import { ReactComponent as kiss } from "./kiss-450472.svg";
import { ReactComponent as angry } from "./angry-450433.svg";
import { ReactComponent as attitude } from "./attitude-450436.svg";
import { ReactComponent as cry } from "./cry-450443.svg";
import { ReactComponent as emoji } from "./emoji-450456.svg";
import { ReactComponent as disappoint } from "./disappoint-450452.svg";
import { ReactComponent as laugh } from "./laugh-450473.svg";
import { ReactComponent as pinocchio } from "./pinocchio-450480.svg";
import { ReactComponent as sad } from "./sad-450493.svg";
import { ReactComponent as rolling } from "./rolling-450486.svg";
import { ReactComponent as scream } from "./scream-450404.svg";
import { ReactComponent as wink } from "./wink-450406.svg";
import { ReactComponent as wink2 } from "./wink-450419.svg";
import { ReactComponent as wow } from "./wow-450424.svg";
// Premium
import { ReactComponent as alien } from "./alien-450426.svg";
import { ReactComponent as blush } from "./blush-450438.svg";
import { ReactComponent as pooper } from "./pooper-450481.svg";
import { ReactComponent as silence } from "./silence-450409.svg";
import { ReactComponent as joker } from "./joker-450469.svg";
import { ReactComponent as emoji2 } from "./emoji-450454.svg";
import { ReactComponent as bad } from "./bad-450437.svg";
import { ReactComponent as amazed } from "./amazed-450430.svg";
import { ReactComponent as sleeping } from "./sleeping-450411.svg";
import { ReactComponent as swag } from "./swag-450413.svg";

interface IIcons {
  [key: string]: FC;
}

export const icons: IIcons = {
  "happy-450464": happy,
  "kiss-450472": kiss,
  "angry-450433": angry,
  "attitude-450436": attitude,
  "cry-450443": cry,
  "emoji-450456": emoji,
  "disappoint-450452": disappoint,
  "laugh-450473": laugh,
  "pinocchio-450480": pinocchio,
  "sad-450493": sad,
  "rolling-450486": rolling,
  "scream-450404": scream,
  "wink-450406": wink,
  "wink-450419": wink2,
  "wow-450424": wow,
  "alien-450426": alien,
  "blush-450438": blush,
  "pooper-450481": pooper,
  "silence-450409": silence,
  "joker-450469": joker,
  "emoji-450454": emoji2,
  "bad-450437": bad,
  "amazed-450430": amazed,
  "sleeping-450411": sleeping,
  "swag-450413": swag,
};

export function getIconComponent(name: string): FC {
  if (icons.hasOwnProperty(name)) {
    return icons[name];
  } else {
    return Object.values(icons)[0];
  }
}