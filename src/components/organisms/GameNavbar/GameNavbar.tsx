import { FC } from "react";
import { Navbar } from "@components/molecules";
import { PillButton } from "@components/atoms";

import PersonIcon from "@material-ui/icons/Person";
import TollIcon from "@material-ui/icons/Toll";
import FlagIcon from "@material-ui/icons/Flag";

export interface GameNavbarProps {
  onSurrender?(): void;
  gamePrice: number;
  name: string;
}

const GameNavbar: FC<GameNavbarProps> = (props) => {
  return (
    <Navbar>
      <PillButton prefix={<FlagIcon />} colorType="secondary">
        Surrender
      </PillButton>
      <PillButton prefix={<TollIcon />} colorType="secondary" clickable={false}>
        {props.gamePrice}
      </PillButton>
      <PillButton prefix={<PersonIcon />} colorType="secondary" textEllipsis clickable={false}>
        {props.name}
      </PillButton>
    </Navbar>
  );
};

export default GameNavbar;
