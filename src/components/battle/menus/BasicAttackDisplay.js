import React from 'react'
import { energyEmoji } from '../../../consts/consts'
// import PropTypes from 'prop-types'
// import { energyEmoji } from '../../consts/consts'

const BasicAttackDisplay = ({ move, pal, runMove, canUse }) => {
  const { name, damage, accuracy, effect, targets, cost } = move
  const { chance, result, amt } = effect

  return (
    <div className="bg-boy-lightgreen p-1 rounded shadow">
      <div className="flex justify-between mb-2">
        <table>
          <tbody>
            <tr>
              <td className="text-gray-600 text-left">Damage:</td>
              <td>{damage}</td>
            </tr>
            <tr>
              <td className="text-gray-600 text-left">Accuracy:</td>
              <td>{accuracy}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-left">
        {chance && result && amt && (
          <div>{`${chance}% Chance: May ${result} ${amt} `}</div>
        )}
        <div>Targets: {targets.join(', ')}</div>
        <div className="mb-2 text-green-700">{effect.description}</div>
      </div>
      {canUse && (
        <div className="flex gap-2 justify-center">
          <button
            className="w-3/4 bg-boy-green text-white cursor-pointer py-2 px-4 mt-2 text-lg font-bold shadow"
            onClick={() => runMove(move, pal)}
          >
            Use ({cost.energy} {energyEmoji})
          </button>
        </div>
      )}
    </div>
  )
}

export default BasicAttackDisplay

// When ready for forceful attacks, add the component
// import React from 'react';
// import PropTypes from 'prop-types';
// import { energyEmoji } from '../../consts/consts';

// const RenderForceful = ({ move }) => {
//   const { forceful } = move;
//   return (
//     <div className="flex flex-col">
//       <div className="flex">
//         <div>
//           {forceful.fuel}
//           {energyEmoji}
//         </div>
//         <div>Speed: {forceful.speed}</div>
//         <div>{forceful.damage}DMG</div>
//         <div>{forceful.type}</div>
//       </div>
//       <div>Effect: {forceful.effect.description}</div>
//       <div>chance: {forceful.effect.chance}</div>
//       <div>result: {forceful.effect.result}</div>
//       <div>Targets: {forceful.targets.join(', ')}</div>
//     </div>
//   );
// };

// RenderForceful.propTypes = {
//   move: PropTypes.object.isRequired,
// };

// export default RenderForceful;

//Same with Counters
// import React from 'react';
// import PropTypes from 'prop-types';

// const RenderCounter = ({ move }) => {
//   return <div>CounterAttack</div>;
// };

// RenderCounter.propTypes = {
//   move: PropTypes.object.isRequired,
// };

// export default RenderCounter;
