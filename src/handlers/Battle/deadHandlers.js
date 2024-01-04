import { bossBarry, hikerBrak } from '../../consts/party/trainers'
import { createPopupRemovedState } from '../dialog/basicDialogHandlers'
import { SCENES, changeLevel, updateScene } from '../sceneHandlers_new'

export const checkIfDead = (state) => {
  console.log(
    'checking if user pal is dead',
    state,
    state.userParty,
    state.userParty[0],
  )

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

    // if the boss is dead, change level to victory
    //  lets find where the type of level is assigned
    //
    const { sceneType } = state.current.scene.details
    switch (sceneType) {
      case SCENES.BATTLE:
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
        break
      case SCENES.BOSS:
        updateScene(state, {
          screen: SCENES.VICTORY,
          details: {
            type: 'win',
            trainer: bossBarry,
            area: 'serene meadow',
            difficulty: 'moderate',
            achievement: 'perfect conqueror',
            VIP: 'trusted companion',
          },
        })
        break
    }
    // if (state.current.scene.details.sceneType === SCENES.BOSS){

    // }

    state = createPopupRemovedState(state)
  }

  return state
}
