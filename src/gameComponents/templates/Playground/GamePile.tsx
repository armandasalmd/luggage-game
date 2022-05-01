import { FC, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { AnimatedCard } from "../../atoms";
import {
  Card,
  ISpringTransform,
  IThrow,
  randomCard,
  moveCardElementsToPile,
} from "@engine/index";
import { destroyFrom, destroyTo, throwFrom, throwTo } from "@engine/index";

interface GamePileProps {
  className: string;
  destroying: boolean;
  setDestroying: (destroying: boolean) => void;
}

export const GamePile: FC<GamePileProps> = (props) => {
  const [styles, api] = useSpring(destroyFrom);

  const [throwQueue, setThrowQueue] = useState<IThrow[]>([]);
  const [throwCard, setThrowCard] = useState<Card>();
  const [throwStyle, throwApi] = useSpring<ISpringTransform>(throwTo);

  function destroyDeck() {
    const target = document.querySelector(
      ".playground__targetDropzone"
    )! as HTMLElement;
    const finished = document.querySelector(".playground__finishedDropzone")!;

    api
      .start({
        to: destroyTo(target, finished),
        onRest: () => {
          target.childNodes.forEach((node) => {
            const frontElem = node.firstChild as HTMLElement;
            const backElem = node.lastChild as HTMLElement;
            backElem.style.transform =
              frontElem.style.transform + " rotateY(180deg)";
          });

          while (target.lastChild) {
            finished.appendChild(target.lastChild);
          }

          api.start({
            to: destroyFrom(),
            immediate: true,
          });
        },
        config: { friction: 30 },
      })[0]
      ?.then(() => {
        props.setDestroying(false);
      });
  }

  function postPlayerThrow(card: Card) {
    if (card && moveCardElementsToPile([card])) {
      setThrowCard(undefined);
    }
  }

  function startPlayerThrow(playerIndex: number, card: Card): Promise<void> {
    return new Promise((resolve) => {
      setThrowCard(card);
      
      throwApi.start({
        from: throwFrom(playerIndex),
        to: throwTo(),
        config: { friction: 25 },
        onRest: () => {
          postPlayerThrow(card);
          resolve();
        },
      });
    });
  }

  async function _tempAsync() {
    // TODO: To start throw, all you need to do is to set throwQueue like below
    setThrowQueue([
      {
        playerIndex: 2,
        card: randomCard(),
      },
      {
        playerIndex: 3,
        card: randomCard(),
      }
    ]);
  }

  useEffect(() => {
    if (props.destroying) destroyDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.destroying]);

  useEffect(() => {
    async function animate() {
      for (const m of throwQueue) {
        await startPlayerThrow(m.playerIndex, m.card);
      }
      setThrowQueue([]);
    }

    if (throwQueue.length > 0) animate();
  }, [throwQueue]);

  return (
    <div className={props.className}>
      <div
        className="playground__source"
        onClick={_tempAsync}
      >
        <p className="playground__sourceText">
          12 <span>cards</span>
        </p>
        <img
          className="playground__sourceImg"
          src="/assets/default_back.svg"
          alt="source"
        />
      </div>
      <div className="playground__target">
        <p className="playground__targetText">Empty</p>
        <animated.div
          className="playground__targetDropzone"
          style={styles}
        ></animated.div>
        <div className="playground__targetHelper">
          {throwCard && (
            <AnimatedCard card={throwCard} transform={throwStyle} />
          )}
        </div>
      </div>
      <div className="playground__finished">
        <div className="playground__finishedDropzone"></div>
      </div>
    </div>
  );
};
