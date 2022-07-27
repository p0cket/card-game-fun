import React from "react";
import "./styles.css";
import Screen from "./components/Screen";
import { useReducer } from "react";
import mapGenerator from "./components/mapGenerator";
import { enemies, startingData, startingDeck } from "./components/consts";

export const ACTIONS = {
  SET_SCENE: "set_scene",
  SET_MYDATA: "set-mydata",
  SET_ENEMY: "set-enemy",
  SET_DECK: "set-deck",
  SET_ALERT: "set_alert",
  DRAW_CARD: "draw-card",
  PLAY_CARD: "play-card",
  DISCARD_CARD: "discard-card",
  BEGIN_BATTLE: "begin-battle",
  TAKE_DAMAGE: "take-damage",
  END_TURN: "end-turn",
};

function reducer(gameData, action) {
  // @TODO when you get a chance, destructure it all
  // const {payload} = action;
  console.log(`reducer ran`)
  switch (action.type) {
    case ACTIONS.SET_SCENE:
      return {
        ...gameData,
        curScene: action.payload,
      };
    case ACTIONS.SET_MYDATA:
      return {};
    case ACTIONS.SET_ALERT:
      return {
        ...gameData,
        alert: action.payload.alert,
      };
    case ACTIONS.SET_DECK:
      return { ...gameData, deck: action.payload };
    case ACTIONS.DRAW_CARD:
      console.log(`DRAW_CARD`);
      //   dispatch({
      //     type: ACTIONS.DRAW_CARD,
      //     payload: { deck: gameData.deck, hand: gameData.battle.hand },
      if (gameData.deck.length > 0) {
        console.log(`if - deck's length: ${gameData.deck.length}`);
        return {
          ...gameData,
          battle: {
            ...gameData.battle,
            hand: [...gameData.battle.hand, gameData.deck[0]],
          },
          deck: gameData.deck.slice(1),
        };
      } else {
        console.log(`else -deck's length: ${gameData.deck.length}`);
        return {
          ...gameData,
          alert: "No cards left to draw :( ",
        };
      }
    case ACTIONS.PLAY_CARD:
      if (gameData.hero.energy >= action.payload.cost) {
        if (gameData.battle.enemy.health - action.payload.damage <= 0) {
          console.log(`you defeated the enemy!`);
          //also use energy needed to make the card
          //end battle logic
          //move to next scene
        }
        return {
          ...gameData,
          battle: {
            ...gameData.battle,
            enemy: {
              ...gameData.battle.enemy,
              health: gameData.battle.enemy.health - action.payload.damage,
              energy: gameData.hero.energy - action.payload.cost,
            },
          },
        };
      } else {
        return {
          ...gameData,
          alert: "Not enough energy to play that card :( ",
        };
      }
      //put the card in the discard
    case ACTIONS.DISCARD_CARD:
      return {
        ...gameData,
        battle: {
          ...gameData.battle,
          discarded: [
            ...gameData.battle.discarded,
            action.payload.cardToRemove,
          ],
        },
      };
    case ACTIONS.BEGIN_BATTLE:
      {
        let shuffledDeck = [];
        if (gameData.deck.length > 0) {
          let shuffledDeck = shuffle(startingDeck);
        } else {
          let shuffledDeck = shuffle(gameData.length);
        }
        //then decide the opponent
        setEnemyHandler(gameData, action.payload.enemy);
        setEnemyAtkHandler(gameData, action.payload.startingAtk);
        return {
          ...gameData,
          battle: { ...gameData.battle, beginning: true },
          deck: shuffledDeck,
        };
      }
    case ACTIONS.END_TURN:
      {
        const finalHealth = gameData.hero.health - action.payload.damage;
        if (finalHealth > 0) {
          // const atk = decideEnemyATK();
          setEnemyAtkHandler(gameData, action.payload.atk); //setting atk for next turn
        } else {
          console.log(
            `game over man :). Your Health:${gameData.hero.health} and fh: ${finalHealth}`
          );
        }
        return { ...gameData, hero: { ...gameData.hero, health: finalHealth } };
      }
    default:
      console.log(`no action type matched, returning gameData`);
      return gameData;
  }
}

let map = mapGenerator();

function setEnemyHandler(gameData, action) {
  return { ...gameData, battle: { ...gameData.battle, enemy: action } };
}
function setEnemyAtkHandler(gameData, action) {
  return {
    ...gameData,
    battle: {
      ...gameData.battle,
      enemy: { ...gameData.battle.enemy, nextAttack: action },
    },
  };
}

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData);

  const decideEnemy = () => {
    const rndm = Math.floor(Math.random * enemies.length);
    console.log("deciding enemy:", rndm, enemies[rndm], enemies);
    const ourEnemy = enemies[rndm];
    return ourEnemy;
  };
  const decideEnemyATK = () => {
    const randomizeATK = Math.floor(
      Math.random() * gameData.battle.enemy.attacks.length
    );
    const nextATK = gameData.battle.enemy.attacks[randomizeATK];
    return nextATK;
  };

  const loadNextLevel = () => {
    console.log(`loadNextLevel`);
    const nextLevel = {
      scene: map[gameData.curScene.lvl + 1],
      lvl: gameData.curScene.lvl + 1,
    };
    dispatch({ type: ACTIONS.SET_SCENE, payload: nextLevel });

    const curLevelNum = gameData.curScene.lvl;
    const levelToSet = map[curLevelNum];
    if (levelToSet === "battle") {
      const decidedEnemy = decideEnemy();
      const startingAtk = decideEnemyATK();
      dispatch({
        type: ACTIONS.BEGIN_BATTLE,
        payload: {
          enemy: decidedEnemy,
          startingAtk: startingAtk,
          deck: gameData.deck,
        },
      });
    }
  };
  console.log(`x`);

  return (
    <div className="App">
      <h3>dashboard stuff</h3>
      <h3>
        {`Hero: 💞${gameData.hero.health}HP 🧪${gameData.hero.energy}Energy 💰${gameData.gold} ---ACT1: level
        ${gameData.curScene.lvl}---`}
      </h3>
      <Screen gameData={gameData} dispatch={dispatch} map={map} />
      <button onClick={loadNextLevel}>Next Level</button>
    </div>
  );
}
