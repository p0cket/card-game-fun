// import "./styles.css";
// import React, { useState, useReducer } from "react";
// import Todo from "./components/Todo";

// export const ACTIONS = {
//   ADD_TODO: "add-todo",
//   TOGGLE_TODO: "toggle-todo",
//   DELETE_TODO: "delete-todo"
// };
// function reducer(todos, action) {
//   switch (action.type) {
//     case ACTIONS.ADD_TODO:
//       return [...todos, newTodo(action.payload.name)];
//     case ACTIONS.TOGGLE_TODO:
//       return todos.map((todo) => {
//         if (todo.id === action.payload.id) {
//           return { ...todo, complete: !todo.complete };
//         }
//         return todo;
//       });
//     case ACTIONS.DELETE_TODO:
//       return todos.filter((todo) => todo.id !== action.payload.id);
//     default:
//       return todos;
//   }
// }

// function newTodo(name) {
//   return { id: Date.now(), name: name, complete: false };
// }

// export default function App() {
//   const [todos, dispatch] = useReducer(reducer, []);
//   const [name, setName] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
//     setName("");
//   }
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </form>
//       {todos.map((todo) => {
//         return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
//       })}
//     </>
//   );
// }

import "./styles.css";
import Screen from "./components/Screen";
import React, { useState, useReducer } from "react";
import mapGenerator from "./components/mapGenerator";

export const ACTIONS = {
  SET_SCENE: "set_scene",
  SET_MYDATA: "set-mydata",
  SET_ENEMY: "set-enemy",
  SET_ALERT: "set_alert",
  DRAW_CARD: "draw-card",
  PLAY_CARD: "play-card",
  DISCARD_CARD: "discard-card",
  BEGIN_BATTLE: "begin-battle",
  TAKE_DAMAGE: "take-damage"
};
function reducer(gameData, action) {
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
        action.payload.cardToRemove
      ];
      return gameData;
    case ACTIONS.BEGIN_BATTLE:
      gameData.battle.beginning = !gameData.battle.beginning;
      return gameData; //@TODO
    case ACTIONS.SET_ENEMY_ATTACK:
      gameData.battle.enemy.nextAttack = action.payload.attack;
      return gameData; //@TODO
    case ACTIONS.END_TURN:
      const finalHealth = gameData.hero.health - action.payload.damage;

      if (finalHealth > 0) {
        gameData.hero.health = finalHealth;
      } else {
        //game over
      }
      return gameData;

    //-----
    // enemyAtk is 1, payload:{ damage: enemyAtk, effect: "stunned" }

    //----
    // case ACTIONS.TAKE_DAMAGE:
    //   gameData.hero.health = gameData.hero.health - action.payload.damage;
    //   return gameData;
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
    status: "Feeling Fine"
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
          status: "dizzy"
        },
        {
          name: "hitting again",
          type: "hit",
          damage: 40,
          status: "none"
        }
      ]
    },
    nextAttack: "none",
    hand: [],
    discarded: [],
    beginning: true
  },
  curScene: { scene: "intro", lvl: 0 },
  alert: ""
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
        cost: 1
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
  preparedDeck = [...shuffDeck];
};

makeDeck(deck);
shuffle(deck, shuffDeck);

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData);
  // const [curScene, setCurScene] = useState(["intro", 0]);

  // prev version
  // const loadNextLevel = () => {
  //   const nextLevel = [map[curScene[1] + 1], curScene[1] + 1];
  //   setCurScene(nextLevel);
  // };
  const loadNextLevel = () => {
    const nextLevel = [
      map[gameData.curScene.lvl + 1],
      gameData.curScene.lvl + 1
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

// screen prev
{
  /* <Screen
gameData={gameData}
dispatch={dispatch}
curScene={curScene}
setCurScene={setCurScene}
alert={alert}
setAlert={setAlert}
map={map}
changeToScene={changeToScene}
/> */
}
