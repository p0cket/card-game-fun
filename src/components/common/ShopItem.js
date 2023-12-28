const ShopItem = ({ item, onPurchase }) => (
  <div className="border rounded border-green-100 shadow-lg flex flex-col items-center">
    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
    {/* <h3 className=" font-medium  mr-2">{item.name}</h3> */}
    <p className="mb-2"> <span className="font-semibold">{item.price}</span>$</p>
    <button
      onClick={() => onPurchase(item)}
      className="bg-blue-500 text-white   rounded hover:bg-blue-600 transition duration-200 mb-2"
    >
      Buy
    </button>
  </div>
);


// const ShopItem = ({ item, onPurchase }) => {
//   return (
//     <div className="border p-3 rounded shadow-lg flex flex-col items-center">
//       <img
//         src={item.image}
//         alt={item.name}
//         className="w-32 h-32 object-cover mb-2"
//       />
//       <h3 className="text-xl font-medium mb-1">{item.name}</h3>
//       <p className="mb-3">
//         Price: <span className="font-semibold">{item.price}</span> Gold
//       </p>
//       <button
//         onClick={() => onPurchase(item)}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
//       >
//         Buy
//       </button>
//     </div>
//   )
// }

export default ShopItem
