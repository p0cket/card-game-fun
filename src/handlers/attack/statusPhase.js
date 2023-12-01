import { ACTIONS } from '../../MainContext'
import { PLAYERS } from '../../consts/consts'
import {
  applyStatusEffect,
  calculateDoesItLand,
} from '../../utils/battle-utils'
import { checkForUndefined } from '../../utils/debugging-utils'
import { createPopupVisibleState } from '../dialog/basicDialogHandlers'
import { ATK_PHASES, executeMove } from '../moveHandlers'

export const statusPhase = (state, attackPayload) => {
  const { move, pal, phase, player, userSlot, targets } = attackPayload
  console.group(`😵‍💫 STATUS: start`)
  checkForUndefined({
    state,
    pal,
    move,
    phase,

    player,
    userSlot,
    targets,
  })
  let doesItLand = calculateDoesItLand(move)

  if (doesItLand) {
    if (player === PLAYERS.HUMAN) {
      console.log(
        `effect lands - now applyStatusEffect() with state, player, move`,
        state,
        player,
        move,
      )
      state = applyStatusEffect(state, player, move)
      console.log(
        'b4 calling createPopupVisibleState, state,player, move:',
        state,
        player,
        move,
      )
      state = switchDialog(state, DIALOGS.STATUS_APP)
      console.groupEnd()
      return state
    } else if (player === PLAYERS.AI) {
      console.log(
        `statusPhase: AI applyStatusEffect(state, player, move)`,
        state,
        player,
        move,
      )
      state = applyStatusEffect(state, player, move)
      console.log(
        `statusPhase: b4 calling createPopupVisibleState, enemy landed effect'`,
        state,
        player,
        move,
      )
      const ourPal = pal.obj
      console.warn(`move, ourPal`, move, ourPal)
      // #TODO: state = switchDialog(state, DIALOGS.STATUS_APPLIED_HUMAN)
      // go to dialogManager, and create a component for StatusAppliedHuman
      // instead of below:
      // state = createPopupVisibleState({
      //   prevState: state,
      //   message: `${move?.effect?.result} applied to human.
      // ${ourPal.name} ${move?.effect?.result}'d you pal`,
      //   options: statusOptions,
      //   header: `Status applied`,
      //   title: 'status applied',
      // })
      console.groupEnd()
      return state
    }
  } else {
    // Handle the case where the effect does not land
    console.log(
      `effect did not land. statusPhase: b4 calling createPopupVisibleState, state on did not land:', state`,
    )
    if (player === PLAYERS.HUMAN) {
      // #TODO: state = switchDialog(state, DIALOGS.STATUS_NOT_LAND)
      // go to dialogManager, and create a component for StatusNotLand
      // instead of below:
      // state = createPopupVisibleState({
      //   prevState: state,
      //   message: `${move?.effect?.result} did not land.
      // ${pal.name} failed to ${move?.effect?.result} the opponent`,
      //   options: statusNotLandOptions,
      //   header: `oh no, status #fail`,
      //   title: 'status not applied',
      // })
      console.log(`statusPhase: ending, state`, state)
      console.groupEnd()
      return state
    } else if (player === PLAYERS.AI) {
      console.log(`enemy did not land. statusPhase: ending, state`, state)
      const ourPal = pal.obj
      console.warn(`move, ourPal`, move, ourPal)
      // #TODO: state = switchDialog(state, DIALOGS.STATUS_NOT_LAND_HUMAN)
      // go to dialogManager, and create a component for StatusNotLandHuman
      // instead of below:
      // state = createPopupVisibleState({
      //   prevState: state,
      //   message: `${move?.effect?.result} did not land.
      // ${ourPal.name} failed to ${move?.effect?.result} your pal`,
      //   options: statusNotLandOptions,
      //   header: `oh no, status #fail`,
      //   title: 'status not applied to your pal',
      // })
      console.groupEnd()
      return state
    }
  }
}
