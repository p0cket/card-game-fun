//allModifyers.js instead?
import { applyBlind, applyBuff, applyPoison, applyWeak } from '../../handlers/state/statusStateHandlers'
// export const Stun = {
//     description:
//       'Stuns the target for a duration, preventing them from taking actions during that time.',
//     type: 'Modifier',
//     effect: (target, source) => {
//       // Define the stun effect here
//     },
//     stackable: false,
//     targets: 'creature',
//     duration: 2, // Stunned for 2 turns
//   }
export const Blind = {
  // description:
  //   'Applies the blind status to the target, reducing their accuracy from 100%.',
  description:
    'Lowers Accuracy by the amount',
  
  type: 'Modifier',
  effect: applyBlind,
  stackable: false,
  targets: 'creature',
  duration: 1, // Duration can be adjusted as needed
  name: 'Blind',
}

export const Weak = {
  // description:
  //   'Applies the weak status to the target, reducing their damage dealt.',
  description:
  'Reduces damage dealt by this creature',
  type: 'Modifier',
  effect: applyWeak,
  stackable: false,
  targets: 'creature',
  duration: 1, // Duration can be adjusted as needed
  name: 'Weak',
}

export const Poison = {
  // description:
  //   'Applies the weak status to the target, reducing their damage dealt.',
  description: 'Deals poison damage each turn.',
  type: 'Modifier',
  effect: applyPoison,
  stackable: false,
  targets: 'creature',
  duration: 1, // Duration can be adjusted as needed
  name: 'Poison',
}

export const Buff = {
  // description:
  //   'Applies the weak status to the target, reducing their damage dealt.',
  description: 'Increases damage output.',
  type: 'Modifier',
  effect: applyBuff,
  stackable: false,
  targets: 'creature',
  duration: 1, // Duration can be adjusted as needed
  name: 'Buff',
}