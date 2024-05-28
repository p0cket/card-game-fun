// Assuming the path is correct and accessible
import playerImageSrc from '../../../assets/pals/berocroseal_pxl2.png'

export const loadPlayerImage = () => {
  const image = new Image()
  image.src = playerImageSrc
  return image
}

export const drawPlayer = (ctx, position, playerImage) => {
  if (playerImage && playerImage.complete) {
    ctx.drawImage(playerImage, position.x, position.y, 50, 50)
  } else {
    // Optionally handle the case where the image is not ready
    console.log('Player image not ready or not loaded')
  }
}
