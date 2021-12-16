import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRipples } from "react-ripples";
import classNames from "classnames";

import "./LuggageController.scss";
import { RootState } from "@redux/store";
import { message } from "@components/atoms";
import { MiniCardLuggage, LuggageModal } from "@components/molecules";
import { toLuggageModel } from "@utils/game/Player";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import { ACard, cardToString } from "@utils/game/Card";
import { takeLuggageAsync } from "@socket/game";
import { setLuggageUsed } from "@redux/actions";
import ClassicEngine from "@utils/game/ClassicEngine";

const Ripple = createRipples({
  during: 600,
  color: "rgba(0, 0, 0, .15)",
  className: "defaultBorderRadius luggageController__button",
});

interface LuggageControllerProps {
  luggageTime: boolean;
  gameId: string;
}

const LuggageController: FC<LuggageControllerProps> = (props) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { username } = useSelector((state: RootState) => state.user.user);
  const { luggageCards } = useSelector(
    (state: RootState) => state.game.myState
  );
  const { luggageUsed } = useSelector((state: RootState) => state.game);
  const classes = classNames("luggageController", {
    "luggageController--active": false,
  });

  const luggage = toLuggageModel(luggageCards);

  function openModal() {
    setModalOpen(!modalOpen);
  }

  function takeLuggageCard(card: ACard) {
    takeLuggageAsync(props.gameId, cardToString(card))
      .then(function (result) {
        if (!result || !result.success) {
          message.error(result.message || "Unexpected error");
        } else {
          if (
            !ClassicEngine.instance.canPutMoreAfterMove(cardToString(card), 1)
          ) {
            dispatch(setLuggageUsed(true));
          }
        }
      })
      .catch(() => {
        message.error("Unexpected error");
      });
  }

  if (!luggage) {
    return <div className={classes}>Luggage loading...</div>;
  }

  const onClick =
    props.luggageTime && !luggageUsed ? takeLuggageCard : undefined;

  return (
    <div className={classes}>
      <div className="luggageController__mini">
        <p>Luggage |</p>
        <MiniCardLuggage luggage={luggage} onClick={onClick} />
      </div>
      <Ripple onClick={openModal}>
        <CardTravelIcon />
      </Ripple>
      <LuggageModal
        isOpen={modalOpen}
        onClose={setModalOpen}
        username={username}
        luggage={luggage}
        onClick={onClick}
      />
    </div>
  );
};

export default LuggageController;
