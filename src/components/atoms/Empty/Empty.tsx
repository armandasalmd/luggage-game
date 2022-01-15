import { FC } from "react";
import "./Empty.scss";

interface EmptyProps {
  text?: string;
}

const Empty: FC<EmptyProps> = (props) => {
  return (
    <div className="empty">
      <img width={128} height={128} alt="no data" src="/images/no-data.svg" />
      <p className="empty__text">{props.text ? props.text : "Container is empty"}</p>
    </div>
  )
}

export default Empty;