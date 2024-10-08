import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import {
  applyStatusEffect,
  calculateDoesEffectLand,
} from '../../utils/battle-utils'
import { checkForUndefined } from '../../utils/debugging-utils'
import { switchDialog } from '../dialog/energyDialogHandler'

export const statusPhase = (state, attackPayload) => {
  const { phase } = attackPayload
  const { move, pal, player, userSlot, targets } = state.attack

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

  //skip everything if theres no effect on move
  let doesItLand = calculateDoesEffectLand(move)

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
      // state = switchDialog(state, DIALOGS.STATUS_APPLIED_HUMAN)
      state = switchDialog(state, DIALOGS.STATUS_APPLIED_AI)
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
      const ourPal = pal
      console.warn(`move, ourPal`, move, ourPal)
      // #TODO:
      // state = switchDialog(state, DIALOGS.STATUS_APPLIED_AI)
      state = switchDialog(state, DIALOGS.STATUS_APPLIED_HUMAN)
      console.groupEnd()
      return state
    }
  } else {
    // Handle the case where the effect does not land
    console.log(`statusPhase b4 createPopupVisibleState: effect did not land`)
    if (player === PLAYERS.HUMAN) {
      state = switchDialog(state, DIALOGS.STATUS_NOT_APPLIED_AI)

      console.log(`statusPhase: ending, state`, state)
      console.groupEnd()
      return state
    } else if (player === PLAYERS.AI) {
      console.log(`enemy did not land. statusPhase: ending, state`, state)
      console.warn(`move, ourPal`, move, pal)
      state = switchDialog(state, DIALOGS.STATUS_NOT_APPLIED_HUMAN)
      console.groupEnd()
      return state
    }
  }
}
