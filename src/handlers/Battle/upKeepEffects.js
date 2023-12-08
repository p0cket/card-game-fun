export const addUpKeepEffects = (state) => {
  return {
    ...state,
    game: {
      ...state.game,
      player: {
        ...state.game.player,
        energy: state.game.player.energy + 5,
      },
    },
  }
}
