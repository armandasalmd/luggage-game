import { FC, useState } from "react";
import classNames from "classnames";

import "./Card.scss";
import CollapseIcon from "@material-ui/icons/ExpandLess";

interface CardProps {
  className?: string;
  collapsable?: boolean;
  halfWidth?: boolean;
  headerActions?: React.ReactElement | React.ReactHTMLElement<any>;
  hoverable?: boolean;
  padded?: boolean;
  noContentPaddingX?: boolean;
  noContentPaddingY?: boolean;
  noHeaderLine?: boolean;
  noShadow?: boolean;
  smallHeaderY?: boolean;
  style?: object;
  title?: string;
  titleBig?: boolean;
  wrap?: boolean;
}

const Card: FC<CardProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const classes = classNames(
    "card",
    {
      "card--collapsed": collapsed,
      "card--titleBig": props.titleBig,
      "card--hoverable": props.hoverable,
      "card--padded": props.padded,
      "card--halfWidth": props.halfWidth,
      "card--wrap": props.wrap,
      "card--noContentPaddingX": props.noContentPaddingX,
      "card--noContentPaddingY": props.noContentPaddingY,
      "card--noHeaderLine": props.noHeaderLine,
      "card--noShadow": props.noShadow,
      "card--smallHeaderY": props.smallHeaderY || props.collapsable,
    },
    props.className
  );

  return (
    <div className={classes} style={props.style}>
      {props.title && (
        <div className="card__header">
          <h1 className="card__title">{props.title}</h1>
          {(props.headerActions || props.collapsable) && (
            <div className="card__actions">
              {props.headerActions}
              {props.collapsable && (
                <CollapseIcon
                  className="card__collapseButton"
                  onClick={toggleCollapse}
                />
              )}
            </div>
          )}
        </div>
      )}
      <div className="card__content">{props.children}</div>
    </div>
  );
};

export default Card;
