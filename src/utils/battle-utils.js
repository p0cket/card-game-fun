// Replace the other functions of the same name
// so you can use the functions in Battle.js

import { enemies } from "../components/consts";

export const decideEnemyATK = (enemyAttacks) => {
    if(enemyAttacks){
        const randomizeATK = Math.floor(
            Math.random() * enemyAttacks.length
          );
          const nextATK = enemyAttacks[randomizeATK];
          return nextATK;
    } else {
        console.log(`no enemyAttacks`)
    }
};

// export const drawCard = () => {
//   dispatch({
//     type: ACTIONS.DRAW_CARD,
//     payload: { deck: gameData.deck, hand: gameData.battle.hand },
//   });
// };