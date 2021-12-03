import { FC } from "react";
import { Modal } from "@components/atoms";
import { MiniCardLuggage } from "..";
import { ILuggage } from "@utils/game/Player";

interface LuggageModalProps {
  username: string;
  luggage: ILuggage;
  isOpen: boolean;
  onClose?(state: boolean): void;
}

const LuggageModal: FC<LuggageModalProps> = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      flyInAnimation
      title={`${props.username}'s luggage`}
    >
      <MiniCardLuggage luggage={props.luggage} />
    </Modal>
  );
};

export default LuggageModal;
