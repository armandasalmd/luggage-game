import { FC, createElement } from "react";
import { getIconComponent } from "./IconComponents";
import GlobalUtils from "@utils/Global";

interface EmojiSvgProps {
  animating?: boolean;
  onAnimationEnd?(): void;
  name: string;
}

export const EmojiSvg: FC<EmojiSvgProps> = (props) => {
  if (props.animating) {
    setTimeout(() => GlobalUtils.callIfFunction(props.onAnimationEnd), 3000);
  }

  return createElement(
    getIconComponent(props.name),
    props.animating ? ({ className: "emoji--animating" } as any) : {}
  );
};
