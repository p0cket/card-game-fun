export const upkeepEnergyRefill = (state) => {
  // energy: state.game.player.energyIncrease = 5 + 1 each ,

  return {
    ...state,
    game: {
      ...state.game,
      player: {
        ...state.game.player,
        energy: state.game.player.energy + state.game.player.energyRefillAmt,
        //         energy: state.game.player.energy + energyIncrease +  ,
        // energy increase +1
      },
    },
  }
}

export const upkeepPermanentEnergyIncrease = (state) => {
  // export const addUpKeepGradualEnergyIncrease = (state) => {

  // TODO instead we'll have energy increase by 1 each turn
  // energy: state.game.player.energyIncrease = 5 + 1 each ,

  return {
    ...state,
    game: {
      ...state.game,
      player: {
        ...state.game.player,
        // energy: state.game.player.energy + 5,
        energyRefillAmt: state.game.player.energyRefillAmt + 1,
        //         energy: state.game.player.energy + energyIncrease +  ,
        // energy increase +1
      },
    },
  }
}

//   // TODO instead we'll have energy increase by 1 each turn
//   // energy: state.game.player.energyIncrease = 5 + 1 each ,

//   return {
//     ...state,
//     game: {
//       ...state.game,
//       player: {
//         ...state.game.player,
//         energy: state.game.player.energy + 5,
//         //         energy: state.game.player.energy + energyIncrease +  ,
//         // energy increase +1
//       },
//     },
//   }
// }

//   // TODO instead we'll have energy increase by 1 each turn
//   // energy: state.game.player.energyIncrease = 5 + 1 each ,

//   return {
//     ...state,
//     game: {
//       ...state.game,
//       player: {
//         ...state.game.player,
//         energy: state.game.player.energy + 5,
//         //         energy: state.game.player.energy + energyIncrease +  ,
//         // energy increase +1
//       },
//     },
//   }
// }
