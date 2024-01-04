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
import potionTestImg from '../../assets/items/item1.png'
import item2 from '../../assets/items/item2.png'
import item3 from '../../assets/items/item3.png'
import item4 from '../../assets/items/item4.png'
// import item5 from '../../assets/items/item5.png'

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
  effect: { hp: 8 },
  description: 'A tasty apple that heals 5 HP.',
}

export const pumpernickelSoda = {
  name: 'Pumpernickel Soda',
  type: 'drink',
  // effect: { energy: 10 },
  effect: { hp: 30 },
  description: 'A fizzy drink that restores 10 energy points.',
}

export const sampleShopItems = [
  {
    id: 1,
    name: 'Health Potion',
    price: 50,
    image: potionTestImg, // Replace with your image path
    description: 'Restores 50 health points.',
  },
  {
    id: 2,
    name: 'Mana Potion',
    price: 75,
    image: item2,
    description: 'Restores 30 mana points.',
  },
  {
    id: 3,
    name: 'Sword of Valor',
    price: 200,
    image: item3,
    description: 'Increases attack power by 20.',
  },
  {
    id: 4,
    name: 'Shield of Fortitude',
    price: 150,
    image: item4,
    description: 'Increases defense by 15.',
  },
  {
    id: 5,
    name: 'Mystic Orb',
    price: 300,
    image: item2,
    description: 'Grants a 10% chance to dodge attacks.',
  },
  {
    id: 6,
    name: 'Phoenix Feather',
    price: 500,
    image: item3,
    description: 'Revives a fallen monster with full health.',
  },
]
