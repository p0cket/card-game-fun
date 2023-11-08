import { ACTIONS } from '../../MainContext'
import { createPopupVisibleState } from '../dialog/basicDialogHandlers'
import { ATK_PHASES, executeMove } from '../moveHandlers'
import { createAIDamagedState, createHumanDamagedState } from '../state/damageStateHandlers'

let ourDmg
let damagedHP
export const dmgPhase = (
  contextualState,
  contextualDispatch,
  user,
  move,
  targetMonster,
  player,
) => {
  console.group('💥 DAMAGE: start')
  console.log(
    `contextualState, contextualDispatch, user, move, targetMonster, player`,
    contextualState,
    contextualDispatch,
    user,
    move,
    targetMonster,
    player,
  )
  const moveCost = move.cost.energy
  ourDmg = move.damage
  console.log(
    'info',
    `The damage to be dealt is ${ourDmg}. from ${
      user.stats.attack
    } * ${ourDmg} / 100.
  This will result in targetMonster.stats.hp (${targetMonster.stats.hp})
   at: ${targetMonster.stats.hp - ourDmg}`,
  )
  damagedHP = targetMonster.stats.hp - ourDmg
  let newState = { ...contextualState }

  console.log(`🫠check if human or ai`)
  if (player === 'human') {
    console.log(`🫠check passed as human`)
    targetMonster.stats.hp = damagedHP
    console.log(`'AI' pal's HP is now ${targetMonster.stats.hp}`)

    console.log(`dmg b4 the createAIDamagedState:`, newState)
    newState = createAIDamagedState(
      newState,
      damagedHP,
      moveCost,
      move,
      user,
      contextualDispatch,
    )
    newState =  createPopupVisibleState({
      prevState: newState,
      message: `${moveCost} Damage Dealt.`,
      options: [
        {
          label: 'Confirm',
          onClick: () => {
            console.log('Confirm clicked')
            executeMove(
              move,
              newState,
              contextualDispatch,
              user,
              ATK_PHASES.STATUSES,
            )
          },
        },
      ],
    })

    console.log(`dmg after the createAIDamagedState:`, newState)
    // dialog open state here?
  } else if (player === 'AI') {
    user.stats.hp = damagedHP
    console.log(`user's HP is now ${user.stats.hp}`)
    newState = createHumanDamagedState(contextualState, damagedHP)
  }

  //////----

  console.log(`ATK: DAMAGE phase ending:`, newState)
  //
  console.groupEnd()

  return newState
  // for all modifiers, switch(move.modifiers) go through every modifier.
  // case ATK_PHASES.APPLY_DAMAGE:// Check if the move has a status effect
}
