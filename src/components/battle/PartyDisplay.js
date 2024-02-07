import React from 'react'
import SquirrelyImg from './../../assets/creatures/Squirrely.png'
import LuminowlImg from './../../assets/pals/Luminowl_pxl.png'
import RecyclerooImg from './../../assets/pals/recycleroo_pxl.png'
import TicklefairyImg from './../../assets/pals/Ticklefairy_pxl.png'
import UmbrabunnyImg from './../../assets/pals/Umbrabunny_pxl.png'
import ChibipalDefaultImg from './../../assets/pals/Chibipal.png'

//We could have personality on the pals, they could root or be sad or something and have
// it affect the battle and img

const PartyDisplay = ({ party, userFlag }) => {
  // Placeholder data for party members (with made-up creature names)

  const grabMembers = (party) => {
    // console.warn(`party:`, party)

    if (!userFlag) {
      const convertedMembers = []
      // for (let i = 0; i < party.length; i++) {
      party.map((member) => {
        if (member) {
          convertedMembers.push(member)
        } else {
          console.log(` member ${member}`, member)
        }
      })
      // }
      // console.log(`convertedMembers:`, convertedMembers)
      return convertedMembers
    } else {
      return party
    }
  }
  const partyMembers = grabMembers(party)
  const emptySlots = 5 - partyMembers.length
  const emptySlotsArray = Array.from(
    { length: emptySlots },
    (_, index) => index,
  )

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Silkscreen' }}>
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          color: 'green',
        }}
      > */}
      <div
        className="grid grid-cols-3 gap-1 justify-center items-center text-green-500 p-1 m-1"
      >
        {partyMembers.map((member, index) => (
          <div key={index} className="m-1 border-2 border-green-500 rounded-sm">
            <div>{member.name}</div>
            <div className="flex m-2">
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
        {emptySlotsArray.map((_, index) => (
  <div
    key={`empty-${index}`}
    className="m-1 border-2 border-dashed border-green-500 rounded-sm opacity-50 flex justify-center items-center"
    style={{
      width: '60px',
      height: '80px',
    }}
  >
    <span>Locked</span>
  </div>
))}
      </div>
    </div>
  )
}

export default PartyDisplay

// import React from "react";

// const PartyDisplay = () => {
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

// export default PartyDisplay;
