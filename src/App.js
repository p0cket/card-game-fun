import "./styles.css";
import Screen from "./components/Screen";
import React, { useState, useReducer } from "react";
import mapGenerator from "./components/mapGenerator";
import enemies from "./components/enemies";

export const ACTIONS = {
  SET_SCENE: "set_scene",
  SET_MYDATA: "set-mydata",
  SET_ENEMY: "set-enemy",
  SET_ALERT: "set_alert",
  DRAW_CARD: "draw-card",
  PLAY_CARD: "play-card",
  DISCARD_CARD: "discard-card",
  BEGIN_BATTLE: "begin-battle",
  TAKE_DAMAGE: "take-damage",
};

//---enemy and enemy attack functions
const decideEnemy = () => {
  const rndm = Math.floor(Math.random * enemies.length);
  console.log("deciding enemy:", rndm, enemies[rndm], enemies);
  const ourEnemy = enemies[rndm];
  dispatch({
    type: ACTIONS.SET_ENEMY,
    payload: { enemy: ourEnemy },
  });
};
const decideEnemyATK = () => {
  const randomizeATK = Math.floor(
    Math.random() * gameData.battle.enemy.attacks.length
  );
  const nextATK = gameData.battle.enemy.attacks[randomizeATK];
  dispatch({
    type: ACTIONS.SET_ENEMY_ATTACK,
    payload: { attack: nextATK },
  });
};
//--

function reducer(gameData, action) {
  //@TODO when you get a chance, destructure it all
  // const {payload} = action;
  switch (action.type) {
    case ACTIONS.SET_SCENE:
      gameData.scene = action.payload;
      return gameData;
    case ACTIONS.SET_MYDATA:
      return {};
    case ACTIONS.SET_ENEMY:
      gameData.battle.enemy = action.payload.enemy;
      return gameData;
    case ACTIONS.SET_ALERT:
      gameData.alert = action.payload.alert;
      return gameData;
    case ACTIONS.DRAW_CARD:
      if (gameData.deck.length > 0) {
        gameData.battle.hand = [...gameData.battle.hand, gameData.deck[0]];
        gameData.deck.slice(1);
      } else {
        gameData.alert = "No cards left to draw :( ";
      }
      return gameData;
    case ACTIONS.PLAY_CARD:
      if (gameData.hero.energy >= action.payload.cost) {
        gameData.battle.enemy.health =
          gameData.battle.enemy.health - action.payload.damage;
        gameData.hero.energy = gameData.hero.energy - action.payload.cost;
      } else {
        gameData.alert = "Not enough energy to play that card :( ";
      }
      //put the card in the discard
      return gameData;
    case ACTIONS.DISCARD_CARD:
      gameData.battle.discarded = [
        ...gameData.battle.discarded,
        action.payload.cardToRemove,
      ];
      return gameData;
    case ACTIONS.BEGIN_BATTLE:
      //this should set the screen to be battle screen
      gameData.battle.beginning = true;
      //then decide the opponent
      decideEnemy();
      decideEnemyATK();
      //

      return gameData; //@TODO
    case ACTIONS.SET_ENEMY_ATTACK:
      gameData.battle.enemy.nextAttack = action.payload.attack;
      return gameData; //@TODO
    case ACTIONS.END_TURN:
      // currently: enemyAtk is 1, payload:{ damage: enemyAtk, effect: "stunned" }
      const finalHealth = gameData.hero.health - action.payload.damage;
      if (finalHealth > 0) {
        gameData.hero.health = finalHealth;
        decideEnemyATK(); //for next turn
      } else {
        //game over
        console.log(`game over man :)`);
      }
      return gameData;

    default:
      return gameData;
  }
}

let startingData = {
  deck: [],
  gold: 50,
  hero: {
    health: 100,
    energy: 10,
    status: "Feeling Fine",
  },
  battle: {
    enemy: {
      name: "sample guy",
      bio: "just a standaard enemi",
      health: "30",
      energy: 6,
      status: "Feelin great",
      attacks: [
        {
          name: "hitting you",
          type: "hit",
          damage: 20,
          status: "dizzy",
        },
        {
          name: "hitting again",
          type: "hit",
          damage: 40,
          status: "none",
        },
      ],
    },
    nextAttack: "none",
    hand: [],
    discarded: [],
    beginning: true,
  },
  curScene: { scene: "intro", lvl: 0 },
  alert: "",
};

const types = ["Fire", "Water", "Blood", "Poison"];
const names = ["FireBreath", "WaterGun", "LifeSteal", "ToxicSplash"];
const numbers = [1, 2, 3, 4, 5, 6];
let deck = [];
let shuffDeck = new Set();
let preparedDeck = [];
let map = mapGenerator();

const makeDeck = (emptyDeck) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < types.length; j++) {
      emptyDeck.push({
        type: types[j],
        name: names[j],
        num: numbers[i],
        cost: 1,
      });
    }
  }
};

const shuffle = (thisDeck, shuffledDeck) => {
  let i = 0;
  while (i < thisDeck.length) {
    let num = Math.floor(Math.random() * thisDeck.length);
    if (!shuffledDeck.has(thisDeck[num])) {
      shuffledDeck.add(thisDeck[num]);
      i++;
    }
  }
  //set back from a Set() to an Array
  preparedDeck = [...shuffledDeck];
};

makeDeck(deck);
shuffle(deck, shuffDeck);

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData);

  const loadNextLevel = () => {
    const nextLevel = [
      map[gameData.curScene.lvl + 1],
      gameData.curScene.lvl + 1,
    ];
    dispatch({ type: ACTIONS.SET_SCENE, payload: nextLevel });
  };

  const changeToScene = (scene) => {
    setCurScene([scene, curScene[1]]);
  };

  return (
    <div className="App">
      <h3>dashboard stuff</h3>
      <h3>
        {`Hero: 💞${gameData.hero.health}HP 🧪${gameData.hero.energy}Energy 💰${gameData.gold} ---ACT1: level
        ${gameData.curScene.lvl}---`}
      </h3>
      {/*  */}
      <Screen
        gameData={gameData}
        dispatch={dispatch}
        map={map}
        changeToScene={changeToScene}
      />
      <button onClick={loadNextLevel}>Next Level</button>
    </div>
  );
}

/*
Game: {
  Scene: Scene,
  Deck: Card[],
  Gold: number,
  Hero: {
    Health: number,
    Stamina: number,
    Energy: number,
    Status: status,
  },
  Battle?: {
    Hand: Card[]
    Enemy: {
      Health: number,
      Stamina: number,
      Energy: number,
      Status: status,
    },
    Discarded: Card[],
  }
}
  */

// GameManager

// Levels
// - Acts (3)

// Act
// - stages (branching paths, maybe 8 stages)

// Area
// - Type (Shop, Enemy, health, traveler, mystery room, etc.)
// - Desc
// - options

// Shop
// - options

// treasure
// - options

// Player
// - Name
// - Health
// - Mana
// - Status
// - Deck

// Enemy
// - Name
// - Health
// - Mana
// - Status
// - Attacks

// Attack
// - Name
// - Damage
// - Status
// - (card added)

// Deck
// - Card
// - Shuffle
// - Deal

// Card
// - Amount
// - Status
// - Name
