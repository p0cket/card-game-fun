import React from "react";
import { ACTIONS } from "../actions";
import Card from "./Card";
import Enemy from "./Enemy";

const Battle = ({ gameData, dispatch }) => {
  const drawCard = () => {
    dispatch({
      type: ACTIONS.DRAW_CARD,
      payload: { deck: gameData.deck, hand: gameData.battle.hand },
    });
  };

  const playCard = (card) => {
    dispatch({
      type: ACTIONS.PLAY_CARD,
      payload: { card },
    });
  };

  const endTurn = () => {
    console.log(`End Turn`);
    dispatch({ type: ACTIONS.END_TURN, payload: { seed: Math.random() }})
  };

  // 5 cases: beginning, inBattle, victory, reward screen, loss
  // just change the scene to victory, pass the data,
  //  {/* different phases will be done through scene changes */}

  return (
    <>
      Battle Component
      <div>
        <Enemy enemyData={gameData.battle.enemy} />
        <br />
        <h5>Our hand:</h5>
        <div style={{ color: "Red" }}>{gameData.alert}</div>
        <div style={{ color: "Red" }}>
          {gameData.battle.hand.length > 0
            ? gameData.battle.hand.map((card) => {
                return (
                  <Card key={card.id} cardValue={card} playCard={playCard} />
                );
              })
            : `No Cards in hand. Click "Draw" to spend an energy and draw a card.`}
        </div>
      </div>
      <br />
      <div>
        <button onClick={() => drawCard()}>
          Draw a card
        </button>
        <h4 style={{ color: "gray" }}>
          {gameData.battle.discarded.length} discarded Cards
        </h4>
        <br />
        <br />
        <button onClick={endTurn}>End Turn</button>

        <h5 style={{ color: "gray" }}>Our deck:</h5>
        {gameData.deck.map((card) => {
          return <Card key={card.id} cardValue={card} playCard={playCard} />;
        })}
      </div>
    </>
  );
};

// Card.propTypes = {
// props.gameData: PropTypes.object,
// props.dispatch: PropTypes.func,
// };

export default Battle;
