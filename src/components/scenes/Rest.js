import React from 'react'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import campfireImg from '../../assets/eventImages/campfirePXL.png'
import {
  SCENES,
  updateLevel,
  updateScene,
} from '../../handlers/sceneHandlers_new'
import palHealingCenterImg from '../../assets/eventImages/rest/PalHealingCenter.png'
import palHealingCenterImg2 from '../../assets/eventImages/rest/PalHealingCenter2.png'
import palHealingCenterImg3 from '../../assets/eventImages/rest/PalHealingCenter3.png'
import palHealingCenterImg4 from '../../assets/eventImages/rest/PalHealingCenter4.png'
import palHealingCenterImg5 from '../../assets/eventImages/rest/PalHealingCenter5.png'

const randomizeImage = () => {
  const images = [
    palHealingCenterImg,
    palHealingCenterImg2,
    palHealingCenterImg3,
    palHealingCenterImg4,
    palHealingCenterImg5,
  ]
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}

const randomizedImage = randomizeImage()

const Rest = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  // const loadNextLevel = () => {
  //   // console.log(`loadNextLevel`)
  //   // dispatch(setSceneAction())

  // }
  const healToFullHealth = () => {
    dispatch({
      // type: ACTIONS.SELECT_REST,
      type: ACTIONS.HEAL_PAL_FULL,
      payload: {
        pal: 'loremIpsmon',
      },
    })
    // healHumanPal
    console.log('healToFullHealth')
  }

  const proceedToMapScene = () => {
    const nextSceneState = updateScene(state, {
      screen: SCENES.MAP,
      details: null,
    })
    const nextLevelState = updateLevel(nextSceneState, 0)
    // Clone the current state into a new variable
    // ? is there a redundant next line?
    const newState = { ...nextLevelState }
    // Dispatch the updated state
    dispatch({
      type: ACTIONS.UPDATE_GAMEDATA,
      payload: newState,
    })
  }

  return (
    <>
      <section className="max-w-lg mx-auto text-center font-[silkscreen]">
        <img
          src={randomizedImage}
          alt="Hospital Center"
          className="w-full h-auto"
        />
        <header className="my-4 text-boy-green">
          <h1 className="text-3xl font-bold text-boy-green">Hospital Center</h1>
          <h3 className="text-xl">A healing location for your pals</h3>
        </header>
        <article className="space-y-2 text-boy-green text-sm">
          <p>
            As you step into the Hospital, a sense of relief washes over you.
          </p>
          <p>
            Nurse Becky, with her expert care, ensures your pals will be
            fighting fit in no time.
          </p>
          {/* <p className="text-sm">( all pals at full health )</p> */}
        </article>
        <div className="flex flex-col space-y-4 my-6">
          <button
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
            onClick={healToFullHealth}
          >
            Heal
          </button>
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={proceedToMapScene}
          >
            Proceed to next
          </button>
        </div>
      </section>
    </>
  )
}

export default Rest

// Campfire version
{
  /* <header className="my-4">
<h1 className="text-3xl font-bold">Rest</h1>
<h3 className="text-xl">Stay a while, and listen</h3>
</header>
<article className="space-y-2">
<p>As you come upon a campfire, you feel calm.</p>
<p>A wise old scholar greets you.</p>
<p>
  You realize the old man will keep watch and alarm you if there is
  any danger.
</p>
{/* <p className="text-sm">( current health is {gameData.hero.health}/100 )</p> */
}
// </article> */}
