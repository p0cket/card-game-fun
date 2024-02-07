import React, { useState } from 'react'
import PartyDisplay from '../battle/PartyDisplay'
import { useDispatchContext, useStateContext } from '../../MainContext'
import PartyMenu from '../battle/PartyMenu'
import { PLAYERS } from '../../consts/consts'

function SwapPalBasic() {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const isOpen = state.dialog.isOpen
  const party = state.userParty

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
        <PartyMenu party={party} type={'display'} hasSwitchOption={true} />
      </div>
    </div>
  ) : null
}

export default SwapPalBasic
