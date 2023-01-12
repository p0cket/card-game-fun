export const possibleEvents = [
    {
      name: "Sample Event",
      description: "You happen upon a glade",
      choices: ["Fight the civilians", "Keep going going on path"],
      choiceResults: [
        { type: "money", num: 30 },
        { type: "exit", num: 0 },
      ],
    },
    // {
    //     name: "Friendly Creature Encounter",
    //     description: "As you explore the wilderness, you come across a friendly looking creature. It seems curious about you.",
    //     choices: ["Approach the creature", "Sneak away"],
    //     choiceResults: [
    //         { type: "card", num: 0, next: "Friendly Fox" },
    //         { type: "exit", num: 0 },
    //     ]
    // },
    // {
    //     name: "Riverside Picnic",
    //     description: "You come across a beautiful riverside spot. You see a basket of food and a blanket laid out. It seems someone's been here recently.",
    //     choices: ["Enjoy the food", "Leave the food"],
    //     choiceResults: [
    //         { type: "health", num: 20 },
    //         { type: "exit", num: 0 },
    //     ]
    // },
    // {
    //     name: "Abandoned Town",
    //     description: "You come across an old town. It looks abandoned, but you can see smoke coming from one of the chimneys.",
    //     choices: ["Investigate the town", "Keep moving"],
    //     choiceResults: [
    //         { type: "story", num: 0, next: "Abandoned Town Mystery" },
    //         { type: "exit", num: 0 },
    //     ]
    // },
    // {
    //     name: "Fishing Hole",
    //     description: "You come across a peaceful pond. It seems like a great spot to fish.",
    //     choices: ["Go fishing", "Keep moving"],
    //     choiceResults: [
    //         { type: "health", num: 10 },
    //         { type: "exit", num: 0 },
    //     ]
    // },
    // {
    //     name: "Help a traveler",
    //     description: "You come across a traveler who is lost, He needs your help to guide him to the next town.",
    //     choices: ["Help him", "Leave him behind"],
    //     choiceResults: [
    //         { type: "money", num: 20 },
    //         { type: "exit", num: 0 },
    //     ]
    // },
    // {
    //     name: "Lost in the Forest",
    //     description: "You're lost in the forest and you have to find your way out.",
    //     choices: ["Follow the river","Go in a random direction"],
    //     choiceResults: [
    //         { type: "story", num: 0, next: "Finding the way out" },
    //         { type: "health", num: -10 },
    //     ]
    // },
    // {
    //     name: "A strange man",
    //     description: "You come across a strange man in the middle of the path, he seems to be lost in thought.",
    //     choices: ["Talk to him","Leave him alone"],
    //     choiceResults: [
    //         { type: "story", num: 0, next: "The strange man story" },
    //         { type: "exit", num: 0 },
    //     ]
    // },
    // {
    //     name: "A Hermit",
    //     description: "You find a hermit living in a cave, he seems to be eccentric and has many stories to tell",
    //     choices: ["Listen to his stories", "Keep going"],
    //     choiceResults: [
    //         { type: "card", num: 0, next: "Hermit's tales" },
    //         { type: "exit", num: 0 },
    //     ]
    // },
    // {
    //     name: "A Mysterious Stone",
    //     description: "You come across a strange stone with ancient symbols etched on it. It seems to be pulsing with energy.",
    //     choices: ["Investigate the stone", "Leave it be"],
    //     choiceResults: [
    //         { type: "card", num: 0, next: "Mystery Stone" },
    //         { type: "exit", num: 0 },
    //     ]
    // },
    // {
    //     name: "A Bandit Ambush",
    //     description: "You are ambushed by a group of bandits on the road. They demand all of your money and valuables.",
    //     choices: ["Fight the bandits", "Hand over the money"],
    //     choiceResults: [
    //         { type: "enemy", num: 0, next: "Bandit Leader" },
    //         { type: "money", num: -50 },
    //     ]
    // },
    {
        name: "Help a Farmer",
        description: "You come across a farmer who needs help with his harvest. He offers to pay you for your help.",
        choices: ["Help the farmer", "Keep moving"],
        choiceResults: [
            { type: "money", num: 30 },
            { type: "exit", num: 0 },
        ]
    },
    // {
    //     name: "A Wild Fire",
    //     description: "You come across a raging wild fire. It's blocking your path.",
    //     choices: ["Fight the fire", "Find another way"],
    //     choiceResults: [
    //         { type: "card", num: 0, next: "Fire Elemental" },
    //         { type: "exit", num: 0 },
    //     ]
    // },
    // {
    //     name: "A Waterfall",
    //     description: "You come across a beautiful waterfall. The water is crystal clear and inviting.",
    //     choices: ["Take a swim", "Keep moving"],
    //     choiceResults: [
    //         { type: "health", num: 15 },
    //         { type: "exit", num: 0 },
    //     ]
    // },
    // {
    //     name: "A Stampede",
    //     description: "You come across a herd of wild creatures stampeding. It's blocking your path.",
    //     choices: ["Fight the creatures", "Find another way"],
    //     choiceResults: [
    //         { type: "enemy", num: 0, next: "Stampede Leader" },
    //         { type: "health", num: -10 },
    //     ]
    // },
    // {
    //     name: "A Strange Tower",
    //     description: "You come across a tall tower in the middle of the wilderness. It's door is open and you can see the light from inside",
    //     choices: ["Enter the tower", "Leave it alone"],
    //     choiceResults: [
    //         { type: "story", num: 0, next: "The Tower Adventure" },
    //         { type: "exit", num: 0 },
    //     ]
    // }
  ]