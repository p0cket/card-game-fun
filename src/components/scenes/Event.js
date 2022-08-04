import React from 'react'

const Event = () => {
  const eventDeets = [
    {
      name: "Sample Event",
      description: "You happen upon a glade",
      choices: ["Fight the civilians", "Keep going going on path"],
      choiceResults: [
        { type: "gold", num: 30 },
        { type: "exit", num: 0 }
      ]
    }
  ];

  // types
  // - reward
  //  • health
  //  • money
  //  • cards
  // - enemy
  // - story
  // - more dialog

  const executeChoice = (choice) => {
    // console.log(`Your choice: ${choice}`, choice, choice.type);
    switch (choice.type) {
      case "health":
        console.log(`health choice`);
        break;
      case "money":
        console.log(`money choice`);
        break;
      case "cards":
        console.log(`cards choice`);
        break;
      case "enemy":
        console.log(`enemy choice`);
        break;
      case "story":
        console.log(`story choice`);
        break;
      case "exit":
        console.log(`exit choice`);
        break;
      default:
        console.log(`no proper executeChoice choice`);
        break;
    }
  };

  return (
    <div>
      <h5>Event Name: {eventDeets[0].name} </h5>
      <div>{eventDeets[0].description}</div>
      <br />
      <button onClick={() => executeChoice(eventDeets[0].choiceResults[0])}>
        {eventDeets[0].choices[0]}
      </button>
      <button onClick={() => executeChoice(eventDeets[0].choiceResults[1])}>
        {eventDeets[0].choices[1]}
      </button>
      <br />
      <br />
    </div>
  );
};

export default Event;
