export const subtractItem = (state, item) => {
  console.log('item, state.bag.items', item, state.bag.items)

  if (!item.obj) {
    console.error('Invalid item passed to subtractItem:', item)
    return state // Return the original state if the item is not valid
  }

  const newState = {
    ...state,
    bag: {
      ...state.bag,
      items: state.bag.items.map((i) => {
        if (i.obj && i.obj.name === item.obj.name) {
          return { ...i, qty: i.qty > 0 ? i.qty - 1 : 0 } // Ensure quantity doesn't go negative
        }
        return i
      }),
    },
  }

  return newState
}
