


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
