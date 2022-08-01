import React from "react";
import { ACTIONS } from "../App";
// import ACTIONS from "../App";

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
    console.log(`card`, card);
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
    // PUT ENDTURN LOGIC HERE
    // 1. use enemy's atk
    const finalHealth = gameData.hero.health - gameData.battle.enemy.nextAttack.damage;
    // console.log(
    //   `finalHealth ${finalHealth} = h ${gameData.hero.health} - d ${gameData.battle.enemy.nextAttack.damage}`
    // );
    if(finalHealth > 0){
      // hero health lower
      dispatch({
        type: ACTIONS.SET_MYDATA,
        payload: { ...gameData, hero: {...gameData.hero, health: finalHealth} },
      });
      // decide new enemy atk

    } else {
      console.log(`game over`)
    }

    // const finalHealth = gameData.hero.health - action.payload.damage;
    // if (finalHealth > 0){
    // dispatch ACTIONS.SET_MYDATA
    // 2.
    // enemy takes turn
    // decide the next atk
    // dispatch ACTIONS.SET_ATK
    //
    //}
    // else {dispatch GAME_OVER}
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
