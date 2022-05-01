import { FC, useState } from "react";

import { PillButton } from "@components/atoms";
import { Navbar, PopMenu } from "@components/molecules";

import FlagIcon from "@material-ui/icons/Flag";
import MoreIcon from "@material-ui/icons/MoreVert";
import PersonIcon from "@material-ui/icons/Person";
import TollIcon from "@material-ui/icons/Toll";

export interface GameNavbarProps {
  gamePrice: number;
  name: string;
  onSurrender?(): void;
}

export const GameNavbar: FC<GameNavbarProps> = (props) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const toggleMore = () => setMoreOpen(!moreOpen);
  const menuItems = [
    {
      id: 0, text: `Player ${props.name}`
    },
    {
      id: 1, text: `Looser loose ${props.gamePrice} coins`
    }
  ];

  return (
    <Navbar withLock onCollapse={() => setMoreOpen(false)}>
      <PillButton
        prefix={<FlagIcon />}
        colorType="secondary"
        onClick={props.onSurrender}
      >
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