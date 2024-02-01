import React, { useState } from 'react';
import { useDispatchContext, useStateContext } from '../../MainContext';

const ItemMenuModal = ({ items, setItemModalVisible }) => {
  const contextualState = useStateContext();
  const contextualDispatch = useDispatchContext();
  const [selectedItem, setSelectedItem] = useState(null);

  const useItem = (item) => {
    if (item.qty > 0) {
      console.log(`Using ${item.name}...`, item);
      contextualDispatch({
        type: 'USE_ITEM',
        payload: item,
      });
      setSelectedItem(null); // Clear selection after use
    } else {
      console.log(`You don't have any ${item.name} left. Qty is ${item.qty}`);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 font-[silkscreen]">
      <div className="bg-boy-green text-white p-4 rounded max-w-md w-full" role="dialog" aria-modal="true" aria-labelledby="item-modal-title">
        <h2 id="item-modal-title" className="font-bold text-lg mb-4">Items</h2>
        
        {/* Display selected item's details */}
        {selectedItem && (
          <div className="bg-gray-800 p-3 rounded mb-4">
            <p className="text-white text-sm">{selectedItem.description}</p>
            <button
              onClick={() => useItem(selectedItem)}
              className="mt-2 p-2 bg-green-600 text-white rounded"
            >
              Use {selectedItem.name}
            </button>
          </div>
        )}
        
        <div className="divide-y divide-gray-200">
          {items.length === 0 ? (
            <p className="text-center text-white">You have no items though...</p>
          ) : (
            items.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2">
                <span>{item.name}</span>
                <span>{item.qty}x</span>
                <button
                  onClick={() => setSelectedItem(item)}
                  disabled={item.qty === 0}
                  className={`ml-4 ${item.qty > 0 ? 'text-black' : 'text-gray-700'}`}
                >
                  Select
                </button>
              </div>
            ))
          )}
        </div>
        <button onClick={() => setItemModalVisible(false)} className="mt-4 p-2 bg-green-600 text-white rounded">Close</button>
      </div>
    </div>
  );
};

export default ItemMenuModal;

// import { useDispatchContext, useStateContext } from '../../MainContext'

// const ItemMenuModal = ({ items, setItemModalVisible }) => {
//   const contextualState = useStateContext()
//   const contextualDispatch = useDispatchContext()

//   const useItem = (item) => {
//     if (item.qty > 0) {
//       console.log(`Using ${item.name}...`, item)
//       contextualDispatch({
//         type: 'USE_ITEM',
//         payload: item,
//       })
//     } else {
//       console.log(`You don't have any ${item.name} left. Qty is ${item.qty}`)
//     }
//   }

//   return (
//     <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 font-[silkscreen]">
//       <div
//         className="bg-boy-green text-white p-4 rounded max-w-md w-full"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="item-modal-title"
//       >
//         <h2 id="item-modal-title" className="font-bold text-lg mb-4">
//           Items
//         </h2>
//         <div className="divide-y divide-gray-200">
//           {items.length === 0 ? (
//             <p className="text-center text-white">You have no items though...</p>
//           ) : (
//             items.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center p-2"
//               >
//                 <span>{item.name}</span>
//                 <span>{item.qty}x</span>
//                 <button
//                   onClick={() => useItem(item)}
//                   disabled={item.qty === 0}
//                   className={`ml-4 ${
//                     item.qty > 0 ? 'text-black' : 'text-gray-700'
//                   }`}
//                 >
//                   Use
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//         <button
//           onClick={() => setItemModalVisible(false)}
//           className="mt-4 p-2 bg-green-600 text-white rounded"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ItemMenuModal
