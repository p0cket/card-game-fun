import { DIALOGS } from '../../components/dialog/DialogManager'
import { bossBarry, hikerBrak } from '../../consts/party/trainers'
import { createPopupRemovedState } from '../dialog/basicDialogHandlers'
import { switchDialog } from '../dialog/energyDialogHandler'
import { SCENES, changeLevel, updateScene } from '../sceneHandlers_new'
import {
  applyLevelUpBonus,
  updateUserPartyStats,
} from '../state/partyStateHandlers'

export const checkIfDead = (state) => {
  console.log(
    'checking if user pal is dead',
    state,
    state.userParty,
    state.userParty[0],
  )

  // check if user pal is dead, if so, swap with a living pal

  // if your pal is dead, mark dead
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

    // if theres no living pal, change level to gameover
    // if there is a living pal,
    // show a dialog for the user to choose a new pal

    // if we go through state.userParty, and none of the pals are alive,
    // change level to gameover
    const alivePals = state.userParty.filter((pal) => !pal.dead)
    if (alivePals.length === 0) {
      console.log(`switching to gameover`)
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
      // if we go through state.userParty, and one or more pals are alive,
      // show a dialog for the user to choose a new pal
    } else if (alivePals.length > 0) {
      // show a dialog for the user to choose a new pal
      // state = createPopupRemovedState(state)
      console.log(`switching dialog to swapPal`)
      state = switchDialog(state, DIALOGS.SWAP_PAL)
    }

    // state = updateUserPartyStats(state, alivePals[0])
    // state = createPopupRemovedState(state)
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
    // increase user pal's level
    state = applyLevelUpBonus(state)
    // state.userParty[0].stats.hp

    // possibly increase enemy pal's level if your pal is dead too

    // if the boss is dead, change level to victory
    //  lets find where the type of level is assigned
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
