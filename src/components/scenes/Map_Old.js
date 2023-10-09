// import React from "react";
// import { setSceneAction } from "../../actions";
// import ThemedButton from "../common/ThemedButton";
// import { useDispatchContext, useStateContext } from "../../MainContext";
// const Map = ({ gameData, dispatch, map }) => {
//   const loadNextLevel = () => {
//     console.log(`loadNextLevel`);
//     dispatch(setSceneAction());
//   };

//   const mapPortion = map.slice(1);

//   const currentIndex = gameData.curScene.lvl;
//   const nextLevels = map.slice(currentIndex + 1, currentIndex + 6);

//   const contextualState = useStateContext();
//   const contextualDispatch = useDispatchContext();

//   return (
//     <>
//       <div
//         style={{
//           fontFamily: "Silkscreen",
//           // color: "white",
//           display: "flex",
//           flexDirection: "column",
//           backgroundPosition: "center",
//         }}
//       >
//         <h1 style={{ color: "white" }}>- The {gameData.curScene.scene} -</h1>
//         <div style={{ color: "gray" }}>
//           <h3> Next Level: {map[currentIndex + 1]}</h3>
//           <h1 className=" pr-20 text-blue-300">DOes tailwind work?</h1>
//           <h3>
//             Your Party or Choose a char. Maybe make changes here to party
//           </h3>
//           <ThemedButton text={`Next level`} onClick={loadNextLevel} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Map;
