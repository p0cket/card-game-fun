import { ACTIONS } from '../../MainContext'
import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import { createPopupVisibleState } from '../dialog/basicDialogHandlers'
import { switchDialog } from '../dialog/energyDialogHandler'
import {
  ATK_PHASES,
  calculateTargets,
  createPayloadState,
  executeMove,
} from '../moveHandlers'
import {
  createAIDamagedState,
  createHumanDamagedState,
} from '../state/damageStateHandlers'
let ourDmg
let damagedHP
export const dmgPhase = (state, attackPayload) => {
  let newState = createPayloadState(state, attackPayload)
  const { move, pal, phase, player, userSlot, targets } = attackPayload
  console.groupCollapsed(
    `💵 dmgPhase: starting`,
    newState,
    move,
    pal,
    phase,
    player,
    userSlot,
    targets,
  )
  checkForUndefined({
    newState,
    move,
    pal,
    phase,

    player,
    userSlot,
    targets,
  })
  let targetPal
  if (player === PLAYERS.HUMAN) {
    targetPal = newState.opponent.monsters[0].obj
    console.warn(`🫠check passed as human`, targetPal)
    const moveCost = move.cost.energy
    ourDmg = move.damage
    damagedHP = targetPal.stats.hp - ourDmg
    console.log(
      `Human pal's HP ${targetPal.stats.hp} - ${ourDmg}dmg = ${damagedHP}`,
    )
    targetPal.stats.hp = damagedHP
    console.log(`'AI' pal's HP is now ${targetPal.stats.hp}`)
    console.log(`dmg b4 the createAIDamagedState:`, newState)
    newState = createAIDamagedState(newState, damagedHP, moveCost, move, pal)
    console.log(`createAIDamagedState:`, newState)

    newState = switchDialog(newState, DIALOGS.DAMAGED_PAL_AI)
    console.log(`dmg after the createAIDamagedState:`, newState)
    // dialog open state here?
  } else if (player === PLAYERS.AI) {
    console.log(`Player is AI: newState.userParty`, newState.userParty)
    targetPal = newState.userParty[0]
    const moveCost = move.cost.energy
    console.log(`ATK: DMG phase: targetPal, move`, targetPal, move)
    console.log(
      `The AI damage to be dealt is ${move.damage}.
    This will result in targetPal.stats.hp (${targetPal.stats.hp})
     at: ${targetPal.stats.hp - move.damage}`,
    )
    damagedHP = targetPal.stats.hp - move.damage
    newState = createHumanDamagedState(newState, damagedHP, moveCost, move, pal)
    newState = switchDialog(newState, DIALOGS.HUMAN_PAL_DAMAGED)
    // newState = createPopupVisibleState({
    //   prevState: newState,
    //   title: `Enemy Attack Success`,
    //   message: `${move.damage} Damage Dealt.`,
    //   options: [
    //     {
    //       label: 'Confirm',
    //       onClick: () => {
    //         console.log('Confirm clicked')
    //         executeMove({
    //           state: newState,
    //           //
    //           pal: pal,
    //           move: move,
    //           player: player,
    //           phase: ATK_PHASES.STATUSES,
    //           userSlot: 0,
    //           //
    //           targets: targets,
    //           // possessed: false,
    //         })
    //       },
    //     },
    //   ],
    // })
    console.log(`After createHumanDamagedState:`, newState)
  }
  console.log(`ATK: DAMAGE phase ending:`, newState)
  console.groupEnd()
  return newState
  // for all modifiers, switch(move.modifiers) go through every modifier.
  // case ATK_PHASES.APPLY_DAMAGE:// Check if the move has a status effect
}