import { FC, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import GlobalUtils from "@utils/Global";

interface GamePileProps {
  className: string;
  destroying: boolean;
  setDestroying: (destroying: boolean) => void;
}

const from = () => ({ x: 0, y: 0, rotateZ: 0, rotateY: 0 });
const to = (target: Element, finished: Element) => {
  const randRot = (Math.random() - 0.5) * 20;

  if (GlobalUtils.isSmallScreen()) {
    return {
      x: (window.innerWidth + target.clientWidth) * 0.5,
      rotateZ: randRot,
      rotateY: 180
    };
  } else {
    return { 
      x: finished.clientWidth / -2 - 16, 
      y: -(target.getBoundingClientRect().top + (0.5 * finished.clientHeight)),
      rotateZ: 90 + randRot, 
      rotateY: 180 
    };
  }
};

export const GamePile: FC<GamePileProps> = (props) => {
  const [styles, api] = useSpring(from);

  function destroyDeck() {
    const target = document.querySelector(".playground__targetDropzone")! as HTMLElement;
    const finished = document.querySelector(".playground__finishedDropzone")!;

    api.start({
      to: to(target, finished),
      onRest: () => {
        target.childNodes.forEach(node => {
          const frontElem = node.firstChild as HTMLElement;
          const backElem = node.lastChild as HTMLElement;
          backElem.style.transform = frontElem.style.transform + " rotateY(180deg)";
        });

        while (target.lastChild) {
          finished.appendChild(target.lastChild);
        }

        api.start({
          to: from(),
          immediate: true,
        });
      },
      config: { friction: 40 }
    })[0]?.then(() => {
      props.setDestroying(false);
    });
  }

  useEffect(() => {
    if (props.destroying) destroyDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.destroying]);

  return <div className={props.className}>
    <img className="playground__source" src="/assets/default_back.svg" alt="source"  />
    <div className="playground__target">
      <p className="playground__targetText">Empty</p>
      <animated.div className="playground__targetDropzone" style={styles}></animated.div>
    </div>
    <div className="playground__finished">
      <div className="playground__finishedDropzone"></div>
    </div>
  </div>
}