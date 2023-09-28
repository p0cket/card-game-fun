import React from 'react'
import {  goldEmoji } from "../../consts/consts";


function HUDHeader({gameData}) {
  return (
    <p
    style={{
      margin: "4px",
      backgroundColor: "#5a7d2a",
      color: "white",
      flex: "1",
    }}
  >
    {/* {`${goldEmoji}${gameData.gold}`}
    <span style={{ color: "#e6ecc3" }}>Gold</span>
    <span style={{ color: "#e6ecc3" }}>Level</span>
    {gameData.curScene.lvl}
    {" -"}
    <span style={{ color: "#e6ecc3" }}>ACT</span>
    {gameData.curScene.act} */}
     Simulation Room: No Effects
  </p>  )
}

export default HUDHeader