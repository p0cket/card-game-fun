import React from 'react'
import Dialog from './Dialog'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'

function DialoguePopup(props) {


  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()

  const trigger = contextualState.dialog.isOpen

  const closeDialogPopup = (button) => {
    // if (dispatch) {
    // You can use the state and dispatch here if needed.
    // For example, you can dispatch an action based on the button clicked.
    // dispatch(someAction(button));
    // }
    if (button.onClick) {
      button.onClick()
    }
    const closeDialogueState = {
      ...contextualState,
      dialog: {
        ...contextualState.dialog,
        isOpen: false,
      },
    }
    contextualDispatch({
      payload: closeDialogueState,
      type: ACTIONS.UPDATEGAMEDATA,
    })
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
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <div
        style={{
          position: 'relative',
          padding: '20px',
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
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: 'green',
              marginRight: '10px',
            }}
          >
            {'i'}
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
            marginBottom: '20px',
          }}
        >
          {' '}
        </div>
        <div>
          <div>
            <Dialog size="20" myText={contextualState.dialog.message} />
          </div>
          {contextualState.dialog.options.map((button, index) => (
            <button
              key={index}
              onClick={() => closeDialogPopup(button)}
              style={{
                backgroundColor: button.backgroundColor || '#4b770e',
                border: 'none',
                color: button.color || '#fff',
                padding: '10px 20px',
                margin: '0px 4px',
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
