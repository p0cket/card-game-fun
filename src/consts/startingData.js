import { PLAYERS, startingDeck } from './consts'
import { EFFECTS } from '../effects'
import { SCENES } from '../handlers/sceneHandlers_new'
import { opponent, userParty } from './party/parties'
import { generateMap } from './mapGenerator_new'
import { placeholderTrainer } from './party/trainers'
import { LightBeam } from './allMoves'
import { Luminowl } from './pals/pals'
import { DIALOGS } from '../components/dialog/DialogManager'
import { ATK_PHASES } from '../handlers/moveHandlers'
import {
  apple,
  hyperPotion,
  potion,
  pumpernickelSoda,
  superPotion,
} from './items/basicItems'

const { DRAW, STUN, DOUBLEDAMAGE, SLEEP, POISON } = EFFECTS
//

// On load generate:
// Generate party or choose a starting PAL
/**
 * @typedef {Object} Ability
 * @property {string} name - The name of the ability.
 * @property {string} type - The type of the ability.
 * @property {number} damage - The damage of the ability.
 * @property {number} speed - The speed of the ability.
 * @property {number} fuel - The fuel of the ability.
 * @property {Object} effect - The effect of the ability.
 * @property {number} chance - The chance of the ability.
 * @property {string} description - The description of the ability.
 * @property {string} priority - The priority of the ability.
 * @property {Object} notSoFast - The notSoFast of the ability.
 * @property {Object} forceful - The forceful of the ability.
 */

/**
 * @typedef {Object} Monster
 * @property {string} name - The name of the monster.
 * @property {number} health - The health of the monster.
 * @property {number} maxHP - The maximum health of the monster.
 * @property {number} energy - The energy of the monster.
 * @property {string} status - The status of the monster.
 * @property {Object} flaws - The flaws of the monster.
 * @property {number} lvl - The level of the monster.
 * @property {number} exp - The experience of the monster.
 * @property {Array<Ability>} Abilities - The abilities of the monster.
 * @property {Array} quirks - The quirks of the monster.
 * @property {Object} stats - The stats of the monster.
 * @property {string} nature - The nature of the monster.
 * @property {string} uniqueness - The uniqueness of the monster.
 */

/**
 * @typedef {Object} StartingData
 * @property {Array<Monster>} userParty - The party of the user.
 * @property {Object} opponent - The opponent's data.
 * @property {Object} battleManager - The manager for the battle.
 * @property {Object} current - The current state of the game.
 * @property {Object} game - The game's data.
 * @property {Object} dialog - The dialog data.
 */

/**
 * The starting data for the game.
 * @type {StartingData}
 */
export const newStartingData = {
  userParty: [],
  opponent: placeholderTrainer,
  battleManager: {
    turn: 1,
    currentPlayer: 'player',
    phase: 'begin',
  },
  current: {
    level: 0,
    mapLevel: 0,
    act: 1,
    completedLevels: [],
    scene: { screen: SCENES.INTRO, details: null },
    curEvent: null,
    incomingLevels: [
      {
        scene: 'battle',
        trainer: 'hikerNed',
      },
    ],
  },
  bag: {
    runes: ['Stick', `Coat of harms`],
    items: [
      { contents: apple, qty: 1 },
      { contents: pumpernickelSoda, qty: 1 },
      { contents: potion, qty: 3 },
    ],
  },
  game: {
    player: {
      gold: 50,
      credibility: 3,
      runes: [],
      inventory: [],
      effects: [],
      energy: 6,
      energyRefillAmt: 5,
      maxEnergy: 8,
    },
    map: generateMap(),
    battlesAhead: [],
    events: {
      introEvent: {
        text: 'Welcome to the game!',
        options: [
          {
            text: 'Start the adventure',
            action: () => {},
          },
        ],
      },
    },
    alerts: [],
    devMode: false,
  },
  dialog: {
    isOpen: false,
    type: DIALOGS.TEMPLATE,
    message: 'startingData Message',
    options: [
      {
        label: 'start',
        onClick: () => {},
        backgroundColor: '#4b770e',
        color: '#fff',
      },
    ],
    title: 'startingData Title',
    header: 'startingData Header',
  },
  popup: {
    isOpen: false,
    type: 'attack',
    attack: LightBeam,
    ourCurrentMon: Luminowl,
    // message: 'startingData Popup Message',
    // options: [
    //   {
    //     label: 'start',
    //     onClick: () => {},
    //     backgroundColor: '#4b770e',
    //     color: '#fff',
    //   },
    // ],
    // title: 'startingData Title',
    // header: 'startingData Header',
    // isOpen: true,
  },
  attack: {
    pal: Luminowl,
    move: LightBeam,
    phase: 'default null phase',
    // actionDetails:
    userSlot: 0,
    targets: { ally: null, enemy: [0] },
    player: 'default human player',
    possessed: false,
  },
}

export const startingDataOld = {
  deck: startingDeck,
  gold: 50,
  hero: {
    health: 100,
    energy: 5,
    status: 'Feeling Fine',
    effects: {
      buff: null,
      buildup: 1,
    },
    maxHP: 100,
    maxEnergy: 5,
    armor: 0,
    power: 0,
  },
  battle: {
    enemy: {
      name: 'sample guy',
      bio: 'just a standaard enemy',
      health: '30',
      maxHP: '30',
      energy: 6,
      status: 'none',
      nextAttack: 'none',
      attacks: [
        {
          name: 'sample atk hitting you',
          type: 'hit',
          damage: 20,
          status: STUN,
        },
        {
          name: 'sample atk hitting again',
          type: 'hit',
          damage: 40,
          status: null,
        },
      ],
    },
    runes: [],
    hand: [],
    discarded: [],
    beginning: false,
    dialog: null,
  },
  curScene: { scene: 'intro', lvl: 1, act: 1 },
  curEvent: null,
  availableRewards: [],
  alert: '',

  // alert: "--- Cards PERMANENTLY go away. They can only be used once ---",
  eventResultObj: null,
  devMode: false,
}
