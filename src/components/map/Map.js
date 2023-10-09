import React from "react";
import {
  ACTIONS,
  useDispatchContext,
  useStateContext,
} from "../../MainContext";
import { motion, useAnimation } from "framer-motion";
import { SCENES, changeLevel } from "../../handlers/sceneHandlers_new";
import { hikerBrak } from "../../consts/party/trainers";
import { generateEnemyParty } from "../../handlers/Battle/prepareBattle";

function Map() {
  const containerStyle = {
    // backgroundColor: '#222',
    color: "white",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "24px",
    marginBottom: "20px",
  };

  const sectionStyle = {
    // backgroundColor: '#444',
    backgroundColor: "green",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "10px",
  };

  const headingStyle = {
    fontSize: "18px",
    margin: "0",
  };

  const buttonStyle = {
    // backgroundColor: "#007bff",
    backgroundColor: "darkgreen",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    margin: "10px",
  };

  // Inside your component
  const imageControls = useAnimation();

  // Define a spring animation that moves the image up and down
  const imageAnimation = {
    y: [0, -5, 0, 5, 0], // Define the Y-axis values for the animation
    transition: {
      duration: 2, // Duration of each cycle (in seconds)
      repeat: Infinity, // Repeat the animation infinitely
      ease: "linear", // Use a linear easing function for a simple up-and-down motion
    },
  };

  // Use the imageControls to start the animation
  imageControls.start(imageAnimation);

  const contextualState = useStateContext();
  const contextualDispatch = useDispatchContext();

  // const stateWithTrainers = contextualState.game.map[
  //   contextualState.current.level
  // ].map((option, index) => {
  //   if (option === SCENES.BATTLE) {
  //     // load new
  //     const stateWithEnemyParty = generateEnemyParty(
  //       contextualState,
  //       hikerBrak
  //     );
  //     contextualDispatch({
  //       type: ACTIONS.UPDATEGAMEDATA,
  //       payload: stateWithEnemyParty,
  //     });

  //     console.log(
  //       `[!]state after adding an opponent:`,
  //       contextualState,
  //       contextualState.opponentParty
  //     );
  //   }
  // });

  const handleChangeLevel = (state, scene) => {
    const stateWithChangedLevel = changeLevel(state, scene);
    contextualDispatch({
      type: ACTIONS.UPDATEGAMEDATA,
      payload: stateWithChangedLevel,
    });
    console.log(`state after changing level:`, contextualState);
  };

  const ourParty = contextualState.userParty;

  // Function to render details for a monster
  const renderMonsterDetails = (monster) => {
    const mysticWillow = {
      name: "Mystic Willow",
      reward: {
        experience: 200,
        currency: 400,
        items: [{ name: "Enchanted Orb", quantity: 1 }],
      },
      monsterNames: [
        { name: "Sparklefox", level: 10 },
        { name: "Moonshadow", level: 12 },
      ],
      dialogue: {
        enter: "Let the magic of nature guide our battle!",
        win: "Nature's power flows through you as well. Impressive!",
        lose: "You've proven that the balance of nature is unpredictable.",
      },
    };

    return (
      <div
        key={monster ? monster.id : "empty-slot"}
        style={{
          marginBottom: "2px",
          border: "1px solid lightgreen", // Add a border to distinguish slots
          padding: "5px",
        }}
      >
        {monster ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <motion.img
              src={monster.image}
              alt={monster.name}
              style={{ maxWidth: "35px", maxHeight: "35px" }}
              animate={imageControls}
            />
            <div style={{ marginRight: "5px" }}>{monster.name}</div>
            <div>
              HP: {monster.stats.hp}/{monster.stats.max_hp}
            </div>{" "}
            <div
              style={{
                width: "100px",
                height: "10px",
                backgroundColor: "lightgray",
                borderRadius: "5px",
                marginTop: "4px",
              }}
            >
              <div
                style={{
                  width: `${(monster.stats.hp / monster.stats.max_hp) * 100}%`,
                  height: "100%",
                  borderRadius: "5px",
                  backgroundColor: "darkgreen",
                }}
              ></div>
            </div>
          </div>
        ) : (
          <p>Empty Slot</p>
        )}
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>New Map Component</h1>
      <div style={sectionStyle}>
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Map Stuff</h2>
          <p>Choose your path:</p>
          <div>
            {" "}
            {/* you see a shadowy figure, you can feed it or not. "feed me"
          if you feed it it joins your party. you have bait/food I guess */}
            {contextualState.game.map[contextualState.current.level].map(
              (option, index) => {
                // if(option === SCENES.BATTLE){
                // // load new
                // const stateWithEnemyParty = generateEnemyParty(contextualState, hikerBrak)
                // contextualDispatch({
                //   type: ACTIONS.UPDATEGAMEDATA,
                //   payload: stateWithEnemyParty,
                // });

                // console.log(`[!]state after adding an opponent:`, contextualState,
                // contextualState.opponentParty
                // )
                // }
                return (
                  <button
                    key={index}
                    onClick={() => handleChangeLevel(contextualState, option)}
                    style={buttonStyle}
                  >
                    {option}
                  </button>
                );
              }
            )}
            <button
              onClick={() => handleChangeLevel(contextualState, SCENES.BATTLE)}
            >
              •Battle•
            </button>
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
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {Object.values(ourParty).map((monster) =>
            renderMonsterDetails(monster)
          )}
        </div>
      </div>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Inventory</h2>
        {/* Add content for inventory management here */}
      </div>
    </div>
  );
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

export default Map;
