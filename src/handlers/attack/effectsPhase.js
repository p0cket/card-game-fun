export const effectsPhase = (move, doesItLand, targetMonster) => {
  console.log(`effects: starting effects phase`)
  // 4. Apply statuses

  // const stateWithStatusesApplied = applyStatuses(move, user) // switch(move.statuses)
  if (move.effect && doesItLand) {
    const effect = move.effect.result
    // Implement logic to apply the status effect (e.g., set 'blind' status)
    // if it has an effect, run it through the effects switch case
    // abstract the logic out into its' own file
    // For example:
    switch (effect) {
      case 'blind':
        // apply blind
        // Dialogue: applying blind
        console.log(`applying blind to ${targetMonster.name}`)
        //applyEffect("blind", targetMonster)
        //evasion less
        // acuracy less
        // note the effect is applied to the target
        targetMonster.status.blind = true
        break
      case 'buff':
        // apply buff
        // Dialogue: applying buff
        targetMonster.stats.attack += 2
        break
      default:
        console.log(`default case for hero buffs applied`)
    }
    // 6. Resolve End Steps (is this taken care of here?)
    // Dialogue: ___ is taking x poison damage (or any other effect)
    // const stateWithEndStepsResolved = resolveEndSteps(move, user) // switch(move.endStepsTriggers)
    // if theres poison, apply damage. it theres sleep, see if it wakes, etc.
  }
}
