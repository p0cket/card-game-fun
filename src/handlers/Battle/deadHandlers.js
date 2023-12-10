import { hikerBrak } from '../../consts/party/trainers'
import { createPopupRemovedState } from '../dialog/basicDialogHandlers'
import { SCENES, changeLevel, updateScene } from '../sceneHandlers_new'

export const checkIfDead = (state) => {
  // if user pal is dead
  console.warn(
    'checking if user pal is dead',
    state,
    state.userParty,
    state.userParty[0],
  )
  if (state.userParty[0].stats.hp <= 0) {
    // change state so user pal is dead
    // state.userParty[0].obj.dead = true, but we need to create a
    // new dead pal object
    state = {
      ...state,
      userParty: [
        {
          ...state.userParty[0],
          obj: {
            ...state.userParty[0].obj,
            dead: true,
          },
        },
      ],
    }

    // send to lose screen
  }
  if (state.opponent.monsters[0].obj.stats.hp <= 0) {
    // change state so opponent pal is dead
    //  state.opponent.monsters[0].obj.dead = true
    state = {
      ...state,
      opponent: {
        ...state.opponent,
        monsters: [
          {
            ...state.opponent.monsters[0],
            obj: {
              ...state.opponent.monsters[0].obj,
              dead: true,
            },
          },
        ],
      },
    }
  }
  state = createPopupRemovedState(state)

  state = updateScene(state, {
    screen: SCENES.RESULTS,
    details: {
      type: 'win',
      trainer: hikerBrak,
      area: 'tranquil forest',
      difficulty: 'easy',
      achievement: 'flawless victory',
      VIP: 'your pal',
      // EXP: Difficulty * lvl of monster * 10
    },
  })
  // const handleChangeLevel = (state, scene) => {
  //   const stateWithChangedLevel = changeLevel(state, scene)
  //   contextualDispatch({
  //     type: ACTIONS.UPDATEGAMEDATA,
  //     payload: stateWithChangedLevel,
  //   })
  // }
  return state
}
