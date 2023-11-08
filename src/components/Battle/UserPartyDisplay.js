import React from 'react'
import Squirrely from './../../assets/creatures/Squirrely.png'

const UserPartyDisplay = () => {
  // Placeholder data for party members (with made-up creature names)
  const partyMembers = [
    {
      name: 'Sparklepaw',
      health: 80,
      image: Squirrely,
    },
    {
      name: 'Firebreath',
      health: 70,
      image: Squirrely,
    },
    {
      name: 'Leafywing',
      health: 90,
      image: Squirrely,
    },
    {
      name: 'Bubblesnout',
      health: 60,
      image: Squirrely,
    },
    {
      name: 'Aquaflare',
      health: 75,
      image: Squirrely,
    },
    {
      name: 'Aquaflare',
      health: 75,
      image: Squirrely,
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
//     Squirrely,
//     Squirrely,
//     Squirrely,
//     Squirrely,
//     Squirrely,
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
