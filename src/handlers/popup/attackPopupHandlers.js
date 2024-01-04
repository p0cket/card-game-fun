export const showTheAttack = (
  move,
  contextualDispatch,
  canUse,
  ourCurrentMon,
) => {
  console.log(`move`, move)
  console.log(`ourCurrentMon`, ourCurrentMon)
  contextualDispatch({
    type: 'SHOW_ATTACK',
    payload: {
      attack: move,
      ourCurrentMon: ourCurrentMon,
      canUse: canUse,
    },
  })
}
