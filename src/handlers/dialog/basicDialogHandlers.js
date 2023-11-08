const exampleOptions = [
  {
    label: 'Oh dear',
    onClick: () => {
      //commented out but you do need the right state passed in and applied
      // const closedPopupState = createPopupRemovedState(contextualState)
      // console.log(closedPopupState)

      // return closedPopupState
    
    },
    backgroundColor: '#4b770e',
    color: '#fff',
  },
]

export const createOption = (label, onClick, backgroundColor, color) => {
  return {
    label: label,
    onClick: onClick,
    backgroundColor: backgroundColor,
    color: color,
  }
}

export const closeOption = (ourState) => {
  createOption(
    'Close',
    () => createPopupRemovedState(ourState),
    '#4b770e',
    '#fff',
  )
}

export const createPopupRemovedState = (prevState) => {
  return {
    ...prevState,
    dialog: {
      ...prevState.dialog,
      isOpen: false,
    },
  }
}

// export const createPopupVisibleState = ({
//   prevState,
//   message = 'default message',
//   options = exampleOptions,
//   header = 'Default Header',
//   title = 'default title',
//   color = '#000',
//   background = '#fff',
// }) => {
//   console.log(
//     'createPopupVisibleState:',
//     prevState,
//     message,
//     options,
//     header,
//     title,
//     color,
//     background,
//   )
//   return {
//     ...prevState,
//     dialog: {
//       ...prevState.dialog,
//       isOpen: true,
//       options: options,
//       message: message,
//       title: title,
//       header: header,
//       color: color,
//       background: background,
//     },
//   }
// }
export const createPopupVisibleState = ({
  prevState,
  message = 'default message',
  options = exampleOptions,
  header = 'Default Header',
  title = 'default title',
  color = '#000',
  background = '#fff',
}) => {
  console.log('Entered createPopupVisibleState')
  console.log('prevState:', prevState)
  console.log('message:', message)
  // console.log('options:', options)
  console.log('header:', header)
  console.log('title:', title)
  console.log('color:', color)
  console.log('background:', background)

  return {
    ...prevState,
    dialog: {
      ...prevState.dialog,
      isOpen: true,
      options: options,
      message: message,
      title: title,
      header: header,
      color: color,
      background: background,
    },
  }
}
