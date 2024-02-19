import React, { useState } from 'react'

// Initial dummy data for a few pals
const initialPals = [
  {
    id: 'luminowl',
    name: 'Luminowl',
    stats: {
      hp: 111,
      attack: 80,
      defense: 60,
      specialAttack: 120,
      specialDefense: 90,
      speed: 110,
    },
  },
  {
    id: 'umbrabunny',
    name: 'Umbrabunny',
    stats: {
      hp: 92,
      attack: 60,
      defense: 70,
      specialAttack: 80,
      specialDefense: 110,
      speed: 120,
    },
  },
]

const VariablesConfigMenu = ({ onPalsChange }) => {
  const [pals, setPals] = useState(initialPals)

  const handleStatChange = (palId, statName, newValue) => {
    setPals((pals) =>
      pals.map((pal) =>
        pal.id === palId
          ? {
              ...pal,
              stats: {
                ...pal.stats,
                [statName]: newValue,
              },
            }
          : pal,
      ),
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onPalsChange(pals)
  }

  return (
    <div className="bg-green-700 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-pixel font-bold mb-4">Pals Configuration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {pals.map((pal) => (
          <div key={pal.id} className="mb-4">
            <h3 className="font-bold">{pal.name}</h3>
            {Object.entries(pal.stats).map(([statName, value]) => (
              <div key={statName} className="mb-2">
                <label className="block mb-1 capitalize">{statName}:</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    handleStatChange(
                      pal.id,
                      statName,
                      parseInt(e.target.value, 10),
                    )
                  }
                  className="w-full p-2 rounded bg-green-900 text-white"
                  min="0"
                />
              </div>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="w-full p-2 bg-black rounded hover:bg-gray-800 transition-colors"
        >
          Apply Changes
        </button>
      </form>
    </div>
  )
}

export default VariablesConfigMenu

// import React, { useState } from 'react'

// const VariablesConfigMenu = ({ onVariablesChange }) => {
//   // Expanded variables to include specific stats for pals and moves
//   const [variables, setVariables] = useState({
//     palHpModifier: 1,
//     palAttackModifier: 1,
//     moveDamageModifier: 1,
//     moveEnergyCostModifier: 1,
//   })

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setVariables((prev) => ({ ...prev, [name]: parseFloat(value) }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onVariablesChange(variables)
//   }

//   return (
//     <div className="bg-green-700 text-white p-4 rounded-lg shadow-md">
//       <h2 className="text-xl font-pixel font-bold mb-4">
//         Variables Configuration
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {Object.entries(variables).map(([key, value]) => (
//           <div key={key}>
//             <label htmlFor={key} className="block mb-2 capitalize">
//               {key.replace(/([A-Z])/g, ' $1').trim()} Modifier:
//             </label>
//             <input
//               type="number"
//               id={key}
//               name={key}
//               value={value}
//               onChange={handleInputChange}
//               className="w-full p-2 rounded bg-green-900 text-white"
//               step="0.1"
//               min="0"
//             />
//           </div>
//         ))}
//         <button
//           type="submit"
//           className="w-full p-2 bg-black rounded hover:bg-gray-800 transition-colors"
//         >
//           Apply Changes
//         </button>
//       </form>
//     </div>
//   )
// }

// export default VariablesConfigMenu

// import React, { useState } from 'react'

// const VariablesConfigMenu = ({ onVariablesChange }) => {
//   const [variables, setVariables] = useState({
//     palStatModifier: 1,
//     moveStatModifier: 1,
//   })

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setVariables((prev) => ({ ...prev, [name]: parseFloat(value) }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onVariablesChange(variables)
//   }

//   return (
//     <div className="bg-green-700 text-white p-4 rounded-lg shadow-md">
//       <h2 className="text-xl font-pixel font-bold mb-4">
//         Variables Configuration
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="palStatModifier" className="block mb-2">
//             Pal Stat Modifier:
//           </label>
//           <input
//             type="number"
//             id="palStatModifier"
//             name="palStatModifier"
//             value={variables.palStatModifier}
//             onChange={handleInputChange}
//             className="w-full p-2 rounded bg-green-900 text-white"
//             step="0.1"
//             min="0"
//           />
//         </div>
//         <div>
//           <label htmlFor="moveStatModifier" className="block mb-2">
//             Move Stat Modifier:
//           </label>
//           <input
//             type="number"
//             id="moveStatModifier"
//             name="moveStatModifier"
//             value={variables.moveStatModifier}
//             onChange={handleInputChange}
//             className="w-full p-2 rounded bg-green-900 text-white"
//             step="0.1"
//             min="0"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full p-2 bg-black rounded hover:bg-gray-800 transition-colors"
//         >
//           Apply Changes
//         </button>
//       </form>
//     </div>
//   )
// }

// export default VariablesConfigMenu
