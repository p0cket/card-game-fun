import { SCENES } from "../scenes";

const { INTRO, BATTLE, SHOP, REWARD, EVENT, REST, MINIBOSS, BOSS, GAMEOVER } = SCENES;

const mapGenerator = () => {
  return [
    GAMEOVER,
    INTRO,
    BATTLE,
    REWARD,
    SHOP,
    BATTLE,
    EVENT,
    BATTLE,
    REST,
    MINIBOSS,
    BATTLE,
    BATTLE,
    REST,
    BOSS,
    EVENT,
    BATTLE,
    SHOP,
    BATTLE,
    EVENT,
    BATTLE,
    REST,
    MINIBOSS,
    BATTLE,
    BATTLE,
    REST,
    BOSS,
    EVENT,
    BATTLE,
    SHOP,
    BATTLE,
    EVENT,
    BATTLE,
    REST,
    MINIBOSS,
    BATTLE,
    BATTLE,
    REST,
    BOSS,
  ];
};

export const map = mapGenerator();
