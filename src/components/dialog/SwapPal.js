import React, { useState } from 'react'
import PartyDisplay from '../battle/PartyDisplay'
import { useDispatchContext, useStateContext } from '../../MainContext'
import PartyMenu from '../battle/PartyMenu'
import { PLAYERS } from '../../consts/consts'

//when you get a chance, change to SwapPalOnFaint
function SwapPal() {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const [palToSwapWith, setPalToSwapWith] = useState()
  const [palToSwapWithLocation, setPalToSwapWithLocation] = useState()
  const isOpen = state.dialog.isOpen // For demonstration; replace with actual logic
  const party = state.userParty
 


  const handleSwapConfirm = (
    pal,
    palLocation,
    thePalToSwapWith,
    thePalToSwapWithLocation,
  ) => {
    dispatch({
      type: 'SWAP_PAL',
      payload: {
        palToSwap: pal,
        palLocation: palLocation,
        palToSwapWith: thePalToSwapWith,
        palToSwapWithLocation: thePalToSwapWithLocation,
        player: PLAYERS.HUMAN,
      },
    })
  }

  return isOpen ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '10vh',
        zIndex: 100,
      }}
    >
      SwapPal
      <div
        style={{
          position: 'relative',
          padding: '10px',
          backgroundColor: '#5a7d2a',
          width: '80%',
          maxWidth: '640px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <PartyMenu
          party={party}
          palToSwapWith={palToSwapWith}
          setPalToSwapWith={setPalToSwapWith}
          setPalToSwapWithLocation={setPalToSwapWithLocation}
          type={'fainted'}
        />
        {palToSwapWith ? (
          <button
            onClick={() => {
              handleSwapConfirm(
                state.userParty[0],
                0,
                palToSwapWith,
                palToSwapWithLocation,
              )
            }}
          >
            Swap
          </button>
        ) : null}
      </div>
      {/* {options.map((button, index) => button && (
            <button
              key={index}
              onClick={() => closeDialogPopup(button)}
              style={{
                backgroundColor: (button.backgroundColor || '#4b770e'),
                border: 'none',
                color: (button.color || '#fff'),
                padding: '4px 4px',
                margin: '2px',
                cursor: 'pointer',
              }}
              className="font-[silkscreen]"
            >
              {button.label}
            </button>
          )).filter(Boolean)} */}
    </div>
  ) : null
}

export default SwapPal

{
  /* <div>
<div
  style={{
    position: 'relative',
    padding: '10px',
    backgroundColor: '#5a7d2a',
    width: '80%',
    maxWidth: '640px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  }}
>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '2px',
    }}
  >
    <div
      style={{
        width: '24px',
        height: '24px',
        backgroundColor: 'green',
        marginRight: '2px',
      }}
      className="font-[silkscreen]"
    >
      {'()'}
    </div>
    <div
      style={{
        fontSize: '24px',
        fontWeight: 'bold',
      }}
    >
      <div className="font-[silkscreen]">{title}</div>
    </div>
  </div>
  <Dialog size="20" myText={message} />
  <div>
    {options.map((button, index) => button && (
      <button
        key={index}
        onClick={() => closeDialogPopup(button)}
        style={{
          backgroundColor: (button.backgroundColor || '#4b770e'),
          border: 'none',
          color: (button.color || '#fff'),
          padding: '4px 4px',
          margin: '2px',
          cursor: 'pointer',
        }}
        className="font-[silkscreen]"
      >
        {button.label}
      </button>
    )).filter(Boolean)}
  </div>
</div>
</div> */
}
