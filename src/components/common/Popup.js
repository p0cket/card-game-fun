import React, { useState } from "react";
import Button from "./Button";

// Define an enum for menu options
const MenuOptions = {
  ATTACKS: "attacks",
  BENCH_ATTACKS: "benchAttacks",
  DO_SOMETHING: "doSomething",
};

function Popup(props) {
  const [currentMenu, setCurrentMenu] = useState(MenuOptions.ATTACKS);

  const toggleMenu = (menu) => {
    setCurrentMenu(menu);
  };

  const renderTab = (menuOption) => (
    <div
      key={menuOption}
      onClick={() => toggleMenu(menuOption)}
      style={{
        cursor: "pointer",
        padding: "10px",
        backgroundColor: currentMenu === menuOption ? "#4b770e" : "#5a7d2a",
        color: currentMenu === menuOption ? "#fff" : "#000",
        marginRight: "10px",
      }}
    >
      {menuContent[menuOption].label}
    </div>
  );

  // Define a lookup object for menu labels and content
  const menuContent = {
    [MenuOptions.ATTACKS]: {
      label: "Attacks",
      content: (
        <>
          {renderAttack("Slash", "50", "A powerful sword slash.", "20")}
          {renderAttack("Sting", "50", "A deadly insect sting.", "15")}
          {renderAttack("Bite", "35", "A vicious animal bite.", "10")}
          {renderAttack(
            "Stab",
            "15",
            "A quick and precise stab with a dagger.",
            "25"
          )}
        </>
      ),
    },
    [MenuOptions.BENCH_ATTACKS]: {
      label: "Bench Attacks",
      content: (
        <>
          {renderMonster("Monster 1", ["Tackle", "Growl"])}
          {renderMonster("Monster 2", ["Scratch"])}
          {renderMonster("Monster 3", ["Fire Breath", "Tail Whip"])}
        </>
      ),
    },
    [MenuOptions.DO_SOMETHING]: {
      label: "Do Something",
      content: (
        // Render Do Something content here
        <div>This is the "Do Something" menu. Add your content here.</div>
      ),
    },
  };

  return props.trigger ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "20px",
          backgroundColor: "#5a7d2a",
          width: "80%",
          maxWidth: "640px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={attackHeaderStyle}>
          <div style={characterIconStyle}></div> {/* Character Icon */}
          <div style={attackLabelStyle}>{menuContent[currentMenu].label}</div>
        </div>
        <div>{menuContent[currentMenu].content}</div>
        <div style={{ marginTop: "20px", borderTop: "1px solid #a5e54d" }}>
          <div style={{ display: "flex" }}>
            {Object.values(MenuOptions).map((menuOption) =>
              renderTab(menuOption)
            )}
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          {/* Add any additional details here */}
        </div>
        <button
          style={{
            backgroundColor: "#4b770e",
            border: "none",
            color: "#fff",
            padding: "10px 20px",
            cursor: "pointer",
            marginTop: "20px",
          }}
          onClick={() => props.togglePopup()}
        >
          Close
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

// ... (rest of the code remains the same)
function renderAttack(name, damage, description, energyCost) {
  return (
    <div style={{ ...attackContainerStyle, backgroundColor: "#5a7d2a" }}>
      <div style={attackInfoStyle}>
        <div style={attackNameStyle}>{name}</div>
        <div style={attackDamageStyle}>{damage}</div>
      </div>
      <div style={attackDescriptionStyle}>{description}</div>
      <div style={attackEnergyCostStyle}>Cost: {energyCost}</div>
    </div>
  );
}

function renderMonster(name, abilities) {
  // Placeholder for the tiny Pokemon icon (green square)
  const monsterIcon = (
    <div
      style={{
        backgroundColor: "green",
        width: "24px",
        height: "24px",
        marginRight: "10px",
      }}
    ></div>
  );

  return (
    <div style={{ ...attackContainerStyle, backgroundColor: "#5a7d2a" }}>
      <div style={attackInfoStyle}>
        {monsterIcon}
        <div style={monsterNameStyle}>{name}</div>
      </div>
      <div style={monsterAbilitiesStyle}>
        {abilities.map((ability, index) => (
          <div key={index}>{ability}</div>
        ))}
      </div>
    </div>
  );
}

const attackContainerStyle = {
  border: "1px solid #a5e54d",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  padding: "12px",
  margin: "8px 0",
  backgroundColor: "#fff",
};

const attackInfoStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
};

const attackNameStyle = {
  fontWeight: "bold",
};

const attackDamageStyle = {
  flex: 1,
  textAlign: "right",
};

const attackDescriptionStyle = {
  flex: 1,
  textAlign: "left",
  color: "black",
};

const attackEnergyCostStyle = {
  alignSelf: "flex-end",
  textAlign: "right",
};

const attackHeaderStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
};

const characterIconStyle = {
  width: "24px",
  height: "24px",
  backgroundColor: "green", // Blue circle (placeholder for character icon)
  marginRight: "10px",
};

const attackLabelStyle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const monsterNameStyle = {
  fontWeight: "bold",
};

const monsterAbilitiesStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginLeft: "34px", // To align with the monster icon
};

export default Popup;

// import React, { useState } from "react";
// import Button from "./Button";

// function Popup(props) {
//   const [showAttacks, setShowAttacks] = useState(true);
//   const [currentMenu, setCurrentMenu] = useState("attacks");

//   const toggleView = () => {
//     setShowAttacks(!showAttacks);
//   };

//   return props.trigger ? (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100vh",
//         backgroundColor: "rgba(0, 0, 0, 0.2)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 100,
//       }}
//     >
//       <div
//         style={{
//           position: "relative",
//           padding: "20px",
//           backgroundColor: "#5a7d2a",
//           width: "80%",
//           maxWidth: "640px",
//           boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
//         }}
//       >
//         <div style={attackHeaderStyle}>
//           <div style={characterIconStyle}></div>
//           {/* Character Icon */}
//           <div style={attackLabelStyle}>
//             {showAttacks ? "Attacks" : "Bench Attacks"}
//           </div>
//         </div>
//         <div>
//           {showAttacks ? (
//             <>
//               {renderAttack("Slash", "50", "A powerful sword slash.", "20")}
//               {renderAttack("Sting", "50", "A deadly insect sting.", "15")}
//               {renderAttack("Bite", "35", "A vicious animal bite.", "10")}
//               {renderAttack(
//                 "Stab",
//                 "15",
//                 "A quick and precise stab with a dagger.",
//                 "25"
//               )}
//             </>
//           ) : (
//             // Render Bench Attacks content here
//             <>
//               {renderMonster("Monster 1", ["Tackle", "Growl"])}
//               {renderMonster("Monster 2", ["Scratch"])}
//               {renderMonster("Monster 3", ["Fire Breath", "Tail Whip"])}
//             </>
//           )}
//           <div style={{ marginTop: "20px", borderTop: "1px solid #a5e54d" }}>
//             <strong onClick={toggleView} style={{ cursor: "pointer" }}>
//               {showAttacks ? "Bench Attacks >" : "< Attacks"}
//             </strong>
//           </div>
//         </div>
//         <div style={{ marginTop: "20px" }}>
//           {/* Add any additional details here */}
//         </div>
//         <button
//           style={{
//             backgroundColor: "#4b770e",
//             border: "none",
//             color: "#fff",
//             padding: "10px 20px",
//             cursor: "pointer",
//             marginTop: "20px",
//           }}
//           onClick={() => props.togglePopup()}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   ) : (
//     ""
//   );
// }

// function renderAttack(name, damage, description, energyCost) {
//   return (
//     <div style={{ ...attackContainerStyle, backgroundColor: "#5a7d2a" }}>
//       <div style={attackInfoStyle}>
//         <div style={attackNameStyle}>{name}</div>
//         <div style={attackDamageStyle}>{damage}</div>
//       </div>
//       <div style={attackDescriptionStyle}>{description}</div>
//       <div style={attackEnergyCostStyle}>Cost: {energyCost}</div>
//     </div>
//   );
// }

// function renderMonster(name, abilities) {
//   // Placeholder for the tiny Pokemon icon (green square)
//   const monsterIcon = (
//     <div
//       style={{
//         backgroundColor: "green",
//         width: "24px",
//         height: "24px",
//         marginRight: "10px",
//       }}
//     ></div>
//   );

//   return (
//     <div style={{ ...attackContainerStyle, backgroundColor: "#5a7d2a" }}>
//       <div style={attackInfoStyle}>
//         {monsterIcon}
//         <div style={monsterNameStyle}>{name}</div>
//       </div>
//       <div style={monsterAbilitiesStyle}>
//         {abilities.map((ability, index) => (
//           <div key={index}>{ability}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const attackContainerStyle = {
//   border: "1px solid #a5e54d",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "stretch",
//   padding: "12px",
//   margin: "8px 0",
//   backgroundColor: "#fff",
// };

// const attackInfoStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   marginBottom: "8px",
// };

// const attackNameStyle = {
//   fontWeight: "bold",
// };

// const attackDamageStyle = {
//   flex: 1,
//   textAlign: "right",
// };

// const attackDescriptionStyle = {
//   flex: 1,
//   textAlign: "left",
//   color: "black",
// };

// const attackEnergyCostStyle = {
//   alignSelf: "flex-end",
//   textAlign: "right",
// };

// const attackHeaderStyle = {
//   display: "flex",
//   alignItems: "center",
//   marginBottom: "10px",
// };

// const characterIconStyle = {
//   width: "24px",
//   height: "24px",
//   backgroundColor: "green", // Blue circle (placeholder for character icon)
//   marginRight: "10px",
// };

// const attackLabelStyle = {
//   fontSize: "24px",
//   fontWeight: "bold",
// };

// const monsterNameStyle = {
//   fontWeight: "bold",
// };

// const monsterAbilitiesStyle = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "flex-start",
//   marginLeft: "34px", // To align with the monster icon
// };

// export default Popup;
