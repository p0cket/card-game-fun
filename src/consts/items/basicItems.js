// Here we list all the items in the game
// lets flesh out these items in our bag:
// bag: {
//     runes: ['Stick', `Coat of harms`],
//     items: [
//   { name: 'apple', quantity: 1 },
//   { name: 'Pumpernickel Soda', quantity: 1 },
//   { name: 'Potion', quantity: 3 },
//   { name: 'Super Potion', quantity: 1 },
//   { name: 'Hyper Potion', quantity: 0 },
//   // Add more items as needed
// ],
//   },

export const stick = {
  name: 'Stick',
  type: 'rune',
  effect: { attack: 1 },
  description: 'A simple stick that provides a minimal attack boost.',
}

export const coatOfHarms = {
  name: 'Coat of harms',
  type: 'rune',
  effect: { defense: 2 },
  description: 'A mystical coat that slightly increases your defense.',
}

export const potion = {
  name: 'Potion',
  type: 'healing',
  effect: { hp: 20 },
  description: 'Heals 20 HP of one creature.',
}

export const superPotion = {
  name: 'Super Potion',
  type: 'healing',
  effect: { hp: 50 },
  description: 'Heals 50 HP of one creature.',
}

export const hyperPotion = {
  name: 'Hyper Potion',
  type: 'healing',
  effect: { hp: 200 },
  description: 'Heals 200 HP of one creature.',
}

export const apple = {
  name: 'Apple',
  type: 'food',
  effect: { hp: 5 },
  description: 'A tasty apple that heals 5 HP.',
}

export const pumpernickelSoda = {
  name: 'Pumpernickel Soda',
  type: 'drink',
  effect: { energy: 10 },
  description: 'A fizzy drink that restores 10 energy points.',
}

// const useItem = (itemName) => {
//   // Find the item in the bag
//   const item = bag.items.find((i) => i.name === itemName)
//   if (item && item.quantity > 0) {
//     console.log(`Using ${itemName}...`)
//     // Apply the item's effect based on its type
//     switch (item.type) {
//       case 'healing':
//         // Implement healing logic here
//         break
//       case 'rune':
//         // Implement rune application logic here
//         break
//       // Handle other item types as needed
//     }
//     // Reduce the quantity of the item
//     item.quantity -= 1
//     // Update the game state with the new bag contents
//     // This could involve dispatching a Redux action or
//     // setting local state, depending on your setup
//   } else {
//     console.log(`You don't have any ${itemName} left.`)
//   }
// }
