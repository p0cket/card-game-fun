//allModifyers.js instead?
import { applyBlind, applyWeak } from '../../handlers/state/statusStateHandlers'
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
  description:
    'Applies the blind status to the target, reducing their accuracy from 100%.',
  type: 'Modifier',
  effect: applyBlind,
  stackable: false,
  targets: 'creature',
  duration: 1, // Duration can be adjusted as needed
  name: 'Blind',
}

export const Weak = {
  description:
    'Applies the weak status to the target, reducing their damage dealt.',
  type: 'Modifier',
  effect: applyWeak,
  stackable: false,
  targets: 'creature',
  duration: 1, // Duration can be adjusted as needed
  name: 'Weak',
}
