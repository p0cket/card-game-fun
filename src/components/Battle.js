import Card from "./Card";
import Enemy from "./Enemy";
import { useState, useEffect, useCallback } from "react";
import ACTIONS from "../App";

const Battle = ({ gameData, dispatch }) => {
  const drawCard = () => {
    dispatch({
      type: ACTIONS.DRAW_CARD,
      payload: { deck: gameData.deck, hand: gameData.battle.hand },
    });
  };

  const playCard = (card) => {
    // 1. do card effects
    dispatch({
      type: ACTIONS.PLAY_CARD,
      payload: {
        damage: card.num,
        cost: card.cost, // also card status effect, and set the alert to blank
      },
    });
    const myHandIndex = gameData.battle.hand.indexOf(card);
    const removedCard = gameData.battle.hand.splice(myHandIndex, 1);
    // 2. put in discard
    dispatch({
      type: ACTIONS.DISCARD_CARD,
      payload: { cardToRemove: removedCard },
    });
  };

  const endTurn = () => {
    console.log(`End Turn`);
    // enemy takes turn
    let enemyAtk = 1;
    dispatch({
      type: ACTIONS.END_TURN,
      payload: { damage: enemyAtk, effect: "stunned" },
    });
  };

  // 5 cases: beginning, inBattle, victory, reward screen, loss
  // just change the scene to victory, pass the data,
  const BattleElement = () => {
    return (
      <>
        Battle Component
        <h1>--{typeof myStatus} --</h1>
        <div>
          <Enemy enemyData={gameData.battle.enemy} />
          <br />
          <h5>Our hand:</h5>
          <div style={{ color: "Red" }}>{alert}</div>
          <div style={{ color: "Red" }}>
            {gameData.battle.hand.length > 0
              ? gameData.battle.hand.map((card) => {
                  return <Card cardValue={card} playCard={playCard} />;
                })
              : `No Cards in hand. Click "Draw" to spend an energy and draw a card.`}
          </div>
        </div>
        <br />
        <div>
          <button onClick={() => drawCard()}>
            Draw ({gameData.hero.energy} Energy Left (This doesn't cost energy
            anymore))
          </button>
          <h4 style={{ color: "gray" }}>
            {gameData.battle.discarded.length} discarded Cards
          </h4>
          <br />
          <br />
          <button onClick={endTurn}>End Turn</button>

          <h5 style={{ color: "gray" }}>Our deck:</h5>
          {gameData.deck.map((card) => {
            return <Card cardValue={card} playCard={playCard} />;
          })}
        </div>
      </>
    );
  };

  return (
    <>
      {/* different phases will be done through scene changes */}
      {!gameData.battle.beginning && <BattleElement />}
    </>
  );
};

export default Battle;

// const VictoryElement = () => {
//   return <>victory</>;
// };
// const RewardElement = () => {
//   return <>reward</>;
// };
// const battlePhase  = () {
// }
