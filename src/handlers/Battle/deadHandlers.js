export const checkIfDead = (state) => {
  if (state.userParty[0].obj.stats.hp <= 0) {
    // change state so user pal is dead
    // state.userParty[0].obj.dead = true, but we need to create a
    // new dead pal object
    state = {
      ...state,
      userParty: [
        {
          ...state.userParty[0],
          obj: {
            ...state.userParty[0].obj,
            dead: true,
          },
        },
      ],
    }
  }
  if (state.opponent.monsters[0].obj.stats.hp <= 0) {
    // change state so opponent pal is dead
    //  state.opponent.monsters[0].obj.dead = true
    state = {
      ...state,
      opponent: {
        ...state.opponent,
        monsters: [
          {
            ...state.opponent.monsters[0],
            obj: {
              ...state.opponent.monsters[0].obj,
              dead: true,
            },
          },
        ],
      },
    }
  }
  return state
}
