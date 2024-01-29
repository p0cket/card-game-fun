export default class Actor {
  constructor(
    x,
    y,
    size,
    color = 'blue',
    speed = 10,
    movePattern = 'none',
    steps = [],
  ) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.speed = speed
    this.movePattern = movePattern
    this.direction = 1
    this.pauseCounter = 0
    this.pauseDuration = 60 // Frames to wait between steps
    this.steps = steps
    this.currentStepIndex = 0
    this.stepCounter = 0 // Counter to manage each movement within a step
    this.targetX = undefined
    this.targetY = undefined
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  updatePosition(canvasWidth, canvasHeight) {
    if (this.pauseCounter > 0) {
      this.pauseCounter--
      return
    }

    if (this.steps.length > 0 && this.stepCounter <= 0) {
      const stepDistance = this.steps[this.currentStepIndex] * this.direction
      if (this.movePattern === 'horizontal') {
        this.targetX = this.x + stepDistance
      } else if (this.movePattern === 'vertical') {
        this.targetY = this.y + stepDistance
      }

      this.currentStepIndex = (this.currentStepIndex + 1) % this.steps.length
      this.stepCounter = this.pauseDuration
    } else if (this.stepCounter > 0) {
      this.stepCounter--
    }

    if (this.movePattern === 'horizontal' && this.targetX !== undefined) {
      const dx = (this.targetX - this.x) / this.pauseDuration
      this.x += dx
    } else if (this.movePattern === 'vertical' && this.targetY !== undefined) {
      const dy = (this.targetY - this.y) / this.pauseDuration
      this.y += dy
    }

    if (
      this.x <= 0 ||
      this.x + this.size >= canvasWidth ||
      this.y <= 0 ||
      this.y + this.size >= canvasHeight
    ) {
      this.direction *= -1
      this.x = Math.max(0, Math.min(this.x, canvasWidth - this.size))
      this.y = Math.max(0, Math.min(this.y, canvasHeight - this.size))
      this.targetX = this.targetY = undefined // Reset target
    }
  }

  collidesWith(other) {
    return (
      this.x < other.x + other.size &&
      this.x + this.size > other.x &&
      this.y < other.y + other.size &&
      this.y + this.size > other.y
    )
  }
}
