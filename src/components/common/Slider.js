import React, { useState, useEffect } from 'react'

const Slider = ({ min, max, value, onChange }) => {
  // Initialize sliderValue with the value prop to ensure it's controlled.
  const [sliderValue, setSliderValue] = useState(value)

  // Update local state if the value prop changes to ensure the slider stays controlled.
  useEffect(() => {
    setSliderValue(value)
  }, [value])

//   const handleSliderChange = (e) => {
//     const newValue = e.target.value
//     setSliderValue(newValue) // Update local state to reflect the change.
//     onChange(newValue) // Call the passed onChange function with the new value.
//   }
// const handleSliderChange = (e) => {
//     const newValue = e.target.value;
//     setSliderValue(newValue); // Update local state
//     onChange(newValue); // Pass newValue directly
//   };
const handleSliderChange = (e) => {
    onChange(e.target.value); // Directly call onChange passed by the parent
  };

  const calculatePercentage = () => ((sliderValue - min) / (max - min)) * 100

  return (
    <div
      className="slider-container"
      style={{
        margin: '20px',
        position: 'relative',
        height: '20px',
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: '0', // Blocky look
        border: '2px solid #4CAF50', // Softer green border
        boxSizing: 'border-box',
      }}
    >
      <div
        className="slider-track"
        style={{
          position: 'absolute',
          height: '100%',
          width: `${calculatePercentage()}%`,
          backgroundColor: 'green',
          borderRadius: '0',
        }}
      ></div>
      <div
        className="slider-handle"
        style={{
          position: 'absolute',
          top: '-5px',
          left: `calc(${calculatePercentage()}% - 10px)`, // Adjusting for handle width
          width: '20px',
          height: '30px',
          backgroundColor: 'darkgreen',
          borderRadius: '0', // Blocky handle
          cursor: 'pointer',
          border: '2px solid #4CAF50', // Consistent with container border
          boxSizing: 'border-box',
        }}
      ></div>
      <input
        type="range"
        min={min}
        max={max}
        value={sliderValue}
        onChange={handleSliderChange}
        className="slider-input"
        style={{
          width: '100%',
          position: 'absolute',
          top: '0',
          left: '0',
          opacity: 0, // Invisible but functional
          height: '100%',
          cursor: 'pointer',
        }}
      />
    </div>
  )
}

export default Slider

// import React, { useState } from 'react'

// const Slider = ({ min, max, value, onChange }) => {
//   const [sliderValue, setSliderValue] = useState(value)

//   const handleSliderChange = (e) => {
//     const newValue = e.target.value
//     setSliderValue(newValue)
//     onChange(newValue)
//   }

//   const calculatePercentage = () => ((sliderValue - min) / (max - min)) * 100

//   return (
//     <div
//       className="slider-container"
//       style={{
//         margin: '20px',
//         position: 'relative',
//         height: '20px',
//         width: '100%',
//         backgroundColor: '#ddd',
//         borderRadius: '0', // Remove rounded corners for a blocky look
//         // border: '2px solid #000', // Add a solid border for a pixelated look
//         border: '2px solid #4CAF50', // Add a solid border for a pixelated look

//         boxSizing: 'border-box', // Ensures the border is included in the width/height
//       }}
//     >
//       <div
//         className="slider-track"
//         style={{
//           position: 'absolute',
//           height: '100%',
//           width: `${calculatePercentage()}%`,
//           backgroundColor: 'green',
//           borderRadius: '0', // Remove rounded corners for a blocky look
//         }}
//       ></div>
//       {/* Custom Slider Handle */}
//       <div
//         className="slider-handle"
//         style={{
//           position: 'absolute',
//           top: '-5px',
//           left: `calc(${calculatePercentage()}% - 10px)`,
//           width: '20px',
//           height: '30px',
//           backgroundColor: 'darkgreen',
//           borderRadius: '0', // Make the handle blocky
//           cursor: 'pointer',
//         //   border: '2px solid #000', // Add a solid border for a pixelated look
//         border: '2px solid #4CAF50', // Add a solid border for a pixelated look

//         boxSizing: 'border-box',
//         }}
//       ></div>
//       <input
//         type="range"
//         min={min}
//         max={max}
//         value={sliderValue}
//         onChange={handleSliderChange}
//         className="slider-input"
//         style={{
//           width: '100%',
//           position: 'absolute',
//           top: '0',
//           left: '0',
//           opacity: 0,
//           height: '100%',
//           cursor: 'pointer',
//         }}
//       />
//     </div>
//   )
// }

// export default Slider
