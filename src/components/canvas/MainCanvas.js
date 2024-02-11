// import React from 'react'
// // import GameCanvas from './components/Canvas/GameCanvas';
// // import useGameLogic from './hooks/useGameLogic';
// // import DialogueMenu from './components/UI/DialogueMenu';
// import GameCanvas from './components/GameCanvas'
// import useGameLogic from './hooks/useGameLogic'
// import CanvasDialogeMessage from './UI/CanvasDialogeMessage'

// const MainCanvas = () => {
//   const {
//     playerPosition,
//     npcPositions,
//     boundaries,
//     showDialogue, // This matches the state variable name
//     setShowDialogue, // Function to toggle dialogue visibility
//     showBoundaryBackgrounds,
//     toggleBoundaryBackgrounds, // Function to toggle boundary backgrounds
//   } = useGameLogic()

//   return (
//     <div>
//       <GameCanvas
//         playerPosition={playerPosition}
//         npcPositions={npcPositions}
//         boundaries={boundaries}
//         showBoundaryBackgrounds={showBoundaryBackgrounds}
//       />
//       {showDialogue && (
//         <CanvasDialogeMessage onClose={() => setShowDialogue(false)} />
//       )}
//       {/* Additional UI components */}
//     </div>
//   )
// }

// export default MainCanvas
