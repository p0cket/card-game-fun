//choose between 3 in the beginning to be added to your deck
//packs can have variable rarity of cards that are better, like loot in diablo
import {
  buildupCards,
  ddamageCards,
  poisonCards,
  sleepCards,
  stunCards,
  shopCards,
  rewardCards,
} from './allCards'

export const poisonPackBasic = {
  title: 'Poison',
  desc: `These attacks will Poison the enemy for the amount it says. 
  Poison stacks with each one used.`,
  buttonText: 'Professor, inject me',
  img: '/packImages/Poison.png',
  id: 1,
  pack: [
    poisonCards.ToxicGas,
    poisonCards.AcidSpray,
    poisonCards.ToxicSpores,
    poisonCards.PoisonousTouch,
    poisonCards.ToxicOoze,
    poisonCards.PoisonCloud,
  ],
}

export const doubledamagePackBasic = {
  title: 'DoubleDamage',
  desc: `These attacks will apply a buff that doubles your damage 
  for the full turn`,
  buttonText: 'Lets get buff!',
  img: '/packImages/DoubleDamage.png',
  id: 2,
  pack: [
    ddamageCards.focus,
    ddamageCards.focus,
    ddamageCards.focus,
    ddamageCards.focusPunch,
    ddamageCards.focusPunch,
    ddamageCards.focusPunch,
  ],
}

//Nerf slightly
export const stunPackBasic = {
  title: 'Stun',
  desc: `Stun will disable an enemy from attacking for coming attack`,
  buttonText: 'Show me how you stunned them',
  img: '/packImages/Stun.png',
  id: 3,
  pack: [
    stunCards.throwFist,
    stunCards.throwFist,
    stunCards.throwFist,
    stunCards.throwFistPlus,
    stunCards.throwFistPlus,
    stunCards.throwFistPlus,
  ],
}

//nerf
export const sleepPackBasic = {
  title: 'Sleep',
  desc: `Puts enemies to sleep, disabling them from attacking.
   They chance to wake up at the end of the turn`,
  buttonText: 'Teach me hypnosis',
  img: '/packImages/Sleep.png',
  id: 4,
  pack: [
    sleepCards.hypnosis,
    sleepCards.hypnosis,
    sleepCards.hypnosis,
    sleepCards.hypnosis,
    sleepCards.hypnosisPlus,
    sleepCards.hypnosisPlus,
  ],
}

export const buildupPackBasic = {
  title: 'BuildUp',
  desc: `Each time you play a card, your BuildUp card's damage increases permanently if it is in your hand.`,
  buttonText: 'I want to grow',
  img: '/packImages/Buildup.png',
  id: 4,
  pack: [
    buildupCards.channel,
    buildupCards.channel,
    buildupCards.channel,
    buildupCards.channel,
    buildupCards.channelPlus,
    buildupCards.channelPlus,
  ],
}

export const rewardPack = [
  rewardCards.flameToss,
  rewardCards.fireBreath,
  rewardCards.broil,
  rewardCards.waterMissile,
  rewardCards.aquaBlast,
  rewardCards.drippingWet,
  rewardCards.grassBlade,
  rewardCards.pelletGun,
  rewardCards.swarm,
  rewardCards.shadowDrop,
  rewardCards.electricSymphony,
  rewardCards.backstab,
  rewardCards.hypnoticDistress,
  rewardCards.blackOoze,
  rewardCards.overload,
  rewardCards.stunningDelivery,
]

export const shopPack = [
  shopCards.AcidRain,
  shopCards.DreamCatcher,
  shopCards.ElectricBolt,
  shopCards.ElectroPunch,
  shopCards.ForcefulBlow,
  shopCards.HypnoWave,
  shopCards.NoxiousBite,
  shopCards.PoisonousClaw,
  shopCards.PoisonousMist,
  shopCards.PowerPunch,
  shopCards.PowerSurge,
  shopCards.PsychicBlast,
  shopCards.Shockwave,
  shopCards.StrongHit,
  shopCards.ThunderFist,
  shopCards.ToxicFog,
  shopCards.VenomousFang,
]

export const allBasicPacks = [
  poisonPackBasic,
  doubledamagePackBasic,
  stunPackBasic,
  sleepPackBasic,
  buildupPackBasic,
]
// export const startingPack = []
