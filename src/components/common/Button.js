import React from "react";

const Button = (text, onClick) => {
  return (
    <>
      <button onClick={() => onClick()} style={{padding: '10px', margin: '5px'}}>{text ? text : "no text provided"}</button>
    </>
  );
};

export default Button;