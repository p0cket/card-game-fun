import React from 'react'
import DialogTemplate from '../common/DialogTemplate'

const TemplateDialog = ({ message, options, header, title, color, background }) => {
  const templateDialogProps = {
    title: 'Example Title',
    header: 'Example Header',
    message: 'This is an example message',
    options: [
      {
        label: 'Example Option 1',
        onClick: () => {},
        backgroundColor: '#4b770e',
        color: '#fff',
      },
      {
        label: 'Example Option 2',
        onClick: () => {},
        backgroundColor: '#4b770e',
        color: '#fff',
      },
      // Include any other options as needed
    ],
  }

  return <DialogTemplate {...templateDialogProps} />
}

export default TemplateDialog
