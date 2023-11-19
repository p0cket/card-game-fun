import { ACTIONS } from '../../MainContext'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import { createPopupVisibleState } from '../dialog/basicDialogHandlers'
import { ATK_PHASES, calculateTargets, executeMove } from '../moveHandlers'
import {
  createAIDamagedState,
  createHumanDamagedState,
} from '../state/damageStateHandlers'

let ourDmg
let damagedHP
export const dmgPhase = (
  contextualState,
  contextualDispatch,
  // move details
  pal,
  move,
  player,
  userSlot,
  // target details
  targets,
) => {
  console.groupCollapsed(
    '💥 DAMAGE: start',
    contextualState,
    contextualDispatch,
    pal,
    move,
    player,
    userSlot,
    targets,
  )
  checkForUndefined({
    contextualState,
    contextualDispatch,
    pal,
    move,
    player,
    userSlot,
    targets,
  })
  // const targetPals = calculateTargets( // this doesn't work, fix it
  //   targets,
  //   contextualState.userParty,
  //   contextualState.opponent.monsters,
  // )
  let targetPal
  console.log(
    `contextualState, contextualDispatch, pal, move, targetPal, player`,
    contextualState,
    contextualDispatch,
    pal,
    move,
    // targetPals,
    player,
  )
  // this is being switched to targetPals from targetPal
  // so use something later like:
  // Iterate over each target monster
  // targetPals.forEach((targetPal, index) => {
  //   // Place your damage application logic here
  // });
  //   targetPal = contextualState.opponent.monsters[0].obj

  if (player === PLAYERS.HUMAN) {
    targetPal = contextualState.opponent.monsters[0].obj
    console.warn(`🫠check passed as human`, targetPal)
    const moveCost = move.cost.energy
    ourDmg = move.damage
    console.log(
      `The human damage to be dealt is ${ourDmg}.
    This will result in targetPal.stats.hp (${targetPal.stats.hp})
     at: ${targetPal.stats.hp - ourDmg}`,
    )
    damagedHP = targetPal.stats.hp - ourDmg
    contextualState = { ...contextualState }

    console.log(`🫠check passed as human`)
    targetPal.stats.hp = damagedHP
    console.log(`'AI' pal's HP is now ${targetPal.stats.hp}`)

    console.log(`dmg b4 the createAIDamagedState:`, contextualState)
    contextualState = createAIDamagedState(
      contextualState,
      damagedHP,
      moveCost,
      move,
      pal,
      contextualDispatch,
    )
    console.log(`dmg after the createAIDamagedState:`, contextualState)

    contextualState = createPopupVisibleState({
      prevState: contextualState,
      title: `Successful Attack`,
      message: `${move.damage} Damage Dealt.`,
      options: [
        {
          label: 'Confirm',
          onClick: () => {
            console.log('Confirm clicked')
            executeMove(
              // move,
              // contextualState,
              // contextualDispatch,
              // pal,
              // ATK_PHASES.STATUSES,
              {
                state: contextualState,
                dispatch: contextualDispatch,
                //
                pal: pal,
                move: move,
                player: player,
                phase: ATK_PHASES.STATUSES,
                userSlot: 0,
                //
                targets: targets,
                // possessed: false,
              },
            )
          },
        },
      ],
    })
    console.log(`dmg after the createAIDamagedState:`, contextualState)
    // dialog open state here?
  } else if (player === PLAYERS.AI) {
    console.log(
      `Player is AI: contextualState.userParty`,
      contextualState.userParty,
    )
    targetPal = contextualState.userParty[0]
    const moveCost = move.cost.energy
    console.log(`ATK: DMG phase: targetPal, move`, targetPal, move)
    console.log(
      `The AI damage to be dealt is ${move.damage}.
    This will result in targetPal.stats.hp (${targetPal.stats.hp})
     at: ${targetPal.stats.hp - move.damage}`,
    )
    damagedHP = targetPal.stats.hp - move.damage
    contextualState = createHumanDamagedState(
      contextualState,
      damagedHP,
      moveCost,
      move,
      pal,
      contextualDispatch,
    )
    contextualState = createPopupVisibleState({
      prevState: contextualState,
      title: `Enemy Attack Success`,
      message: `${move.damage} Damage Dealt.`,
      options: [
        {
          label: 'Confirm',
          onClick: () => {
            console.log('Confirm clicked')
            executeMove(
              {
                state: contextualState,
                dispatch: contextualDispatch,
                //
                pal: pal,
                move: move,
                player: player,
                phase: ATK_PHASES.STATUSES,
                userSlot: 0,
                //
                targets: targets,
                // possessed: false,
              },
            )
          },
        },
      ],
    })
    console.log(`After createHumanDamagedState:`, contextualState)
  }
  console.log(`ATK: DAMAGE phase ending:`, contextualState)
  console.groupEnd()

  return contextualState
  // for all modifiers, switch(move.modifiers) go through every modifier.
  // case ATK_PHASES.APPLY_DAMAGE:// Check if the move has a status effect
}
