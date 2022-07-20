import Card from "./Card";
import Enemy from "./Enemy";
import { useState, useEffect, useCallback } from "react";
import ACTIONS from "../App";
import enemies from "./enemies";

// set this to state
// let beginning = true;
// let inBattle = true;

const Battle = ({ gameData, dispatch, changeToScene }) => {
  const drawCard = useCallback(() => {
    dispatch({
      type: ACTIONS.DRAW_CARD,
      payload: { deck: gameData.deck, hand: gameData.battle.hand }
    });
  }, [dispatch, gameData]);

  const playCard = (card) => {
    // set Enemy data to have the health decrease
    dispatch({
      type: ACTIONS.PLAY_CARD,
      payload: {
        damage: card.num,
        cost: card.cost // also card status effect, and set the alert to blank
      }
    });
    const myHandIndex = gameData.battle.hand.indexOf(card);
    const removedCard = gameData.battle.hand.splice(myHandIndex, 1);
    //put the used card in the discard pile
    dispatch({
      type: ACTIONS.DISCARD_CARD,
      // gameData.battle.enemy.health -= card.num;
      payload: { cardToRemove: removedCard }
    });
  };


  //maybe move this all to screen.js and then seperate into other files
  // const decideEnemy = useCallback(() => {
  //   const rndm = Math.floor(Math.random * enemies.length);
  //   console.log("deciding enemy:", rndm, enemies[rndm], enemies);
  //   //set Enemy
  //   const ourEnemy = enemies[rndm];
  //   dispatch({
  //     type: ACTIONS.SET_ENEMY,
  //     payload: { enemy: ourEnemy }
  //   });
  // }, [dispatch]);
  // const decideEnemyATK = useCallback(() => {
  //   const randomizeATK = Math.floor(
  //     Math.random() * gameData.battle.enemy.attacks.length
  //   );
  //   const nextATK = gameData.battle.enemy.attacks[randomizeATK];
  //   dispatch({
  //     type: ACTIONS.SET_ENEMY_ATTACK,
  //     payload: { attack: nextATK }
  //   });
  // }, [dispatch, gameData]);
  //-----

  useEffect(() => {
    if (!gameData.battle.enemy) {
      decideEnemy();
      decideEnemyATK();
      console.log("decided enemy was:", gameData.battle.enemy);
    }
    if (gameData.battle.enemy.health <= 0) {
      console.log("You defeated the enemy! Great job!");
    }
  }, [gameData.battle.enemy, decideEnemy, decideEnemyATK]);
  //----

  const endTurn = () => {
    console.log(`End Turn`);
    // enemy takes turn
    let enemyAtk = 1;
    //switch take damage to all the logic for ending turn
    dispatch({
      type: ACTIONS.END_TURN,
      payload: { damage: enemyAtk, effect: "stunned" }
    });
    // dispatch({
    //   type: ACTIONS.TAKE_DAMAGE,
    //   payload: { damage: enemyAtk, effect: "stunned" }
    // });
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
          <button onClick={() => drawCard(gameData.deck)}>
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

  const VictoryElement = () => {
    return <>victory</>;
  };
  const RewardElement = () => {
    return <>reward</>;
  };

  // const battlePhase  = () {
  // switch (nextLevel) {
  //   case "intro":
  //     return <Intro />;
  //     break;
  //   }
  // }

  return (
    <>
      {/* different phases will be done through scene changes */}
      {!gameData.battle.beginning && <BattleElement />}
    </>
  );
  // return (
  //   <>
  //     Battle Component
  //     <div>
  //       <Enemy
  //         enemyHealth={enemyHealth}
  //         enemyData={enemyData}
  //         setEnemyData={setEnemyData}
  //       />
  //       <br />
  //       <h5>Our hand:</h5>
  //       <div style={{ color: "Red" }}>{alert}</div>
  //       <div style={{ color: "Red" }}>
  //         {myHand.length > 0
  //           ? myHand.map((card) => {
  //               return <Card cardValue={card} playCard={playCard} />;
  //             })
  //           : `No Cards in hand. Click "Draw" to spend an energy and draw a card.`}
  //       </div>
  //     </div>
  //     <br />
  //     <div>
  //       <button onClick={() => drawCard(myDeck)}>
  //         Draw ({myEnergy} Energy Left)
  //       </button>
  //       <h4 style={{ color: "gray" }}>{myDiscarded.length} discarded Cards</h4>
  //       <br />
  //       <br />
  //       <button onClick={endTurn}>End Turn</button>

  //       <h5 style={{ color: "gray" }}>Our deck:</h5>
  //       {myDeck.map((card) => {
  //         return <Card cardValue={card} playCard={playCard} />;
  //       })}
  //     </div>
  //   </>
  // );
};

export default Battle;
