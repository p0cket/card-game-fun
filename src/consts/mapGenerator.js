import { SCENES } from "../scenes";

const { INTRO, BATTLE, SHOP, REWARD, EVENT, REST, MINIBOSS, BOSS, GAMEOVER } = SCENES;

const mapGenerator = () => {
  return [
    GAMEOVER,
    INTRO,
    BATTLE,
    REWARD,
    REWARD,
    SHOP,
    BATTLE,
    REWARD,
    REWARD,
    EVENT,
    BATTLE,
    REWARD,
    REWARD,
    REST,
    MINIBOSS,
    REWARD,
    REWARD,
    BATTLE,
    REWARD,
    REWARD,
    BATTLE,
    REWARD,
    REWARD,
    REST,
    BOSS,
    REWARD,
    REWARD,
    //Act 2
    EVENT,
    BATTLE,
    REWARD,
    SHOP,
    BATTLE,
    REWARD,
    EVENT,
    BATTLE,
    REWARD,
    REST,
    MINIBOSS,
    REWARD,
    BATTLE,
    REWARD,
    BATTLE,
    REWARD,
    REST,
    BOSS,
    //Act 3
    REWARD,
    EVENT,
    BATTLE,
    REWARD,
    SHOP,
    BATTLE,
    REWARD,
    EVENT,
    BATTLE,
    REWARD,
    REST,
    MINIBOSS,
    REWARD,
    BATTLE,
    REWARD,
    BATTLE,
    REWARD,
    REST,
    BOSS,
  ];
};

export const map = mapGenerator();
