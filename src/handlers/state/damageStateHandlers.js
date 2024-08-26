import { DIALOGS } from '../../components/dialog/DialogManager'
import { createPopupRemovedState } from '../dialog/basicDialogHandlers'
import { switchDialog } from '../dialog/energyDialogHandler'
import { ATK_PHASES } from '../moveHandlers'
// allTargets.allyTargets.forEach((target, index) => {
//   // ...damage calculation...
//   newState = createHumanDamagedState(newState, damagedHP, index);
// });

// allTargets.enemyTargets.forEach((target, index) => {
//   // ...damage calculation...
//   newState = createEnemyDamagedState(newState, damagedHP, index); // Assuming you have a similar function for enemies
// });
export const createAIDamagedState = (ourState, damagedHP) => {
  console.log(
    'ourState.opponent.monsters[0], damagedHP',
    ourState.opponent.monsters[0],
    damagedHP,
  )

  let resultState = {
    ...ourState,
    opponent: {
      ...ourState.opponent,
      monsters: ourState.opponent.monsters.map((monster, index) =>
        index === 0
          ? {
              ...monster,
              stats: {
                ...monster.stats,
                hp: damagedHP,
              },
            }
          : monster,
      ),
    },
  }
  console.log('resultState after damaged:', resultState)
  return resultState
}
export const createHumanDamagedState = (ourState, damagedHP) => {
  console.log('ourState.userParty[0]:', ourState.userParty[0], ourState)
  let resultState = {
    ...ourState,
    userParty: ourState.userParty.map((partyMember, index) =>
      index === 0
        ? {
            ...partyMember,
            stats: {
              ...partyMember.stats,
              hp: damagedHP,
            },
          }
        : partyMember,
    ),
  }
  console.log('resultState after damaged:', resultState)
  return resultState
}

export const ifWeakDoLessDamage = (userPal, dmg) => {
  if (userPal.status && userPal.status.weak) {
    console.log(
      `Applying weakness, reducing damage (${dmg}) by ${
        userPal.status.weak.effect
      }. Dmg is now ${dmg - userPal.status.weak.effect}`,
    )
    //one
    dmg -= userPal.status.weak.effect
  }
  console.log(`dmg result: ifWeakDoLessDamage: ${dmg}`)
  return dmg
}

export const ifBuffDoMoreDamage = (userPal, dmg) => {
  if (userPal.status && userPal.status.buff) {
    console.log(
      `Applying buff, increasing damage (${dmg}) by ${
        userPal.status.buff.effect
      }. Dmg is now ${dmg + parseInt(userPal.status.buff.effect, 10)}`,
    )
    //one
    const buffEffect = parseInt(userPal.status.buff.effect, 10)
    if (!isNaN(buffEffect)) {
      dmg += buffEffect
    } else {
      console.error(
        `buff.effect is not a number: ${userPal.status.buff.effect}`,
      )
    }
  }
  console.log(`dmg result: ifBuffDoLessDamage: ${dmg}`)
  return dmg
}

export const lowerAttackDamageInState = (newState, userPal, newDmgAmt) => {
  // Adjusts the damage in the state and returns the updated state object.
  if (userPal.status && userPal.status.weak) {
    console.log(
      `Applying weakness, reducing damage (${newDmgAmt}) by ${
        userPal.status.weak.effect
      }. newDmgAmt is now ${newDmgAmt - userPal.status.weak.effect}`,
    )
    // newDmgAmt -= userPal.status.weak.amt
    newState = {
      ...newState,
      attack: {
        ...newState.attack,
        move: {
          ...newState.attack.move,
          damage: newDmgAmt - userPal.status.weak.effect,
        },
      },
    }
  }
  // apply the weak to the attack itself
  newState = appendAttackDebuffState(newState, userPal.status.weak)
  console.log(`newDmgAmt result sate after lowerDamageByWeak`, newState)
  return newState // Returns the full state object with the new damage applied.
}
export const appendAttackDebuffState = (newState, debuff) => {
  newState = {
    ...newState,
    attack: {
      ...newState.attack,
      debuffs: newState.attack.debuffs
        ? [...newState.attack.debuffs, debuff]
        : [debuff],
    },
  }
  console.log(
    `newState result after appending debuff: appendAttackDebuffState`,
    newState,
  )
  return newState
}

//these two (AI vs human) could be one
export const runDmgHuman = (newState, targetPal, move, dmgAmt) => {
  console.log(`ATK: DMG phase: targetPal, move`, targetPal, move)
  // add the Effects Handler here:
  //  newState = dmgEffectsHandler(newState, pal, 0)
  let ourDmg = dmgAmt
  let damagedHP = targetPal.stats.hp - ourDmg
  console.log( `AI pal's HP ${targetPal.stats.hp} - ${ourDmg}dmg = ${damagedHP}`,
    `dmg b4 the createAIDamagedState, 'AI' pal's HP is now ${damagedHP}`,
    newState,
  )
  newState = createAIDamagedState(newState, damagedHP)
  console.log(`createAIDamagedState:`, newState)

  //change to the right amount of damage dialog
  newState = switchDialog(newState, DIALOGS.DAMAGED_PAL_AI)
  console.log(`dmg after the createAIDamagedState:`, newState)
  return newState
}
export const runDmgAI = (newState, targetPal, move, dmgAmt) => {
  console.log(
    `Player is AI: newState.userParty`,
    newState.userParty,
    `ATK: DMG phase: targetPal, move`,
    targetPal,
    move,
    `The AI damage to be dealt is ${dmgAmt}.
This will result in targetPal.stats.hp (${targetPal.stats.hp})
 at: ${targetPal.stats.hp - dmgAmt}`,
  )
  let damagedHP = targetPal.stats.hp - dmgAmt
  newState = createHumanDamagedState(newState, damagedHP)
  newState = switchDialog(newState, DIALOGS.DAMAGED_PAL_HUMAN)
  console.log(`After createHumanDamagedState:`, newState)
  console.log(`ATK: DAMAGE phase ending:`, newState)
  return newState
}
