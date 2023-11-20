import React from 'react'
import Dialog from './Dialog'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'

function DialoguePopup(props) {
  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()

  const trigger = contextualState.dialog.isOpen

  const closeDialogPopup = (button) => {
    if (button.onClick) {
      button.onClick()
    }
    // Close the dialogue if it isn't already closed
    // const closeDialogueState = {
    //   ...contextualState,
    //   dialog: {
    //     ...contextualState.dialog,
    //     isOpen: false,
    //   },
    // }
  }

  return trigger ? (
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
              // margin: '2px',
            }}
          >
            {'!'}
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            <div>{contextualState.dialog.title}</div>
          </div>
        </div>
        <div
          style={{
            marginBottom: '8px',
          }}
        >
        </div>
        <div>
          <div>
            <Dialog size="20" myText={contextualState.dialog.message} />
          </div>
          {contextualState.dialog.options.map((button, index) => (
            <button
              key={index}
              onClick={() => {closeDialogPopup(button)}}
              style={{
                backgroundColor: button.backgroundColor || '#4b770e',
                border: 'none',
                color: button.color || '#fff',
                padding: '4px 4px',
                margin: '2px',
                cursor: 'pointer',
              }}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  ) : null
}

export default DialoguePopup
