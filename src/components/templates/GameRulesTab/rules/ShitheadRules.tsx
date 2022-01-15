import "../GameRulesTab.scss";

const ShitheadRules = () => {
  return (
    <>
      <h3 className="gameRules__title">The rules for Shithead variant</h3>
      <a rel="noreferrer" href="https://en.wikipedia.org/wiki/Shithead_%28card_game%29" target="_blank">
        Full game description can be found on wikipedia
      </a>
      <br />
      <br />
      <p className="gameRules__sectionLabel">Additional preparation:</p>
      <p className="gameRules__text">
        At the beginning of the game, players are allowed to switch their hand
        cards with their face-up cards in an attempt to produce a strong set of
        face-up cards (possibly all perfect wildcards) for later in the game. At
        the beginning of the game, players are allowed to switch their hand
        cards with their face-up cards in an attempt to produce a strong set of
        face-up cards (possibly all perfect wildcards) for later in the game.
      </p>
      <p className="gameRules__sectionLabel">Gameplay:</p>
      <p className="gameRules__text">
        Twos and tens are wildcards, and can be played on any card. Any card can
        be played to follow a two. When a ten is played, the discard pile is
        immediately "burned" and the same player takes another turn, playing any
        card or set to begin a new discard pile.
      </p>
    </>
  );
};

export default ShitheadRules;
