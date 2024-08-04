import React from 'react'
import EnergyBar from '../EnergyBar'
import { dispatchDisplayAttackDetails } from '../../../handlers/popup/attackPopupHandlers'
import { MeteorStrike } from '../../../consts/allMoves'
import { viewConsts } from '../../../consts/battleConsts'

const AttackButtons = ({
  energy,
  maxEnergy,
  energyEmoji,
  ourCurrentMon,
  contextualDispatch,
  contextualState,
  setCurrentView,
}) => {
  return (
    <div className="flex flex-grow justify-around items-center bg-[#5a7d2a]">
      {/* Energy bar component */}
      <EnergyBar
        energy={energy}
        maxEnergy={maxEnergy}
        energyEmoji={energyEmoji}
      />

      <div className="border border-gray-400 rounded-sm flex p-2 flex-grow flex-col font-[silkscreen]">
        {ourCurrentMon.moves.map((move, index) => (
          <div
            className="cursor-pointer text-sm text-white"
            key={index}
            onClick={() =>
              dispatchDisplayAttackDetails(
                move,
                contextualDispatch,
                true,
                ourCurrentMon,
              )
            }
          >
            {move.name}
          </div>
        ))}

        {/* Debug mode and limit break option */}
        {contextualState.debug && contextualState.debug.isOpen && (
          <>
            <div>DEBUG / LIMIT BREAK</div>
            <div
              className="cursor-pointer text-sm text-white"
              onClick={() =>
                dispatchDisplayAttackDetails( //replacing showTheAttack()
                  MeteorStrike,
                  contextualDispatch,
                  true,
                  ourCurrentMon,
                )
              }
            >
              {MeteorStrike.name}
            </div>
          </>
        )}

        {/* close to MENU */}
        <div onClick={() => setCurrentView(viewConsts.MENU)}>
          <div className="text-white bg-boy-green-500 flex justify-end">x</div>
        </div>
      </div>
    </div>
  )
}

export default AttackButtons

// const AttackButtons = () => (
//     <div className="flex flex-grow justify-around items-center bg-[#5a7d2a]">
//       {/* <div className="font-[silkscreen] flex-none w-1/4 items-center justify-center text-sm text-white">
//         {energy} Energy {energyEmoji}
//       </div> */}
//       <EnergyBar energy={energy} maxEnergy={maxEnergy} energyEmoji={energyEmoji} />

//       <div className="border border-gray-400 rounded-sm flex p-2 flex-grow flex-col font-[silkscreen]">
//         {ourCurrentMon.moves.map((move, index) => (
//           <div
//             className="cursor-pointer text-sm text-white"
//             key={index}
//             onClick={() =>
//               dispatchDisplayAttackDetails(move, contextualDispatch, true, ourCurrentMon)
//             }
//           >
//             {move.name}
//           </div>
//         ))}
//         {contextualState.debug && contextualState.debug.isOpen ? (
//           <div>DEBUG / LIMIT BREAK</div>
//         ) : (
//           ''
//         )}
//         {/*  */}
//         {contextualState.debug && contextualState.debug.isOpen && (
//           <div
//             className="cursor-pointer text-sm text-white"
//             onClick={() =>
//               dispatchDisplayAttackDetails(
//                 MeteorStrike,
//                 contextualDispatch,
//                 true,
//                 ourCurrentMon,
//               )
//             }
//           >
//             {MeteorStrike.name}
//           </div>
//         )}
//         <div onClick={() => setCurrentView(viewConsts.MENU)}>
//           <div className="text-white bg-boy-green-500 flex justify-end">x</div>
//         </div>
//       </div>
//     </div>
//   )
