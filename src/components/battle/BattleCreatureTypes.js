import React from 'react'

function BattleCreatureTypes({ourCurrentMon}) {
  return (
       <div className="flex bg-boy-green text-boy-lightgreen mx-2 px-3 gap-1 justify-between w-full">
       <div className="flex justify-around gap-1">
         <div>{ourCurrentMon.creature_type}</div>{' '}
         <div>{ourCurrentMon.specialty_group}</div>
         <div>{ourCurrentMon.nature}</div>
       </div>
       <div className="flex gap-1">
         <div>
           +
           {ourCurrentMon.strengths.map((strength, index) => (
             <span key={index}>{strength}, </span>
           ))}
         </div>
         <div>
           -
           {ourCurrentMon.weaknesses.map((weakness, index) => (
             <span key={index}>{weakness}, </span>
           ))}
         </div>
       </div>
     </div>
  )
}

export default BattleCreatureTypes