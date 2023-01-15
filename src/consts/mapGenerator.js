import { SCENES } from "../scenes"

const {
  // TRANSITION,
  INTRO,
  BATTLE,
  MAP,
  SHOP,
  REWARD,
  EVENT,
  REST,
  MINIBOSS,
  BOSS,
  GAMEOVER,
  VICTORY,
} = SCENES

const mapGenerator = () => {
  return [
    GAMEOVER,
    INTRO,
    MAP,
    BATTLE,
    REWARD,
    REWARD,
    REWARD,
    EVENT,
    MAP,
    SHOP,
    BATTLE,
    REWARD,
    REWARD,
    REWARD,
    MAP,
    EVENT,
    BATTLE,
    REWARD,
    REWARD,
    REWARD,
    MAP,
    REST,
    MINIBOSS,
    REWARD,
    REWARD,
    REWARD,
    MAP,
    BATTLE,
    REWARD,
    REWARD,
    MAP,
    BATTLE,
    REWARD,
    REWARD,
    REWARD,
    REST,
    BOSS,
    VICTORY,
    // That is ACT1. If someone beats ACT1, we can start with ACT2 and ACT3
    // REWARD,
    // REWARD,
    // //Act 2
    // EVENT,
    // BATTLE,
    // REWARD,
    // SHOP,
    // BATTLE,
    // REWARD,
    // EVENT,
    // BATTLE,
    // REWARD,
    // REST,
    // MINIBOSS,
    // REWARD,
    // BATTLE,
    // REWARD,
    // BATTLE,
    // REWARD,
    // REST,
    // BOSS,
    // //Act 3
    // REWARD,
    // EVENT,
    // BATTLE,
    // REWARD,
    // SHOP,
    // BATTLE,
    // REWARD,
    // EVENT,
    // BATTLE,
    // REWARD,
    // REST,
    // MINIBOSS,
    // REWARD,
    // BATTLE,
    // REWARD,
    // BATTLE,
    // REWARD,
    // REST,
    // BOSS,
  ]
}

export const map = mapGenerator()
