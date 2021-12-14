import { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Navbar, PopMenu } from "@components/molecules";
import { message, PillButton } from "@components/atoms";
import PersonIcon from "@material-ui/icons/Person";
import TollIcon from "@material-ui/icons/Toll";
import FlagIcon from "@material-ui/icons/Flag";
import MoreIcon from "@material-ui/icons/MoreVert";
import GlobalUtils from "@utils/Global";
import { useSurrender } from "@hooks/useSurrender";
import RouteUtils from "@utils/Route";
import { addCoins } from "@redux/actions";

export interface GameNavbarProps {
  gamePrice: number;
  name: string;
}

const GameNavbar: FC<GameNavbarProps> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loss, surrender] = useSurrender();
  const [moreOpen, setMoreOpen] = useState(false);

  function toggleMore() {
    setMoreOpen(!moreOpen);
  }

  function onSurrender() {
    GlobalUtils.callIfFunction(surrender);
  }

  const menuItems = [
    {
      id: 0,
      text: `Player ${props.name}`,
    },
    {
      id: 1,
      text: `Game price ${props.gamePrice} coins`,
    },
  ];

  useEffect(() => {
    if (loss > 0) {
      message.information("You lost " + loss + " coins");
      dispatch(addCoins(-loss));
    } else if (loss === 0) {
      message.success("Game finished with no rewards");
    }
    
    if (loss >= 0) {
      setTimeout(() => {
        history.push(RouteUtils.routes.app.main.dashboard.path);
      }, 4000);
    }
  }, [loss, history, dispatch]);

  return (
    <Navbar>
      <PillButton prefix={<FlagIcon />} colorType="secondary" onClick={onSurrender}>
        Surrender
      </PillButton>
      <PillButton
        prefix={<TollIcon />}
        colorType="secondary"
        clickable={false}
        hideOnSmall
      >
        {`Price ${props.gamePrice}`}
      </PillButton>
      <PillButton
        prefix={<PersonIcon />}
        colorType="secondary"
        textEllipsis
        clickable={false}
        hideOnSmall
      >
        {props.name}
      </PillButton>
      <PillButton
        prefix={<MoreIcon />}
        colorType="secondary"
        showOnSmall
        onClick={toggleMore}
      />
      <PopMenu
        isOpen={moreOpen}
        items={menuItems}
        idKey="id"
        textKey="text"
        colorType="secondary"
        disabled
        onOutsideClick={() => setMoreOpen(false)}
      />
    </Navbar>
  );
};

export default GameNavbar;
