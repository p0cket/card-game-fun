import { hikerBrak } from '../../consts/party/trainers'
import { createPopupRemovedState } from '../dialog/basicDialogHandlers'
import { SCENES, changeLevel, updateScene } from '../sceneHandlers_new'

export const checkIfDead = (state) => {
  console.warn('checking if user pal is dead', state, state.userParty, state.userParty[0])

  if (state.userParty[0].stats.hp <= 0) {
    state = {
      ...state,
      userParty: [
        {
          ...state.userParty[0],
          dead: true,
        },
        ...state.userParty.slice(1),
      ],
    }
    state = updateScene(state, {
      screen: SCENES.GAMEOVER,
      details: {
        type: 'lose',
        score: null,
        progress: null,
        unlocks: null,
      },
    })
    state = createPopupRemovedState(state)
  }

  if (state.opponent.monsters[0].stats.hp <= 0) {
    state = {
      ...state,
      opponent: {
        ...state.opponent,
        monsters: [
          {
            ...state.opponent.monsters[0],
            dead: true,
          },
        ],
      },
    }
    state = updateScene(state, {
      screen: SCENES.RESULTS,
      details: {
        type: 'win',
        trainer: hikerBrak,
        area: 'tranquil forest',
        difficulty: 'easy',
        achievement: 'flawless victory',
        VIP: 'your pal',
      },
    })
    state = createPopupRemovedState(state)
  }

  return state
}