import React from "react";
import "./styles.css";
import Screen from "./components/Screen";
import { useReducer } from "react";
import mapGenerator from "./components/mapGenerator";
import { startingData, startingDeck } from "./components/consts";
import { decideEnemy, decideEnemyATK } from "./utils/battle-utils";

export const ACTIONS = {
  SET_SCENE: "set_scene",
  SET_MYDATA: "set-mydata",
  SET_ENEMY: "set-enemy",
  SET_ATK: "set-atk",
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
  switch (action.type) {
    case ACTIONS.SET_SCENE:
      return {
        ...gameData,
        curScene: action.payload,
      };
    case ACTIONS.SET_MYDATA:
      return action.payload;
    case ACTIONS.SET_ALERT:
      return {
        ...gameData,
        alert: action.payload,
      };
    case ACTIONS.SET_DECK:
      return { ...gameData, deck: action.payload };
    case ACTIONS.DRAW_CARD:
      if (gameData.deck.length > 0) {
        return {
          ...gameData,
          battle: {
            ...gameData.battle,
            hand: [...gameData.battle.hand, gameData.deck[0]],
          },
          deck: gameData.deck.slice(1),
        };
      } else {
        return {
          ...gameData,
          alert: "No cards left to draw :( ",
        };
      }
    case ACTIONS.PLAY_CARD:
      console.log(`PlayCard payload:`, action.payload);
      // if (gameData.hero.energy >= action.payload.cost) {
      if (gameData.battle.enemy.health - action.payload.damage <= 0) {
        console.log(`you defeated the enemy!`);
        //also use energy needed to make the card
        //end battle logic
        //move to next scene
      }
      const energyLeft = gameData.hero.energy - action.payload.cost;
      const enemyHealthLeft =
        gameData.battle.enemy.health - action.payload.damage;
      return {
        ...gameData,
        hero: { ...gameData.hero, energy: energyLeft },
        battle: {
          ...gameData.battle,
          enemy: {
            ...gameData.battle.enemy,
            health: enemyHealthLeft,
          },
        },
      };
    // } else {
    // return {
    //   ...gameData,
    //   alert: "Not enough energy to play that card :( ",
    // };
    // }
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
    case ACTIONS.SET_ENEMY:
      return {
        ...gameData,
        battle: { ...gameData.battle, enemy: action.payload },
      };
    case ACTIONS.SET_ATK:
      return {
        ...gameData,
        battle: {
          ...gameData.battle,
          enemy: { ...gameData.battle.enemy, nextAttack: action.payload },
        },
      };
    case ACTIONS.BEGIN_BATTLE: //   startingAtk: startingAtk, //   enemy: decidedEnemy, // payload: { // type: ACTIONS.BEGIN_BATTLE,
    //   deck: gameData.deck,
    // },
    {
      let shuffledDeck = [];
      if (gameData.deck.length > 0) {
        // impure
        shuffledDeck = shuffle(startingDeck);
      } else {
        shuffledDeck = shuffle(gameData.deck);
      }
      return {
        ...gameData,
        battle: { ...gameData.battle, beginning: true },
        deck: shuffledDeck,
      };
    }
    default:
      console.log(`no action type matched, returning gameData`);
      return gameData;
  }
}

let map = mapGenerator();

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData);

  const loadNextLevel = () => {
    console.log(`loadNextLevel`);
    const nextLevel = {
      scene: map[gameData.curScene.lvl + 1],
      lvl: gameData.curScene.lvl + 1,
    };
    dispatch({ type: ACTIONS.SET_SCENE, payload: nextLevel });


    // Load Battle Prep
    if (nextLevel.scene === "battle") {
      const decidedEnemy = decideEnemy();
      dispatch({ type: ACTIONS.SET_ENEMY, payload: decidedEnemy });
      // const startingAtk = decideEnemyATK(gameData.battle.enemy.attacks);
      const startingAtk = decideEnemyATK(decidedEnemy.attacks)
      console.log(decidedEnemy, startingAtk)
      dispatch({ type: ACTIONS.SET_ATK, payload: startingAtk });
      dispatch({
        type: ACTIONS.BEGIN_BATTLE,
        payload: {
          enemy: decidedEnemy,
          startingAtk: startingAtk,
          deck: gameData.deck,
        },
      });
      // next draw your starting hand of 3 cards
      dispatch({
        type: ACTIONS.DRAW_CARD,
        payload: { deck: gameData.deck, hand: gameData.battle.hand },
      });
      dispatch({
        type: ACTIONS.DRAW_CARD,
        payload: { deck: gameData.deck, hand: gameData.battle.hand },
      });
      dispatch({
        type: ACTIONS.DRAW_CARD,
        payload: { deck: gameData.deck, hand: gameData.battle.hand },
      });
    }
  };
  console.log(`[App.js Rendered]`);

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
