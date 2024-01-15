// LightBeam Attack
// export const LightBeam = {
//     name: 'Light Beam',
//     type: 'elemental',
//     damage: 40,
//     accuracy: 90,
//     speed: 12,
//     cost: { energy: 5 },
//     effect: {
//       description: 'Fires a beam of blinding light at the opponent',
//       chance: 95,
//       result: 'blind',
//       duration: '1 turn',
//       amt: -20,
//     },
//     priority: 'medium',
//     targets: ['opponent'],
//     counter: 'EvasiveTwirlC', // Reference to the counter object
//     forceful: 'SolarFlare', // Reference to the forceful attack object
//   };

// for LightBeam
// Evasive Twirl C (Counter Attack)
export const EvasiveTwirl = {
  name: 'Evasive Twirl',
  type: 'buff',
  damage: 0, // Assuming no damage for a counter move
  accuracy: 90,
  speed: 12, // Assuming same speed as LightBeam or adjust as needed
  cost: { energy: 2 },
  effect: {
    description: 'Perform an evasive twirl to dodge incoming attacks',
    duration: '1 turn',
    evasion_boost: 50,
    chance: 100,
    result: 'evade',
    amt: 10,
  },
  priority: 'medium', // Assuming same priority or adjust as needed
  targets: ['self'], // Target is self for a counter move
  isCounter: true,
}

// Solar Flare (Forceful Attack)
export const SolarBlast = {
  name: 'Solar Flare',
  type: 'elemental',
  damage: 60,
  accuracy: 90,
  speed: 15,
  cost: { energy: 4 },
  effect: {
    description:
      'Unleash a blinding solar flare to guarantee blinding the opponent',
    chance: 100,
    result: 'blind',
    duration: '1 turn',
    amt: -30,
  },
  priority: 'medium', // Assuming same priority or adjust as needed
  targets: ['opponent'],
}
