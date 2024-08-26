import React, { useState } from 'react'
import CanvasSquare from '../canvas/CanvasSquare'
import GameMap from '../canvas/GameMap'
import NewCanvas from '../canvas/NewCanvas'
import TopDownTest from '../canvas/TopDownTest'
import ThemedButton from '../common/ThemedButton'
import Carousel from '../effects/Carousel'
import FlashingImage from '../effects/misc/FlashingImage'
import Shop from '../scenes/Shop'
import PixelButton from '../common/PixelButton'

const Betas = ({ draw, palImages, gashTrainerImg, loadNextLevel }) => {
  // const [displayComponent, setDisplayComponent] = useState(null)
  const [displayComponent, setDisplayComponent] = useState('TopDownTest')


  const handleButtonClick = (componentName) => {
    setDisplayComponent(componentName)
  }

  const renderComponent = () => {
    switch (displayComponent) {
      case 'CanvasSquare':
        return <CanvasSquare />
      case 'NewCanvas':
        return <NewCanvas draw={draw} width={1024} height={576} />
      case 'Shop':
        return <Shop />
      case 'TopDownTest':
        return <TopDownTest />
      case 'GameMap':
        return <GameMap />
      default:
        return null
    }
  }

  return (
    <>
      {/* <div >
        <PixelButton onClick={() => handleButtonClick('CanvasSquare')}>
          CanvasSquare
        </PixelButton>
        <PixelButton onClick={() => handleButtonClick('NewCanvas')}>
          NewCanvas
        </PixelButton>
        <PixelButton onClick={() => handleButtonClick('Shop')}>
          Shop
        </PixelButton>
        <PixelButton onClick={() => handleButtonClick('TopDownTest')}>
          TopDownTest
        </PixelButton>
        <PixelButton onClick={() => handleButtonClick('GameMap')}>
          GameMap
        </PixelButton>
      </div> */}
      {renderComponent()}
      {/* <div className="grid grid-cols-2 items-center gap-4">
        <Carousel ourImages={palImages} />
        <img src={gashTrainerImg} alt="gash trainer" />
      </div> */}
      {/* TODO: Implement options and museum */}
      {/* <ThemedButton text={`Options`} onClick={loadNextLevel} />
      <ThemedButton text={`Museum`} onClick={loadNextLevel} /> */}
      {/* <SparkleButton /> */}
      {/* <FlashingImage
        src={palImages[0]}
        flashTrigger={true}
        flashCount={1} // Number of times to flash
        glowTrigger={true}
        shakeTrigger={true}
      />{' '} */}
    </>
  )
}
export default Betas
