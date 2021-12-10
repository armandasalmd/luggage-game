import { FC, useState } from "react";
import { Navbar, PopMenu } from "@components/molecules";
import { PillButton } from "@components/atoms";

import PersonIcon from "@material-ui/icons/Person";
import TollIcon from "@material-ui/icons/Toll";
import FlagIcon from "@material-ui/icons/Flag";
import MoreIcon from "@material-ui/icons/MoreVert";
import GlobalUtils from "@utils/Global";

export interface GameNavbarProps {
  onSurrender?(): void;
  gamePrice: number;
  name: string;
}

const GameNavbar: FC<GameNavbarProps> = (props) => {
  const [moreOpen, setMoreOpen] = useState(false);

  function toggleMore() {
    setMoreOpen(!moreOpen);
  }

  function onSurrender() {
    GlobalUtils.callIfFunction(props.onSurrender);
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
