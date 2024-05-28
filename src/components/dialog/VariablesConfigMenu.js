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
    moves: ['Glow Strike', 'Moonbeam', 'Night Shade'], // Dummy moves data
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
    moves: ['Shadow Leap', 'Dark Pulse', 'Bunny Kick'], // Dummy moves data
  },
]

const VariablesConfigMenu = ({ onPalsChange }) => {
  const [pals, setPals] = useState(initialPals)
  const [currentPage, setCurrentPage] = useState(1)
  const palsPerPage = 5 // Number of pals to display per page
  const scrollableStyle = {
    maxHeight: '50vh',
    overflowY: 'auto',
    '@media (max-width: 640px)': {
      maxHeight: '50vh', // or 'calc(100vh - {height of other elements}px)' if necessary
    },
  }

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

  // Calculate total number of pages and current pals to display
  const indexOfLastPal = currentPage * palsPerPage
  const indexOfFirstPal = indexOfLastPal - palsPerPage
  const currentPals = pals.slice(indexOfFirstPal, indexOfLastPal)
  const totalPages = Math.ceil(pals.length / palsPerPage)

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <div
      className="bg-green-700 text-white p-4 rounded-lg shadow-md max-w-4xl mx-auto"
      style={scrollableStyle}
    >
      <h2 className="text-2xl font-bold mb-4">
        ToolBox - Game Settings - Pals Config
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {' '}
          {/* Adjust grid for responsiveness */}
          {currentPals.map((pal) => (
            <React.Fragment key={pal.id}>
              <div className="md:col-span-2 bg-green-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3">{pal.name}</h3>
                <div className="space-y-2">
                  {Object.entries(pal.stats).map(([statName, value]) => (
                    <div
                      key={statName}
                      className="flex flex-col md:flex-row md:items-center"
                    >
                      <label className="block mb-1 capitalize font-medium">
                        {statName}:
                      </label>
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
                        className="w-full rounded bg-green-900 text-white p-2 text-right"
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Moves column */}
              <div className="md:col-span-1 bg-green-800 p-4 rounded-lg">
                <h4 className="text-lg font-bold mb-3">Moves</h4>
                <ul className="space-y-1">
                  {pal.moves.map((move, index) => (
                    <li key={index} className="font-medium">
                      {move}
                    </li>
                  ))}
                </ul>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-black rounded hover:bg-gray-800 p-2 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-black rounded hover:bg-gray-800 p-2 transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-black rounded hover:bg-gray-800 transition-colors mt-4"
        >
          Apply Changes
        </button>
        <button
          type="button"
          className="w-full p-2 bg-blue-500 rounded hover:bg-blue-700 transition-colors mt-2"
          onClick={() => navigator.clipboard.writeText(JSON.stringify(pals))}
        >
          Copy to Clipboard
        </button>
      </form>
    </div>
  )

  // return (
  //   <div className="bg-green-700 text-white p-1 rounded-lg shadow-md">
  //     <h2 className="text-xl font-pixel font-bold mb-2">ToolBox - Game Settings - Pals Config</h2>
  //     <form onSubmit={handleSubmit} className="space-y-4">
  //       <div className="grid grid-cols-3 gap-4"> {/* Updated grid layout */}
  //         {currentPals.map((pal) => (
  //           <React.Fragment key={pal.id}>
  //             <div className="col-span-2">
  //               <h3 className="font-bold">{pal.name}</h3>
  //               <div className="flex flex-wrap -mx-1">
  //                 {Object.entries(pal.stats).map(([statName, value]) => (
  //                   <div key={statName} className="flex items-center px-1 mb-1 w-1/2 md:w-1/4">
  //                     <label className="block mb-1 capitalize mr-2">{statName}:</label>
  //                     <input
  //                       type="number"
  //                       value={value}
  //                       onChange={(e) =>
  //                         handleStatChange(
  //                           pal.id,
  //                           statName,
  //                           parseInt(e.target.value, 10),
  //                         )
  //                       }
  //                       className="w-full rounded bg-green-900 text-white text-right"
  //                       min="0"
  //                     />
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //             {/* Moves column */}
  //             <div className="col-span-1">
  //               <h4 className="font-bold">Moves</h4>
  //               <ul>
  //                 {pal.moves.map((move, index) => (
  //                   <li key={index}>{move}</li>
  //                 ))}
  //               </ul>
  //             </div>
  //           </React.Fragment>
  //         ))}
  //       </div>
  //       <div className="flex justify-between">
  //         <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>
  //           Previous
  //         </button>
  //         <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
  //           Next
  //         </button>
  //       </div>
  //       <button
  //         type="submit"
  //         className="w-full p-2 bg-black rounded hover:bg-gray-800 transition-colors"
  //       >
  //         Apply Changes
  //       </button>
  //       <button
  //         type="button"
  //         className="w-full p-2 bg-blue-500 rounded hover:bg-blue-700 transition-colors"
  //         onClick={() => navigator.clipboard.writeText(JSON.stringify(pals))}
  //       >
  //         Copy to Clipboard
  //       </button>
  //     </form>
  //   </div>
  // );
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
