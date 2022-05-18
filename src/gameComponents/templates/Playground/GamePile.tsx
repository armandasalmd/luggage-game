import { FC, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { AnimatedCard } from "../../atoms";
import {
  Card,
  ISpringTransform,
  IThrow,
  moveCardElementsToPile,
  getEngine,
  GameRulesType,
} from "@engine/index";
import { destroyFrom, destroyTo, throwFrom, throwTo } from "@engine/index";
import {
  clearPlayDeck,
  playerPushedCards,
  patchPublicPlayer,
} from "@redux/actions";
import { RootState } from "@redux/store";
import {
  playerPushedCardsListener,
  publicPlayerPatchListener,
} from "@socket/game";
import GlobalUtils from "@utils/Global";

interface GamePileProps {
  className: string;
  destroying: boolean;
  setDestroying: (destroying: boolean) => void;
}

export const GamePile: FC<GamePileProps> = (props) => {
  const dispatch = useDispatch();
  const [loadComplete, setLoadComplete] = useState(false);
  const [styles, api] = useSpring(destroyFrom);
  const [throwStyle, throwApi] = useSpring<ISpringTransform>(throwTo);
  const [throwQueue, setThrowQueue] = useState<IThrow[]>([]);
  const [throwCard, setThrowCard] = useState<Card>();
  const { deadCount, sourceDeckCount, topThreeCards } = useSelector(
    (state: RootState) => {
      const playDeck = state.game.gameDetails.playDeck;

      return {
        deadCount: state.game.gameDetails.deadCardsCount,
        sourceDeckCount: state.game.gameDetails.sourceDeckCount,
        topThreeCards: playDeck.slice(-3),
      };
    }
  );

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

  const startPlayerThrow = useCallback(
    (card: Card, seatId?: number): Promise<void> => {
      return new Promise((resolve) => {
        setThrowCard(card);

        throwApi.start({
          from: throwFrom(seatId),
          to: throwTo(),
          config: { friction: 25 },
          onRest: () => {
            postPlayerThrow(card);
            resolve();
          },
        });
      });
    },
    [throwApi]
  );

  const playerTakeHome = useCallback(
    (seatId?: number) => {
      const target = document.querySelector(".playground__targetDropzone");

      if (target) {
        const cardElem = target.lastChild as HTMLElement;
        const card = Card.fromId(cardElem.id);

        while (target.lastChild) target.removeChild(target.lastChild);
        // reusing existing throw player api, but opposite direcition
        if (card) {
          setThrowCard(card);

          throwApi.start({
            to: throwFrom(seatId),
            from: throwTo(),
            config: { friction: 25 },
            onRest: () => {
              setThrowCard(undefined);
              dispatch(clearPlayDeck());
            },
          });
        }
      }
    },
    [dispatch, throwApi]
  );

  useEffect(() => {
    if (props.destroying) {
      destroyDeck();
      dispatch(clearPlayDeck());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.destroying]);

  useEffect(() => {
    async function animate() {
      for (const m of throwQueue) {
        await startPlayerThrow(m.card, m.seatId);
      }
      setThrowQueue([]);
    }

    if (throwQueue.length > 0) animate();
  }, [throwQueue, startPlayerThrow]);

  useEffect(() => {
    if (!loadComplete && topThreeCards.length > 0) {
      const items: IThrow[] = topThreeCards.map((o) => ({
        card: Card.fromString(o),
      }));
      setThrowQueue(items);
    }
    setLoadComplete(true);
  }, [topThreeCards, loadComplete]);

  useEffect(() => {
    const cancel = playerPushedCardsListener((data) => {
      dispatch(playerPushedCards(data));
      setThrowQueue([
        ...throwQueue,
        ...data.cards.map((o) => ({
          card: Card.fromString(o),
          seatId: data.seatId,
        })),
      ]);

      if (getEngine(GameRulesType.Classic).shouldDestroy([], data.cards)) {
        props.setDestroying(true);
      }
    });
    const publicCancel = publicPlayerPatchListener((details) => {
      const { didTakeHome, ...rest } = details;

      if (didTakeHome) playerTakeHome(rest.seatId);
      dispatch(patchPublicPlayer(rest));
    });

    return () => {
      cancel();
      publicCancel();
    };
    // eslint-disable-next-line
  }, [playerTakeHome]);

  return (
    <div className={props.className}>
      {sourceDeckCount > 0 && (
        <div className="playground__source">
          <p className="playground__sourceText">
            {sourceDeckCount}
            <span>{GlobalUtils.pluralize(" card", sourceDeckCount)}</span>
          </p>
          <img
            className="playground__sourceImg"
            src="/assets/default_back.svg"
            alt="source"
          />
        </div>
      )}
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
        <div className="playground__finishedDropzone">
          {deadCount > 0 && (
            <div className="animatedCard">
              <div
                className="animatedCard__back"
                style={{ backgroundImage: "url(/assets/default_back.svg)" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
