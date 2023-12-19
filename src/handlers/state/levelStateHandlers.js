// state.oppoonent = {
// }
// make the battle opponent object equal
// the on in current

export const setPalEnergyToMax = (state) => {
  // give max energy
  state = {
    ...state,
    game: {
      ...state.game,
      player: {
        ...state.game.player,
        energy: state.game.player.maxEnergy,
      },
    },
  }
  return state
}

export const setPalHPToMax = (state) => {
  // set hp to max
  state = {
    // state.opponent.monsters[0].obj.stats.hp
    ...state,
    opponent: {
      ...state.opponent,
      monsters: [
        {
          ...state.opponent.monsters[0],
          obj: {
            ...state.opponent.monsters[0].obj,
            stats: {
              ...state.opponent.monsters[0].obj.stats,
              hp: state.opponent.monsters[0].obj.stats.max_hp,
            },
          },
        },
      ],
    },
  }
  return state
}

export const logLevelsCompletedData = (state) => {
  // now lets add the current level, or an increment to a
  // varaible. we'll add it in completedLevels
  state = {
    // state.current is this below:
    //   current: {
    // level: 0,
    // act: 1,
    // completedLevels: [],
    ...state,
    current: {
      ...state.current,
      completedLevels: [
        ...state.current.completedLevels,
        [
          state.current.level,
          state.current.act,
          state.current.curEvent,
          state.current.scene,
          state.current.incomingLevels,
        ],
      ],
    },
  }
  return state
}
