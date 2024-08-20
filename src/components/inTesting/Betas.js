import CanvasSquare from '../canvas/CanvasSquare'
import GameMap from '../canvas/GameMap'
import NewCanvas from '../canvas/NewCanvas'
import TopDownTest from '../canvas/TopDownTest'
import ThemedButton from '../common/ThemedButton'
import Carousel from '../effects/Carousel'
import FlashingImage from '../effects/misc/FlashingImage'
import Shop from '../scenes/Shop'

const Betas = ({ draw, palImages, gashTrainerImg, loadNextLevel }) => {
  return (
    <>
      <CanvasSquare />
      {/* <NewCanvas draw={draw} width={1024} height={576} /> */}
      <Shop />
      <TopDownTest />
      <GameMap />
      <div className="grid grid-cols-2 items-center gap-4">
        <Carousel ourImages={palImages} />
        <img src={gashTrainerImg} alt="gash trainer" />
      </div>
      {/* TODO: Implement options and museum */}
      <ThemedButton text={`Options`} onClick={loadNextLevel} />
      <ThemedButton text={`Museum`} onClick={loadNextLevel} />
      {/* <SparkleButton /> */}
      <FlashingImage
        src={palImages[0]}
        flashTrigger={true}
        flashCount={1} // Number of times to flash
        glowTrigger={true}
        shakeTrigger={true}
      />{' '}
    </>
  )
}
export default Betas
