import "../GameRulesTab.scss";

const MorePowerCardsRules = () => {
  return (
    <>
      <h3 className="gameRules__title">
        {"The rules for More powercards (3, 7, 8 added)"}
      </h3>
      <p className="gameRules__text">
        For this game mode, rules are inherited from classic rules. Additionally
        it has 3, 7 and 8 powercards added.
      </p>
      <p className="gameRules__sectionLabel">Additional special cards:</p>
      <ul className="gameRules__list">
        <li>
          3 can be put any time and means that next player has to take all card
          from table to their hand
        </li>
        <li>
          7 can be put in normal order, on lower card. Next player has to put 7
          or lower, otherwise take all cards home
        </li>
        <li>
          8 can be put in normal order, on lower card. It means that next player
          either place 8 or skip it's turn.
        </li>
      </ul>
    </>
  );
};

export default MorePowerCardsRules;
