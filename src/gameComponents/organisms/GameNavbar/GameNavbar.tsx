import { FC, useState } from "react";

import { PillButton } from "@components/atoms";
import { Navbar, PopMenu } from "@components/molecules";

import FlagIcon from "@material-ui/icons/Flag";
import MoreIcon from "@material-ui/icons/MoreVert";
import PersonIcon from "@material-ui/icons/Person";
import TollIcon from "@material-ui/icons/Toll";

export interface GameNavbarProps {
  canSurrender: boolean;
  coins: number;
  gamePrice: number;
  gameRules: string;
  name: string;
  onSurrender?(): void;
}

export const GameNavbar: FC<GameNavbarProps> = (props) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const toggleMore = () => setMoreOpen(!moreOpen);
  const menuItems = [
    {
      id: 0,
      text: `Player ${props.name}`,
    },
    {
      id: 1,
      text: `Your balance ${props.coins > 0 ? props.coins : "unknown"}`,
    },
    {
      id: 2,
      text: `Looser pays ${props.gamePrice}`,
    },
    {
      id: 3,
      text: `Game rules ${props.gameRules}`,
    },
    {
      id: 4,
      text: `Reconnect (refresh)`,
    },
  ];

  return (
    <Navbar withLock onCollapse={() => setMoreOpen(false)}>
      {props.canSurrender && (
        <PillButton
          prefix={<FlagIcon />}
          colorType="secondary"
          onClick={props.onSurrender}
        >
          Surrender
        </PillButton>
      )}
      <PillButton
        prefix={<TollIcon />}
        colorType="secondary"
        clickable={false}
        hideOnSmall
      >
        {`Bet ${props.gamePrice}`}
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
        width={266}
        isOpen={moreOpen}
        items={menuItems}
        idKey="id"
        textKey="text"
        colorType="secondary"
        disabled
        onSelectChange={(id: number) => {
          if (id === 4) window.location.reload();
        }}
        onOutsideClick={() => setMoreOpen(false)}
      />
    </Navbar>
  );
};
