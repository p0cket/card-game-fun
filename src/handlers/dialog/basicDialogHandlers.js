import { ATK_PHASES, executeMove } from '../moveHandlers'

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
  console.log(`createPopupRemovedState:`, prevState)
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
  console.log('Entered createPopupVisibleState')
  console.log('prevState:', prevState)

  if (!prevState) {
    console.error('createPopupVisibleState called with undefined prevState')
    return // Handle the error as needed
  }
  
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

// //statusDialogHandler, use theabove ones for inspiration
// export const createStatusDialogState = (state, message, result) => ({
//   ...state,
//   dialog: {
//     isOpen: true,
//     message: `${result} lands successfully!`,
//     title: `${result} lands`,
//     header: `${result} landed`,
//     buttons: [
//       // ...buttons
//     ],
//   },
// });

// export const createStatusEffectDialogState = (
//   contextualState,
//   statusResult,
// ) => {
//   const buttons = [
//     // okButton(),
//     populateButtonProps('OK', handleOkButton),
//     populateButtonProps('Not So Fast', handleNotSoFastButton),

//     // {
//     //   label: 'OK',
//     //   onClick: () => {
//     //     // Logic for OK button
//     //   },
//     //   backgroundColor: '#4b770e',
//     //   color: '#fff',
//     // },
//     {
//       label: 'Not So Fast',
//       onClick: () => {
//         // Logic for Not So Fast button
//       },
//       backgroundColor: '#4b770e',
//       color: '#fff',
//     },
//   ]

//   return createPopupVisibleState({
//     prevState: contextualState,
//     message: `${statusResult} lands successfully!`,
//     options: buttons,
//     header: `${statusResult} landed`,
//     title: `${statusResult} lands`,
//   })
// }

//butons:

export function populateButton(
  label = 'default label',
  contextualState,
  move,
  contextualDispatch,
  user,
  phase = ATK_PHASES.DAMAGE,
) {
  return {
    label: label,
    onClick: () =>
      executeMove(move, contextualState, contextualDispatch, user, phase),
    backgroundColor: '#4b770e',
    color: '#fff',
  }
}
