import React from "react";
import Button from "./Button";

function Popup(props) {
  return props.trigger ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.2)",
        // zIndex: "100",
        // zIndex:1

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "10px",
          backgroundColor: "#5a7d2a",
          width: "80%",
          maxWidth: "640px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <div>Attacks</div>
          <div>
            <div
              style={{
                border: "1px solid #a5e54d",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>Slash</div>
              <div>50</div>
            </div>
            <div
              style={{
                border: "1px solid #a5e54d",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>Sting</div>
              <div>50</div>
            </div>
            <div
              style={{
                border: "1px solid #a5e54d",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>Bite</div>
              <div>35</div>
            </div>
            <div
              style={{
                border: "1px solid #a5e54d",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>Stab</div>
              <div>15</div>
            </div>
            <div
              style={{
                border: "1px solid #a5e54d",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>Hide</div>
              <div>(defend 5)</div>
            </div>
            <div>details...</div>
            {/* <Button text="Close" onClick={() => props.togglePopup()} /> */}
            <button
              style={{
                // position: "absolute",
                // top: "16",
                // right: "16",
                backgroundColor: "#4b770e",
              }}
              onClick={() => props.togglePopup()}
            >
              close
            </button>
          </div>

        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
