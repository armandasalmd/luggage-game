import { FC, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { createRipples } from "react-ripples";

import "./LuggageController.scss";
import { RootState } from "@redux/store";
import { MiniCardLuggage, LuggageModal } from "@components/molecules";
import { toLuggageModel } from "@utils/game/Player";
import CardTravelIcon from "@material-ui/icons/CardTravel";

const Ripple = createRipples({
  during: 600,
  color: "rgba(0, 0, 0, .15)",
  className: "defaultBorderRadius luggageController__button",
});

const LuggageController: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const luggageCards = useSelector(
    (state: RootState) => state.game.myState.luggageCards
  );

  const classes = classNames("luggageController", {
    "luggageController--active": false,
  });

  const luggage = toLuggageModel(luggageCards);

  function openModal() {
    setModalOpen(!modalOpen);
  }

  if (!luggage) {
    return <div className={classes}>Luggage loading...</div>;
  }

  return (
    <div className={classes}>
      <div className="luggageController__mini">
        <p>Luggage |</p>
        <MiniCardLuggage luggage={luggage} />
      </div>
      <Ripple onClick={openModal}>
        <CardTravelIcon />
      </Ripple>
      <LuggageModal
        isOpen={modalOpen}
        onClose={setModalOpen}
        username="armandelis"
        luggage={luggage}
      />
    </div>
  );
};

export default LuggageController;
