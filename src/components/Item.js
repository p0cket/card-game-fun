import React from "react";
// import Button from "./Button";
const Item = (item, applyItem) => {
  // const {item, name, description, notes} = props
  const { name, desc, boost, flavortext, price } = item;

  const styles = {
    itemStyle: {
      //   color: "blue",
      width: "200px",
      border: "2px solid silver",
      borderRadius: "10px",
      padding: "7px",
      margin: "3px",
    },
  };

//   const logClick = (data) => {
//     console.log('clicked', data)
//   }
  return (
    <div style={styles.itemStyle}>
      <h3>{name ? name : "No Item"}</h3>
      <h3>{price ? price : "no price"}</h3>
      <h5>{desc ? desc : "no description"}</h5>
      <div>{flavortext ? flavortext : "no flavortext"}</div>
      <button onClick={() => applyItem(boost)}>Buy</button>
      {/* <Button onClick={logClick(boost)} text={'Buy'}/> */}
    </div>
  );
};

export default Item;