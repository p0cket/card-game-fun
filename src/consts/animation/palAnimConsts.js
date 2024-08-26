export const idleAnimConfig = {
  // Idle (breathing) animation setup
  scale: [1, 1.02, 1],
  x: [0, 2, -3, 5, -1, 5, -3, 0],
  y: [0, 3, -1, 4, 0],
  transition: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
}

export const idleAnimConfig2 = {
  // Idle (breathing) animation setup for the bot sprite
  scale: [1, 1.02, 1],
  x: [0, 2, -3, 5, -1, 5, -3, 0],
  y: [0, 3, -1, 4, 0],
  transition: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
}

export const damageStartedAnimConfig = {
  // Health decrease triggers a shake animation
  x: [0, -5, 5, -5, 5, 0],
  transition: { duration: 0.5 },
  filter: ['brightness(100%)', 'brightness(0%)', 'brightness(100%)'],
}
