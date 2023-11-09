import { createPopupVisibleState } from "../dialog/basicDialogHandlers"
import { ATK_PHASES, executeMove } from "../moveHandlers"
import { createCleanupDialogState } from "../state/statusStateHandlers"


export const cleanupPhase = (
  contextualState,
  contextualDispatch,
  user,
  move,
) => {
  let nextState = contextualState//we create a new state because we have to return something at the end
  console.log(
    `effects: phase start:
  contextualState, contextualDispatch, user, move`,
    contextualState,
    contextualDispatch,
    user,
    move,
  )

  const cleanupOptions = [
    {
      label: `Cleaning up - end of turn effects`,
      onClick: () => {
        console.log(`Clicked cleaning up'`)
        //doesn't need to return anything because it runs again
        executeMove(
          move,
          nextState,
          contextualDispatch,
          user,
          ATK_PHASES.END, // phase,
        )
      },
      backgroundColor: '#4b770e',
      color: '#fff',
    },
  ]

  // nextState = createCleanupDialogState(
  //   nextState,
  //   contextualDispatch,
  //   user,
  //   move,
  // )
  nextState = createPopupVisibleState({
    prevState: nextState,
    message: `cleaning up..
    any status end of turn effects applied to the opponent`,
    options: cleanupOptions,
    header: `good turn`,
    title: 'Cleanup phase',
  })



  // DO ALL THE  END OF TURN THINGS HERE:

  console.log(`effects: phase ending`)
  return nextState
}
 // const stateWithStatusesApplied = applyStatuses(move, user) // switch(move.statuses)
  // if (move.effect && doesItLand) {
  //   console.log(`move.effect is ${move.effect.result} && lands`, move)
  //   const effect = move.effect.result
  //   switch (effect) {
  //     case 'blind':
  //       // Dialogue: applying blind
  //       console.log(`applying blind to ${targetMonster.name}`)
  //       //applyBlind(targetMonster)
  //       //evasion less
  //       // acuracy less
  //       // note the effect is applied to the target
  //       targetMonster.status.blind = true
  //       break
  //     case 'buff':
  //       // applyBuff(targetMonster)
  //       // Dialogue: applying buff
  //       targetMonster.stats.attack += 2
  //       break
  //     default:
  //       console.log(`default case for hero buffs applied`)
  //   }
  //   // 6. Resolve End Steps (is this taken care of here?)
  //   // Dialogue: ___ is taking x poison damage (or any other effect)
  //   // const stateWithEndStepsResolved = resolveEndSteps(move, user) // switch(move.endStepsTriggers)
  // }
  // This currently means nothing but we'll add the effects and send back