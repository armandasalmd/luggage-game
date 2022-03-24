import { FC } from "react";
import classNames from "classnames";

import "./NotificationItem.scss";
import { INotification, LobbyMetaData } from "@utils/game/INotification";
import CoinIcon from "@material-ui/icons/Toll";
import PersonIcon from "@material-ui/icons/Person";
import { priceDropdown } from "@components/molecules/PriceSelect/PriceSelect";
import { ColorType } from "@utils/Types";
import GlobalUtils from "@utils/Global";
import Constants from "@utils/Constants";

const PlaySvg = () => {
  return (
    <svg
      width="29"
      height="13"
      viewBox="0 0 29 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.59091 0H22.4091C23.2746 0 24.1317 0.168127 24.9313 0.494783C25.731 0.821439 26.4575 1.30023 27.0696 1.90381C27.6816 2.50739 28.1671 3.22394 28.4983 4.01256C28.8295 4.80117 29 5.64641 29 6.5C29 7.35359 28.8295 8.19882 28.4983 8.98744C28.1671 9.77606 27.6816 10.4926 27.0696 11.0962C26.4575 11.6998 25.731 12.1786 24.9313 12.5052C24.1317 12.8319 23.2746 13 22.4091 13C20.2473 13 18.3359 11.973 17.1364 10.4H11.8636C10.6641 11.973 8.75273 13 6.59091 13C5.72538 13 4.86832 12.8319 4.06868 12.5052C3.26903 12.1786 2.54246 11.6998 1.93043 11.0962C0.694397 9.87721 0 8.22391 0 6.5C0 4.77609 0.694397 3.12279 1.93043 1.90381C3.16647 0.684819 4.84289 0 6.59091 0ZM24.7159 3.25C24.2789 3.25 23.8598 3.4212 23.5508 3.72595C23.2418 4.0307 23.0682 4.44402 23.0682 4.875C23.0682 5.0884 23.1108 5.29971 23.1936 5.49686C23.2764 5.69401 23.3978 5.87315 23.5508 6.02405C23.7038 6.17494 23.8854 6.29464 24.0854 6.3763C24.2853 6.45797 24.4995 6.5 24.7159 6.5C24.9323 6.5 25.1466 6.45797 25.3465 6.3763C25.5464 6.29464 25.728 6.17494 25.881 6.02405C26.034 5.87315 26.1554 5.69401 26.2382 5.49686C26.321 5.29971 26.3636 5.0884 26.3636 4.875C26.3636 4.44402 26.19 4.0307 25.881 3.72595C25.572 3.4212 25.1529 3.25 24.7159 3.25ZM21.4205 6.5C20.9835 6.5 20.5643 6.6712 20.2553 6.97595C19.9463 7.2807 19.7727 7.69402 19.7727 8.125C19.7727 8.55598 19.9463 8.9693 20.2553 9.27405C20.5643 9.57879 20.9835 9.75 21.4205 9.75C21.8575 9.75 22.2766 9.57879 22.5856 9.27405C22.8946 8.9693 23.0682 8.55598 23.0682 8.125C23.0682 7.69402 22.8946 7.2807 22.5856 6.97595C22.2766 6.6712 21.8575 6.5 21.4205 6.5ZM5.27273 2.6V5.2H2.63636V7.8H5.27273V10.4H7.90909V7.8H10.5455V5.2H7.90909V2.6H5.27273Z"
        fill="#1E88E5"
      />
    </svg>
  );
};

const LobbyDetails: FC<LobbyMetaData> = (props) => {
  const priceLabel =
    priceDropdown.find((item) => item.key === props.price)?.value ?? "Unknown";

  return (
    <>
      <span className="lobbyMeta">
        <CoinIcon className="coinIcon" />
        <p>{priceLabel}</p>
      </span>
      <span className="lobbyMeta">
        <PersonIcon className="personIcon" />
        <p>
          {props.players} / {props.playersMax}
        </p>
      </span>
    </>
  );
};

export interface ActionButton {
  type: ColorType;
  text: string;
  onClick?(data: INotification): void;
}

interface NotificationItemProps {
  data: INotification;
  actions?: ActionButton[];
}

const NotificationItem: FC<NotificationItemProps> = (props) => {
  let image = props.data.image;
  if (props.data.type === "friendInvite" && !props.data.image) {
    image = "/images/avatar.png";
  }

  function toActionComponent(item: ActionButton, idx: number) {
    const classes = classNames("notifItem__actionButton", {
      "notifItem__actionButton--secondary": item.type === "secondary",
    });

    return <div key={idx} onClick={() => GlobalUtils.callIfFunction(item.onClick, props.data)} className={classes}>{item.text}</div>;
  }

  const actions = props.actions?.map(toActionComponent) ?? [];

  return (
    <div className="notifItem">
      <div className="notifItem__image">
        {image ? (
          <img 
            src={image}
            alt="avatar"
            className="notifItem__image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src=Constants.defaultAvatar;
            }} />
        ) : (
          <PlaySvg />
        )}
      </div>
      <div className="notifItem__body">
        <div className="notifItem__title">
          <p>{props.data.title}</p>
          <p>{GlobalUtils.toDisplayDate(props.data.date)}</p>
        </div>
        <p className="notifItem__desc">{props.data.description}</p>
        {props.data.type === "lobbyInvite" && (
          <div className="notifItem__metaData">
            <LobbyDetails {...props.data.metaData as LobbyMetaData} />
          </div>
        )}
        {actions.length !== 0 && (
          <div className="notifItem__actions">{actions}</div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
