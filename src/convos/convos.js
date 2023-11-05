
// import { basicConvos } from "./convoCategories"
import { howToPlay } from './tutorialConvos'

export const firstMeeting = [
  { actor: 'Jack', text: 'Whoa, what is that thing?', pos: 'left' },
  {
    actor: 'Luna',
    text: 'I am Luna, a genetically modified dragon-wolf hybrid.',
    pos: 'right',
    actions: [
      {
        text: "You're a what?",
        result: 'dialog',
        // reward: { amt: 60, type: "gold" },
        resultLocation: howToPlay,
      },
      {
        text: 'push him over',
      },
    ],
  },
  { actor: 'Jack', text: 'Cool, can we be friends?', pos: 'left' },
  {
    actor: 'Luna',
    text: 'I would be honored to accompany you on your adventures.',
    pos: 'right',
  },
  {
    actor: 'Jack',
    text: "That's great to hear! So, what kind of adventures have you been on?",
    pos: 'left',
  },
  {
    actor: 'Luna',
    text: "I've traveled through many forests, climbed mountains, and even explored some ancient ruins.",
    pos: 'right',
  },
  {
    actor: 'Jack',
    text: "Wow, you've been on some amazing adventures! I'm a bit of an adventurer myself.",
    pos: 'left',
  },
  {
    actor: 'Luna',
    text: 'It sounds like we would make great companions on our future journeys together.',
    pos: 'right',
  },
  {
    actor: 'Jack',
    text: "I couldn't agree more! So, what do you think our next adventure should be?",
    pos: 'left',
  },
  {
    actor: 'Luna',
    text: 'How about we explore a mysterious jungle rumored to be filled with hidden treasures?',
    pos: 'right',
  },
  {
    actor: 'Jack',
    text: "Sounds like a great idea! Let's go on our next adventure together!",
    pos: 'left',
  },
]

export const testConvo = [
  {
    actor: 'ADAM',
    text: "I'm surprised you're okay",
    pos: 'left',
    actions: [
      {
        text: 'How did you first meet?',
        result: 'dialog',
        resultLocation: firstMeeting,
        // resultLocation: convoHelper.basic.firstMeeting,
      },
      {
        text: 'push him over',
      },
    ],
  },
  { actor: 'ADAM', text: 'This is definitely a test', pos: 'left' },
  { actor: 'LISA', text: "That can't be right", pos: 'right' },
  { actor: 'ADAM', text: "I'm telling you, its true", pos: 'left' },
  { actor: 'LISA', text: "I don't see why", pos: 'middle' },
  {
    actor: 'ADAM',
    text: "I'll say it again, this is a little odd to not be a test",
    pos: 'left',
  },
]

// separate files for fanning out dialog trees
// export const secondMeeting = []
// export const eventConvos = {}
// export const rewardConvos = {}
