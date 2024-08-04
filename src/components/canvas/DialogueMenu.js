export const DialogueMenu = ({ onClose }) => {
  return (
    <div className="absolute top-1/5 left-1/3 bg-boy-green p-10  shadow-md z-40 border border-green-200">
      <p className="mb-5 text-lg leading-normal text-gray-900">
        Encountered an obstacle!
      </p>
      <button
        onClick={() => onClose()}
        className="bg-green-500 text-white border-none px-5 py-2.5 mr-2.5  cursor-pointer text-base"
      >
        Option 1
      </button>
      <button
        onClick={() => onClose()}
        className="bg-blue-500 text-white border-none px-5 py-2.5  cursor-pointer text-base"
      >
        Option 2
      </button>
    </div>
  )
}

