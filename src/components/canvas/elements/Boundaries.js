// ./elements/Boundaries.js
export const drawBoundaries = (
  ctx,
  boundaries,
  boundaryImage,
  showBoundaryBackgrounds,
) => {
  if (showBoundaryBackgrounds) {
    boundaries.forEach((boundary) => {
      if (boundaryImage && boundaryImage.complete) {
        ctx.drawImage(
          boundaryImage,
          boundary.x,
          boundary.y,
          boundary.width,
          boundary.height,
        )
      }
    })
  }
}
