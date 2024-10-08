import React, { useState } from 'react'
import { PLAYERS } from '../../consts/consts'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { moveTypes } from '../../consts/battleConsts'
import BasicAttackDisplay from '../battle/menus/BasicAttackDisplay'

// Change to Attack
const RenderIndAttack = ({
  attack,
  state,
  dispatch,
  togglePopup,
  pal,
  canUse,
}) => {
  const [attackType, setAttackType] = useState(moveTypes.BASIC) 

  const runMove = (move, pal) => {
    togglePopup()
    executeMove(
      dispatch,
      {
        pal: pal,
        move: move,
        phase: ATK_PHASES.PAY,
        userSlot: 0,
        targets: { ally: null, enemy: [0] },
        player: PLAYERS.HUMAN,
        possessed: false,
      },
      state,
    )
  }

  const moveFormToRender = (move, pal) => {
    if (attackType === moveTypes.BASIC) {
      return (
        <BasicAttackDisplay move={move} pal={pal} runMove={runMove} canUse={canUse} />
      )
    }
  }

  return (
    <div className="border border-green-400 flex flex-col items-stretch p-1 my-1 bg-boy-lightgreen">
      {moveFormToRender(attack, pal)}
    </div>
  )
}

export default RenderIndAttack

// Replaces:
// import React, { useState } from 'react'
// import { PLAYERS, energyEmoji } from '../../consts/consts'
// import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
// import stunImg from './../../assets/packImages/Stun.png'
// import { ACTIONS } from '../../MainContext'

// function RenderIndAttack({
//   attack,
//   state,
//   dispatch,
//   togglePopup,
//   pal,
//   canUse,
// }) {
//   console.log(
//     `RenderIndAttack: attack, state, dispatch, pal`,
//     attack,
//     state,
//     dispatch,
//     pal,
//   )
//   const [attackType, setAttackType] = useState('basic') // Default to 'basic' attack
//   const {
//     name,
//     type,
//     damage,
//     speed,
//     fuel,
//     effect,
//     priority,
//     targets,
//     notSoFast,
//     forceful,
//   } = attack
//   const runMove = (move, pal) => {
//     console.log(`runMove:  togglePopup`, togglePopup)
//     togglePopup()
//     console.log('executeMove params:', dispatch, {
//       pal: pal,
//       move: move,
//       phase: ATK_PHASES.PAY,
//       userSlot: 0,
//       targets: { ally: null, enemy: [0] },
//       player: PLAYERS.HUMAN,
//       possessed: false,
//     })
//     executeMove(
//       dispatch,
//       {
//         // attack:
//         pal: pal,
//         move: move,
//         phase: ATK_PHASES.PAY,
//         // actionDetails:
//         userSlot: 0,
//         targets: { ally: null, enemy: [0] },
//         player: PLAYERS.HUMAN,
//         possessed: false,
//       },
//       state,
//     )
//   }
//   const renderBasic = (move, pal) => {
//     const { name, damage, accuracy, effect, targets, cost } = move
//     const { chance, result, amt } = effect

//     return (
//       <div className="bg-boy-lightgreen p-1 rounded shadow">
//         <div className="flex justify-between mb-2">
//           {/* <div className="p-1 m-1 bg-green-600">
//             <img src={stunImg} alt={name} className="w-28" />
//           </div> */}
//           <table>
//             <tbody>
//               <tr>
//                 <td className="text-gray-600 text-left">Damage:</td>
//                 <td>{damage}</td>
//               </tr>
//               <tr>
//                 <td className="text-gray-600 text-left">Accuracy:</td>
//                 <td>{accuracy}%</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className="text-left">
//           {chance && result && amt && (
//             <div>{`${chance}% Chance: May ${result} ${amt} `}</div>
//           )}
//           <div>Targets: {targets.join(', ')}</div>{' '}
//           <div className="mb-2 text-green-700">{effect.description}</div>
//         </div>
//         {canUse && (
//           <div className="flex gap-2 justify-center">
//             <button
//               className="w-3/4 bg-boy-green text-white cursor-pointer py-2 px-4 mt-2 text-lg font-bold shadow"
//               onClick={() => runMove(attack, pal)}
//             >
//               Use ({cost.energy} {energyEmoji})
//             </button>
//           </div>
//         )}
//       </div>
//     )
//   }

//   const renderForceful = (move) => {
//     return (
//       <div className="flex flex-col">
//         <div className="flex">
//           <div>
//             {forceful.fuel}
//             {energyEmoji}
//           </div>
//           <div>Speed: {forceful.speed}</div>
//           <div>{forceful.damage}DMG</div>
//           <div>{forceful.type}</div>
//         </div>
//         <div>Effect: {forceful.effect.description}</div>
//         <div>chance: {forceful.effect.chance}</div>
//         <div>result: {forceful.effect.result}</div>
//         <div>Targets: {forceful.targets.join(', ')}</div>
//       </div>
//     )
//   }

//   const renderCounter = (move) => {
//     return <div>CounterAttack</div>
//   }

//   const moveFormToRender = (move, pal) => {
//     if (attackType === 'basic') {
//       return renderBasic(move, pal)
//     } else if (attackType === 'forceful') {
//       return renderForceful(move)
//       // counter
//     } else if (attackType === 'notSoFast') {
//       return renderCounter(move)
//     }
//   }
//   return (
//     <div className="border border-green-400 flex flex-col items-stretch p-1 my-1 bg-boy-lightgreen">
//       {moveFormToRender(attack, pal)}
//     </div>
//   )
// }

// export default RenderIndAttack
// {
//   /* <div className="flex">
//         <div
//           className={`px-2 py-1 text-lg font-bold rounded shadow cursor-pointer mx-1 ${
//             attackType === 'basic'
//               ? 'bg-boy-green text-white'
//               : 'bg-gray-600 text-black'
//           }`}
//           onClick={() => setAttackType('basic')}
//         >
//           {attack.name}
//         </div>
//       </div> */
// }

// // Add:  attack speed?
// {
//   /* <tr>
//                 <td className="text-gray-600 text-left">Speed:</td>
//                 <td>{speed}</td>
//               </tr> */
// }
