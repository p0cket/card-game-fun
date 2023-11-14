import React from 'react'
import SquirrelyImg from './../../assets/creatures/Squirrely.png'
import LuminowlImg from './../../assets/pals/Luminowl_pxl.png'
import RecyclerooImg from './../../assets/pals/recycleroo_pxl.png'
import TicklefairyImg from './../../assets/pals/Ticklefairy_pxl.png'
import UmbrabunnyImg from './../../assets/pals/Umbrabunny_pxl.png'
import ChibipalDefaultImg from './../../assets/pals/Chibipal.png'

const UserPartyDisplay = () => {
  // Placeholder data for party members (with made-up creature names)
  const partyMembers = [
    {
      name: 'Recycleroo',
      health: 75,
      image: RecyclerooImg,
    },
    {
      name: 'Umbrabunny',
      health: 70,
      image: UmbrabunnyImg,
    },
    {
      name: 'DefaultPal',
      health: 90,
      image: ChibipalDefaultImg,
    },
    {
      name: 'Bubblesnout',
      health: 60,
      image: SquirrelyImg,
    },
    {
      name: 'Squirrely',
      health: 75,
      image: SquirrelyImg,
    },
    {
      name: 'Sparklepaw',
      health: 80,
      image: SquirrelyImg,
    },
  ]

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Silkscreen' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          color: 'green',
        }}
      >
        {partyMembers.map((member, index) => (
          <div
            key={index}
            style={{
              margin: '5px',
              border: '2px solid green',
              borderRadius: '2%',
            }}
          >
            <div>{member.name}</div>
            <div className="flex">
              <img
                src={member.image}
                alt={`Party Member ${index + 1}`}
                style={{
                  width: '30px',
                  height: '30px',
                }}
              />
              <div>
                HP: {member.health}
                <div
                  style={{
                    backgroundColor: 'green',
                    width: `${(member.health / 100) * 60}px`,
                    height: '5px',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPartyDisplay

// import React from "react";

// const UserPartyDisplay = () => {
//   // Placeholder image URLs (you can replace these with actual image URLs)
//   const placeholderImages = [
//     SquirrelyImg,
//     SquirrelyImg,
//     SquirrelyImg,
//     SquirrelyImg,
//     SquirrelyImg,
//   ];

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       {placeholderImages.map((image, index) => (
//         <img
//           key={index}
//           src={image}
//           alt={`Party Member ${index + 1}`}
//           style={{
//             width: '60px', // Adjust the image size as needed
//             height: '60px',
//             border: '2px solid green', // Optional border for styling
//             borderRadius: '10%', // To create rounded images
//             margin: '5px', // Adjust margin as needed
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default UserPartyDisplay;
