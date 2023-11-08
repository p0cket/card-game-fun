import React from 'react'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import { motion, useAnimation } from 'framer-motion'
import { SCENES, changeLevel } from '../../handlers/sceneHandlers_new'
import { hikerBrak } from '../../consts/party/trainers'
import { generateEnemyParty } from '../../handlers/Battle/prepareBattle'
import MapComponent from './MapComponent'
import { LevelList, levels } from './LevelList'

function Map() {
  const containerStyle = {
    // backgroundColor: '#222',
    color: 'white',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  }

  const titleStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  }

  const sectionStyle = {
    // backgroundColor: '#444',
    backgroundColor: 'green',
    borderRadius: '8px',
    padding: '2px',
    marginBottom: '2px',
  }

  const headingStyle = {
    fontSize: '18px',
    margin: '0',
  }

  const buttonStyle = {
    // backgroundColor: "#007bff",
    backgroundColor: 'darkgreen',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    margin: '10px',
  }

  // Inside your component
  const imageControls = useAnimation()

  // Define a spring animation that moves the image up and down
  const imageAnimation = {
    y: [0, -5, 0, 5, 0], // Define the Y-axis values for the animation
    transition: {
      duration: 2, // Duration of each cycle (in seconds)
      repeat: Infinity, // Repeat the animation infinitely
      ease: 'linear', // Use a linear easing function for a simple up-and-down motion
    },
  }

  // Use the imageControls to start the animation
  imageControls.start(imageAnimation)

  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()

  const handleChangeLevel = (state, scene) => {
    const stateWithChangedLevel = changeLevel(state, scene)
    contextualDispatch({
      type: ACTIONS.UPDATEGAMEDATA,
      payload: stateWithChangedLevel,
    })
    console.log(`state after changing level:`, stateWithChangedLevel)

    // console.log(`state after changing level:`, contextualState);
  }

  const ourParty = contextualState.userParty

  // Function to render details for a monster
  const renderMonsterDetails = (monster) => {
    return (
      <div
        key={monster ? monster.id : 'empty-slot'}
        style={{
          marginBottom: '2px',
          border: '1px solid lightgreen', // Add a border to distinguish slots
          padding: '2px',
        }}
      >
        {monster ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <motion.img
              src={monster.image}
              alt={monster.name}
              style={{ maxWidth: '35px', maxHeight: '35px' }}
              animate={imageControls}
            />
            <div style={{ marginRight: '5px' }}>{monster.name}</div>
            <div>
              HP: {monster.stats.hp}/{monster.stats.max_hp}
            </div>{' '}
            <div
              style={{
                width: '100px',
                height: '10px',
                backgroundColor: 'lightgray',
                borderRadius: '5px',
                marginTop: '4px',
              }}
            >
              <div
                style={{
                  width: `${(monster.stats.hp / monster.stats.max_hp) * 100}%`,
                  height: '100%',
                  borderRadius: '5px',
                  backgroundColor: 'darkgreen',
                }}
              ></div>
            </div>
          </div>
        ) : (
          <p>Empty Slot</p>
        )}
      </div>
    )
  }

  // const testMapData = {
  //   levels: [
  //     {
  //       nodes: [
  //         { type: 'Start', isCurrent: true, isVisited: false },
  //       ],
  //     },
  //     {
  //       nodes: [
  //         { type: 'Battle', isCurrent: false, isVisited: false },
  //         { type: 'Shop', isCurrent: false, isVisited: false },
  //       ],
  //     },
  //     {
  //       nodes: [
  //         { type: 'Rest', isCurrent: false, isVisited: false },
  //         { type: 'Event', isCurrent: false, isVisited: false },
  //         { type: 'Mystery', isCurrent: false, isVisited: false },
  //       ],
  //     },
  //     {
  //       nodes: [
  //         { type: 'Boss', isCurrent: false, isVisited: false },
  //       ],
  //     },
  //   ],
  // };
  const testMapData = {
    levels: [
      {
        nodes: [{ id: 'start', type: 'Start', leadsTo: ['battle1', 'shop1'] }],
      },
      {
        nodes: [
          { id: 'battle1', type: 'Battle', leadsTo: ['rest1', 'event1'] },
          { id: 'shop1', type: 'Shop', leadsTo: ['event1', 'mystery1'] },
        ],
      },
      {
        nodes: [
          { id: 'rest1', type: 'Rest', leadsTo: ['boss'] },
          { id: 'event1', type: 'Event', leadsTo: ['boss'] },
          { id: 'mystery1', type: 'Mystery', leadsTo: ['boss'] },
        ],
      },
      {
        nodes: [{ id: 'boss', type: 'Boss', leadsTo: [] }],
      },
    ],
  }

  const handleNodeClick = (node) => {
    console.log(`node clicked:`, node)

    // ... your click handling logic here
  }

  return (
    <div style={containerStyle}>
      {/* <h1 style={titleStyle}>New Map Component</h1> */}
      <div style={sectionStyle}>
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Map to the Elites</h2>
          <p>Choose your path:</p>
          {/* <MapComponent
            mapData={testMapData}
            currentLevel={0}
            onNodeClick={handleNodeClick}
          /> */}

<LevelList levels={levels} />
          <div className="flex flex-col">
            {' '}
            {/* you see a shadowy figure, you can feed it or not. "feed me"
          if you feed it it joins your party. you have bait/food I guess */}
            <div>
              {contextualState.game.map[contextualState.current.level].map(
                (option, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => handleChangeLevel(contextualState, option)}
                      style={buttonStyle}
                    >
                      {option.screen}
                    </button>
                  )
                },
              )}
              <button
                onClick={() =>
                  handleChangeLevel(contextualState, {
                    screen: SCENES.BATTLE,
                    details: {
                      type: 'trainer',
                      trainer: hikerBrak,
                      area: 'tranquil forest',
                      difficulty: 'easy',
                    },
                  })
                }
              >
                •Battle•
              </button>
            </div>
            {/* <div className="flex">
              {' '}
              <div>Rest</div>
              <div>Shop</div>
              <div>???</div>
            </div>
            <div>
              <div>Event</div>
              <div>Battle</div>
            </div> */}
          </div>

          {/* <button style={buttonStyle}>Battle Ahead</button>
          <button style={buttonStyle}>investigate the market</button>
          <button style={buttonStyle}>
            ???
          </button>
          <button style={buttonStyle}>Explore</button> */}
        </div>
        <h2 style={headingStyle}>Prepare Your Party</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {ourParty.map((monster) => renderMonsterDetails(monster))}
        </div>
      </div>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Inventory</h2>
        {/* Add content for inventory management here */}
      </div>
    </div>
  )
}

//   return (
//     <div style={containerStyle}>
//       <h1 style={titleStyle}>New Map Component</h1>
//   <div style={sectionStyle}>
//     <h2 style={headingStyle}>Map Stuff</h2>
//     <p>Choose your path:</p>
//     <button style={buttonStyle}>Battle Ahead</button>
//     <button style={buttonStyle}>Event</button>
//     <button style={buttonStyle}>Mystery</button>
//     <button style={buttonStyle}>Explore</button>
//   </div>
//       <div style={sectionStyle}>
//         <h2 style={headingStyle}>Prepare Your Party</h2>
//         {/* Add content for party management here */}
//       </div>
//       <div style={sectionStyle}>
//         <h2 style={headingStyle}>Inventory</h2>
//         {/* Add content for inventory management here */}
//       </div>
//     </div>
//   );

export default Map
