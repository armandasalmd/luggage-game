import "../GameRulesTab.scss";

const ClassicRules = (props: { anySameKind: boolean }) => {
  const title = props.anySameKind
    ? "The rules for Classic (put any of same kind)"
    : "The rules for luggage game (Classic)";

  return (
    <>
      <h3 className="gameRules__title">{title}</h3>
      <p className="gameRules__sectionLabel">Special cards:</p>
      <p className="gameRules__text">
        In classical game special cards are 2, 5 and 10.
      </p>
      <ul className="gameRules__list">
        <li>2 means that you can put it anytime and it’s next player’s turn</li>
        <li>5 means that you can put it anytime and then put any other card</li>
        <li>
          10 means that you can put it anytime and the current pile is
          eliminated from the game (put aside){" "}
        </li>
      </ul>
      <p className="gameRules__sectionLabel">Stacking same card kind:</p>
      <ul className="gameRules__list">
        {!props.anySameKind && (
          <li>
            <strong>2 same cards</strong> can be put on empty table or after 5
            powercard
          </li>
        )}
        {props.anySameKind && (
          <li>
            <strong>2 same cards</strong> can be put any time. It does not give
            you extra power
          </li>
        )}
        <li>
          <strong>3 same cards</strong> can be put any time. It also allows you
          to put additional card or finish your turn
        </li>
        <li>
          <strong>4 same cards</strong> can be put any time. It works just like
          powercard 10 - burn table cards
        </li>
      </ul>
    </>
  );
};

export default ClassicRules;
