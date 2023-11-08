import React from 'react'
import { motion } from 'framer-motion'
import { setSceneAction, addPackAction } from '../../actions'
import './PackReward.css'
import { allBasicPacks } from '../../consts/packs'
import { generateRewardPackSelection } from '../../utils/reward-utils'

function PackReward({ gameData, dispatch }) {
  const addPackAndProceedToNextLevel = (Pack) => {
    console.log(`addin this Pack:`, Pack)
    dispatch(addPackAction(Pack))
    dispatch(setSceneAction())
  }
  const loadNextLevel = () => {
    console.log(`loadNextLevel`)
    dispatch(setSceneAction())
  }

  const packSelection = generateRewardPackSelection(
    allBasicPacks,
    Math.random(),
    3,
  )
  console.log('packSelection', packSelection)
  return (
    <div className="pack-reward-container">
      <h1 className="pack-reward-title">
        Choose an infusion, you`ll get a pack of cards:
      </h1>
      <div className="pack-reward-grid">
        {packSelection.map((packObj, index) => {
          const { title, desc, buttonText, img, pack } = packObj
          return (
            <motion.button
              key={index}
              className="pack-container"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 3 }}
              whileHover={{
                scale: 1.01,
                // rotate: 0.2,
                transition: {
                  yoyo: Infinity,
                },
              }}
              whileTap={{
                scale: 0.2,
                // rotate: -90,
              }}
              onClick={() => addPackAndProceedToNextLevel(pack)}
            >
              <div className="pack-card-heading">
                <div className="pack-title">
                  <strong>{title}</strong>
                </div>
                <img src={img} alt={`${title} pack`} className="pack-image" />
              </div>
              <div className="pack-description">{desc}</div>
              <div className="pack-cards-amount">
                You`ll get {pack.length} cards:{' '}
              </div>
              <ul className="pack-card-list">
                {pack.map((card, cardIndex) => {
                  return <li key={cardIndex}>{card.name}</li>
                })}
              </ul>
              {/* <button className="pack-select-button" onClick={() => addPackAndProceedToNextLevel(pack)}>{buttonText}</button> */}
              <div className="pack-select-button">{buttonText}</div>
            </motion.button>
          )
        })}
      </div>
      <button className="next-level-button" onClick={loadNextLevel}>
        I don`t want anything
      </button>
    </div>
  )
}

export default PackReward
