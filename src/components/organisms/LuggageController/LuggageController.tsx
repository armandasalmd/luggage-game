import { FC, useState } from "react";
import classNames from "classnames";
import { createRipples } from "react-ripples";
import "./LuggageController.scss";
import { MiniCardLuggage, LuggageModal } from "@components/molecules";
import { randomCard } from "@utils/game/Card";
import { ILuggage } from "@utils/game/Player";
import CardTravelIcon from "@material-ui/icons/CardTravel";

const Ripple = createRipples({
  during: 600,
  color: "rgba(0, 0, 0, .15)",
  className: "defaultBorderRadius luggageController__button"
});

const LuggageController: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const classes = classNames("luggageController", {
    "luggageController--active": false
  });

  const luggage: ILuggage = {
    downOne: randomCard(),
    downTwo: randomCard(),
    downThree: randomCard(),
    upTwo: randomCard(),
    upThree: randomCard(),
  };

  function openModal() {
    setModalOpen(!modalOpen);
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
      <LuggageModal isOpen={modalOpen} onClose={setModalOpen} username="armandelis" luggage={luggage}  />
    </div>
  );
};

export default LuggageController;
