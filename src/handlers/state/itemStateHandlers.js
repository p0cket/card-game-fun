export const subtractItem = (state, item) => {
  console.log('item, state.bag.items', item, state.bag.items)

  // Adjusting to work with the flat item structure
  const index = state.bag.items.findIndex((i) => i.name === item.name)

  if (index === -1) {
    console.error('Invalid item passed to subtractItem:', item)
    return state // Return the original state if the item is not found
  }

  const updatedItems = state.bag.items.map((i, idx) => {
    if (idx === index) {
      const updatedQty = i.qty - 1
      return { ...i, qty: updatedQty >= 0 ? updatedQty : 0 } // Prevent qty from going negative
    }
    return i
  })

  // Filtering out items with qty of 0 to remove them from inventory
  const filteredItems = updatedItems.filter((i) => i.qty > 0)

  const newState = {
    ...state,
    bag: {
      ...state.bag,
      items: filteredItems,
    },
  }

  return newState
}
