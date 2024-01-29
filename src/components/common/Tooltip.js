const TooltipButton = ({
  title,
  details,
  explanation,
  name,
  ourCurrentMon,
  showTooltip,
  setShowTooltip,
  amt
}) => {
  return (
    <button
      className="bg-boy-green py-1 px-2 rounded text-white relative"
      onClick={() => setShowTooltip(!showTooltip)}
    >
        {name} {amt}
      {/* {ourCurrentMon.passives.name} */}
      {showTooltip && (
        <div className="absolute bottom-full mb-2 px-4 py-1 border-2 border-green-200 bg-boy-green text-white text-xs shadow-lg">
          <button
            className="absolute top-0 right-0 text-2xl leading-none px-2 py-1"
            onClick={(e) => {
              e.stopPropagation()
              setShowTooltip(false)
            }}
          >
            {/* &times; */}
          </button>
          <div>
            {title}: {details}
          </div>

          {/* <div>Passive: {ourCurrentMon.passives.details}</div> */}
          <div className="text-xs text-gray-900">{explanation}</div>
          <div>x</div>
        </div>
        
      )}
    </button>
  )
}
export default TooltipButton
// <button
// className="bg-boy-green py-1 px-2 rounded text-white relative"
// onClick={() => setShowTooltip(!showTooltip)}
// >
// {ourCurrentMon.passives.name}
// {showTooltip && (
//   <div className="absolute bottom-full mb-2 px-4 py-1 border-2 border-green-200 bg-boy-green text-white text-xs shadow-lg">
//     <button
//       className="absolute top-0 right-0 text-2xl leading-none px-2 py-1"
//       onClick={() => setShowTooltip(false)}
//     >
//       {/* &times; */}
//     </button>
//     <div>Passive: {ourCurrentMon.passives.details} </div>
//     <div className='text-xs text-gray-900'> {ourCurrentMon.passives.reasoning}</div>
//   </div>
// )}
// </button>
