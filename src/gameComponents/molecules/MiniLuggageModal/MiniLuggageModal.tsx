import { FC, useEffect } from "react";

import "./MiniLuggageModal.scss";
import GlobalUtils from "@utils/Global";
import { ILuggage } from "@engine/index";
import { MiniLuggage } from "..";

interface MiniLuggageModalProps {
  avatar?: string;
  username?: string;
  luggage?: ILuggage;
}

export const MiniLuggageModal: FC<MiniLuggageModalProps> = (props) => {

  useEffect(() => {
    const coverElem: any = document.querySelector("#screen-cover");

    if (coverElem) {
      coverElem.style.display = "block";
      coverElem.classList.add("screenCoverDarkMode");
    }
    return () => {
      if (coverElem) {
        coverElem.style.display = "none";
        coverElem.classList.remove("screenCoverDarkMode");
      }
    }
  }, []);

  if (!props.luggage) return null;

  return <div className="luggageModal">
    <div className="luggageModal__card">
      <div className="luggageModal__person">
        <img alt="avatar" {...GlobalUtils.avatarImageProps(props.avatar)} />
        <p>{props.username}</p>
      </div>
      <MiniLuggage luggage={props.luggage} />
    </div>
  </div>
};
