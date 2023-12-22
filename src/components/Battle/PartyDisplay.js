import React from 'react'
import SquirrelyImg from './../../assets/creatures/Squirrely.png'
import LuminowlImg from './../../assets/pals/Luminowl_pxl.png'
import RecyclerooImg from './../../assets/pals/recycleroo_pxl.png'
import TicklefairyImg from './../../assets/pals/Ticklefairy_pxl.png'
import UmbrabunnyImg from './../../assets/pals/Umbrabunny_pxl.png'
import ChibipalDefaultImg from './../../assets/pals/Chibipal.png'

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
        {emptySlotsArray.map((_, index) => (
          <div
            key={`empty-${index}`}
            style={{
              margin: '5px',
              border: '2px dashed green',
              borderRadius: '2%',
              opacity: 0.5,
              width: '60px', // Set width (and height if needed) to match your member cards
              height: '80px', // Set height to match your member cards
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span>Empty</span>
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
