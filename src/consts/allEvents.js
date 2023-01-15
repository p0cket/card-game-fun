export const possibleEvents = [
  {
    name: "Sample Event",
    description: "You happen upon a glade",
    choices: [
      {
        choice: "Fight the civilians",
        resultType: "money",
        resultNum: 30,
        resultDialog: "Great Job",
        resultDialogTitle: "Thanks!",
      },
      {
        choice: "Keep going going on path",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "Next time you'll get it",
        resultDialogTitle: "Its okay",
      },
    ],
  },
  {
    name: "Help a lost traveler",
    description:
      "You come across a lost traveler who needs help finding his way to the next town.",
    choices: [
      {
        choice: "Help him",
        resultType: "money",
        resultNum: 50,
        resultDialog: "You've helped the traveler and received a reward.",
        resultDialogTitle: "Thanks!",
      },
      {
        choice: "Leave him",
        resultType: "health",
        resultNum: -5,
        resultDialog:
          "You've decided to leave the traveler, your kindness has decreased",
        resultDialogTitle: "Not so kind",
      },
    ],
  },
  {
    name: "Abandoned mine",
    description:
      "You find an abandoned mine in the middle of the forest, it seems like it was left in a hurry.",
    choices: [
      {
        choice: "Explore the mine",
        resultType: "money",
        resultNum: 20,
        resultDialog: "You've found some valuable resources in the mine.",
        resultDialogTitle: "Great find!",
      },
      {
        choice: "Leave the mine",
        resultType: "health",
        resultNum: 10,
        resultDialog:
          "You've decided to leave the mine and rest, your health has increased",
        resultDialogTitle: "Rest and recover",
      },
    ],
  },
  {
    name: "A wounded animal",
    description: "You come across a wounded animal, it seems to be in pain.",
    choices: [
      {
        choice: "Help the animal",
        resultType: "health",
        resultNum: 15,
        resultDialog:
          "You've helped the animal and it has increased your kindness and health.",
        resultDialogTitle: "Kindness pays off",
      },
      {
        choice: "Leave the animal",
        resultType: "health",
        resultNum: -5,
        resultDialog:
          "You've decided to leave the animal, your kindness has decreased",
        resultDialogTitle: "Not so kind",
      },
    ],
  },
  {
    name: "A mysterious chest",
    description:
      "You come across a chest in the middle of the forest, it seems to be locked.",
    choices: [
      {
        choice: "Open the chest",
        resultType: "money",
        resultNum: 50,
        resultDialog: "You've found some valuable treasures in the chest.",
        resultDialogTitle: "Great find!",
      },
      {
        choice: "Leave the chest",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "You've decided to leave the chest, maybe next time",
        resultDialogTitle: "Maybe next time",
      },
    ],
  },
  {
    name: "A lost village",
    description:
      "You come across a village that seems to be abandoned, but you can see smoke coming from one of the chimneys.",
    choices: [
      {
        choice: "Investigate the village",
        resultType: "money",
        resultNum: 30,
        resultDialog: "You've found some valuable resources in the village.",
        resultDialogTitle: "Great find!",
      },
      {
        choice: "Leave the village",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "You've decided to leave the village, maybe next time",
        resultDialogTitle: "Maybe next time",
      },
    ],
  },
  {
    name: "A strange man",
    description:
      "You come across a strange man in the middle of the path, he seems to be lost in thought.",
    choices: [
      {
        choice: "Talk to him",
        resultType: "money",
        resultNum: 20,
        resultDialog: "You've helped the man and received a reward.",
        resultDialogTitle: "Thanks!",
      },
      {
        choice: "Leave him alone",
        resultType: "health",
        resultNum: -5,
        resultDialog:
          "You've decided to leave the man alone, your kindness has decreased.",
        resultDialogTitle: "Not so kind",
      },
    ],
  },
  {
    name: "A strange potion",
    description:
      "You come across a strange potion in the middle of the path, it seems to be glowing.",
    choices: [
      {
        choice: "Drink the potion",
        resultType: "health",
        resultNum: 20,
        resultDialog: "You've drank the potion and your health has increased.",
        resultDialogTitle: "Health boost!",
      },
      {
        choice: "Leave the potion",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "You've decided to leave the potion, maybe next time",
        resultDialogTitle: "Maybe next time",
      },
    ],
  },
  {
    name: "A river crossing",
    description:
      "You come across a river that needs to be crossed, but the water is too deep.",
    choices: [
      {
        choice: "Swim across the river",
        resultType: "health",
        resultNum: 15,
        resultDialog:
          "You've swam across the river and your health has increased.",
        resultDialogTitle: "Health boost!",
      },
      {
        choice: "Find another way",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "You've decided to find another way, maybe next time",
        resultDialogTitle: "Maybe next time",
      },
    ],
  },
  {
    name: "A treasure map",
    description:
      "You come across a treasure map, it seems to be leading to a hidden treasure.",
    choices: [
      {
        choice: "Follow the map",
        resultType: "money",
        resultNum: 50,
        resultDialog: "You've found the treasure and received a reward.",
        resultDialogTitle: "Thanks!",
      },
      {
        choice: "Leave the map",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "You've decided to leave the map, maybe next time",
        resultDialogTitle: "Maybe next time",
      },
    ],
  },
  {
    name: "Abandoned Research Facility",
    description:
      "You come across an abandoned research facility deep in the forest, it looks like it has been abandoned for quite some time.",
    choices: [
      {
        choice: "Explore the facility",
        resultType: "gold",
        resultNum: 100,
        resultDialog:
          "You've found a lot of valuable resources and equipment in the facility. You also found some notes that hint at the creatures you've been encountering being the result of some kind of genetic experimentation. You take the notes with you and continue your journey.",
        resultDialogTitle: "Great find!",
      },
      {
        choice: "Leave the facility",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "You've decided to leave the facility, maybe next time",
        resultDialogTitle: "Maybe next time",
      },
    ],
  },
  {
    name: "Encounter with a mutant creature",
    description:
      "You come across a creature that seems to be a twisted mix of different animals, it looks aggressive and ready to attack.",
    choices: [
      {
        choice: "Fight the creature",
        resultType: "gold",
        resultNum: 50,
        resultDialog:
          "You've fought and defeated the creature, it seems to be another example of the genetic experimentation you've been hearing about. You take some valuable resources from the creature and continue your journey.",
        resultDialogTitle: "Victory!",
      },
      {
        choice: "Run away",
        resultType: "health",
        resultNum: -10,
        resultDialog:
          "You've decided to run away from the creature, but it managed to wound you as you fled. You need to rest and recover before continuing your journey.",
        resultDialogTitle: "Wounded",
      },
    ],
  },
  {
    name: "A friendly tribe",
    description:
      "You come across a tribe of friendly creatures that have taken in some of the mutated creatures as their own.",
    choices: [
      {
        choice: "Join the tribe",
        resultType: "health",
        resultNum: 20,
        resultDialog:
          "You've decided to join the tribe and rest for a while. The tribe's healers have taken care of your wounds and you've learned a lot about the creatures and the experimentation from the tribe members. You say your goodbyes and continue your journey with newfound knowledge.",
        resultDialogTitle: "Rest and recovery",
      },
      {
        choice: "Leave the tribe",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "You've decided to leave the tribe, maybe next time",
        resultDialogTitle: "Maybe next time",
      },
    ],
  },
  {
    name: "A hidden laboratory",
    description:
      "You come across a hidden laboratory deep in the forest, it looks like it is still in operation.",
    choices: [
      {
        choice: "Investigate the laboratory",
        resultType: "gold",
        resultNum: 150,
        resultDialog:
          "You've found the source of the genetic experimentation, the laboratory is still in operation and you've found a lot of valuable resources and information. You also found some evidence of who is behind the experimentation, you take what you can and destroy the rest of the laboratory. You continue your journey with a heavy heart and a newfound determination to put an end to the experimentation.",
        resultDialogTitle: "Great find!",
      },
      {
        choice: "Leave the laboratory",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "You've decided to leave the laboratory, maybe next time",
        resultDialogTitle: "Maybe next time",
      },
    ],
  },
  {
    name: "A village under attack",
    description:
      "You come across a village that is under attack by mutated creatures.",
    choices: [
      {
        choice: "Fight alongside the villagers",
        resultType: "gold",
        resultNum: 75,
        resultDialog:
          "You've helped the villagers fend off the attack, they are grateful and reward you with valuable resources. You also learn more about the experimentation and who may be behind it. You continue your journey with a newfound determination to put an end to the experimentation and protect innocent lives.",
        resultDialogTitle: "Victory!",
      },
      {
        choice: "Leave the village",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "You've decided to leave the village, maybe next time",
        resultDialogTitle: "Maybe next time",
      },
    ],
  },
  {
    name: "A hidden cave",
    description:
      "You come across a hidden cave in the mountains, it looks like it has not been explored in a long time.",
    choices: [
      {
        choice: "Explore the cave",
        resultType: "gold",
        resultNum: 100,
        resultDialog:
          "You've explored the cave and found a lot of valuable resources and ancient artifacts. You also discovered some ancient texts that contain information about the creatures and the experimentation. You take the texts with you and continue your journey.",
        resultDialogTitle: "Great find!",
      },
      {
        choice: "Leave the cave",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "You've decided to leave the cave, maybe next time",
        resultDialogTitle: "Maybe next time",
      },
    ],
  },
  {
    name: "A healing spring",
    description:
      "You come across a healing spring deep in the forest, the water is said to have healing properties.",
    choices: [
      {
        choice: "Drink from the spring",
        resultType: "health",
        resultNum: 30,
        resultDialog:
          "You've drank the water from the spring and your health has been restored. The water also seems to have a cleansing effect, you feel like you've been rid of some negative energy. You continue your journey feeling refreshed and renewed.",
        resultDialogTitle: "Healed!",
      },
      {
        choice: "Leave the spring",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "You've decided to leave the spring, maybe next time",
        resultDialogTitle: "Maybe next time",
      },
    ],
  },
  {
    name: "A strange statue",
    description:
      "You come across a strange statue deep in the forest, it looks like it has been there for a very long time.",
    choices: [
      {
        choice: "Examine the statue",
        resultType: "gold",
        resultNum: 50,
        resultDialog:
          "You've examined the statue and found a hidden compartment containing valuable resources. The statue also seems to be connected to the creatures and the experimentation in some way, you take note of it and continue your journey.",
        resultDialogTitle: "Great find!",
      },
      {
        choice: "Leave the statue",
        resultType: "exit",
        resultNum: 0,
        resultDialog: "You've decided to leave the statue, maybe next time",
        resultDialogTitle: "Maybe next time",
      },
    ],
  },
]
