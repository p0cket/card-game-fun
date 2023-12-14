import React from 'react'
import Dialog from './Dialog'
import { useStateContext } from '../../MainContext'

function DialogTemplate({ title, message, options }) {
  // console.warn(`DialogTemplate: ${title}, ${message}, ${options}`, options)
  // You can include logic to handle the open/close state of the dialog here
  const contextualState = useStateContext()
  const isOpen = contextualState.dialog.isOpen // For demonstration; replace with actual logic

  const closeDialogPopup = (button) => {
    if (typeof button.onClick === 'function') {
      button.onClick()
    }
    // Additional logic to close the dialog goes here
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
          {options.map((button, index) => (
            <button
              key={index}
              onClick={() => closeDialogPopup(button)}
              style={{
                backgroundColor: button.backgroundColor || '#4b770e',
                border: 'none',
                color: button.color || '#fff',
                padding: '4px 4px',
                margin: '2px',
                cursor: 'pointer',
              }}
              className="font-[silkscreen]"
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  ) : null
}

export default DialogTemplate
