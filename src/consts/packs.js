//choose between 3 in the beginning to be added to your deck
//packs can have variable rarity of cards that are better, like loot in diablo
import { ddamageCards, poisonCards, sleepCards, stunCards } from "./allCards"


export const poisonPackBasic = {
  title: "Poison",
  desc: `These attacks will Poison the enemy for the amount it says. 
  Poison stacks with each one used.`,
  buttonText: "Professor, inject me",
  img: "/packImages/Poison.png",
  id: 1,
  pack: [
    poisonCards.ToxicGas,
    poisonCards.AcidSpray,
    poisonCards.ToxicSpores,
    poisonCards.PoisonousTouch,
    poisonCards.ToxicOoze,
    poisonCards.PoisonCloud,
  ],
  // pack: [
  //   poisonCards.ToxicGas(),
  //   poisonCards.AcidSpray(),
  //   poisonCards.ToxicSpores(),
  //   poisonCards.PoisonousTouch(),
  //   poisonCards.ToxicOoze(),
  //   poisonCards.PoisonCloud(),
  // ],
}

export const doubledamagePackBasic = {
  title: "DoubleDamage",
  desc: `These attacks will apply a buff that doubles your damage 
  for the full turn`,
  buttonText: "Lets get buff!",
  img: "/packImages/DoubleDamage.png",
  id: 2,
  pack: [
    ddamageCards.focus,
    ddamageCards.focus,
    ddamageCards.focus,
    ddamageCards.focusPunch,
    ddamageCards.focusPunch,
    ddamageCards.focusPunch,
  ],
  // pack: [
  //   ddamageCards.focus(),
  //   ddamageCards.focus(),
  //   ddamageCards.focus(),
  //   ddamageCards.focusPunch(),
  //   ddamageCards.focusPunch(),
  //   ddamageCards.focusPunch(),
  // ],
}

export const stunPackBasic = {
  title: "Stun",
  desc: `Stun will disable an enemy from attacking for coming attack`,
  buttonText: "Show me how you stunned them",
  img: "/packImages/Stun.png",
  id: 3,
  pack: [
    stunCards.throwFist,
    stunCards.throwFist,
    stunCards.throwFist,
    stunCards.throwFistPlus,
    stunCards.throwFistPlus,
    stunCards.throwFistPlus,
  ],
  // pack: [
  //   (stunCards.throwFist()),
  //   (stunCards.throwFist()),
  //  ( stunCards.throwFist()),
  //   (stunCards.throwFistPlus()),
  //   (stunCards.throwFistPlus()),
  //   (stunCards.throwFistPlus()),
  // ],
}

export const sleepPackBasic = {
  title: "Sleep",
  desc: `Puts enemies to sleep, disabling them from attacking.
   They chance to wake up at the end of the turn`,
  buttonText: "Teach me hypnosis",
  img: "/packImages/Sleep.png",
  id: 4,
  pack: [
    sleepCards.hypnosis,
    sleepCards.hypnosis,
    sleepCards.hypnosis,
    sleepCards.hypnosis,
    sleepCards.hypnosisPlus,
    sleepCards.hypnosisPlus,
  ] 
  //  pack: [
  //   sleepCards.hypnosis(),
  //   sleepCards.hypnosis(),
  //   sleepCards.hypnosis(),
  //   sleepCards.hypnosis(),
  //   sleepCards.hypnosisPlus(),
  //   sleepCards.hypnosisPlus(),
  // ]
}

export const allBasicPacks = [
  poisonPackBasic,
  doubledamagePackBasic,
  stunPackBasic,
  sleepPackBasic,
]
// export const startingPack = []
