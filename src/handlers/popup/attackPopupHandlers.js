export const dispatchDisplayAttackDetails = (
  move,
  contextualDispatch,
  canUse,
  ourCurrentMon,
) => {
  // console.log(`dispatchDisplayAttackDetails: move, ourCurrentMon`, move, ourCurrentMon)
  contextualDispatch({
    type: 'SHOW_ATTACK',
    payload: {
      attack: move,
      ourCurrentMon: ourCurrentMon,
      canUse: canUse,
    },
  })
}
