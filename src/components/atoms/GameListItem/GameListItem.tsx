import { FC } from "react";
import { createRipples } from "react-ripples";

import "./GameListItem.scss";
import TollIcon from "@material-ui/icons/Toll";
import PersonIcon from "@material-ui/icons/Person";
import GlobalUtils from "@utils/Global";
import { priceDropdown } from "@components/templates/PlayGameTab/dropdownValues";
import { getGameRulesTitle } from "@utils/game/Game";

export interface IPublicGame {
  modeTitle: string;
  price: number;
  players: number;
  playersMax: number;
  roomId: string;
}

export interface GameListItemProps {
  game: IPublicGame;
  onClick?(game: IPublicGame): void;
}

const GameListItem: FC<GameListItemProps> = (props) => {
  const { game } = props;

  const Ripple = createRipples({
    during: 600,
    color: "rgba(30, 136, 229, .15)",
    className: "fullWidth",
  });

  const priceLabel =
    priceDropdown.find((item) => item.key === props.game.price)?.value ??
    "Unknown";

  const title = getGameRulesTitle(game.modeTitle) + " (" + game.roomId + ")";

  return (
    <Ripple onClick={() => GlobalUtils.callIfFunction(props.onClick, game)}>
      <div className="gameListItem">
        <p className="gameListItem__text">{title}</p>
        <div className="gameListItem__wrapper">
          <div className="gameListItem__container gameListItem__container--gold">
            <TollIcon />
            <p className="gameListItem__text">{priceLabel}</p>
          </div>
          <div className="gameListItem__container">
            <PersonIcon />
            <p className="gameListItem__text">
              {game.players} / {game.playersMax}
            </p>
          </div>
        </div>
      </div>
    </Ripple>
  );
};

export default GameListItem;
