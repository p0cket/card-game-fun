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

export const createPopupVisibleState = ({
  prevState,
  message = 'default message',
  options = exampleOptions,
  header = 'Default Header',
  title = 'default title',
  color = '#000',
  background = '#fff',
}) => {
  // console.trace('createPopupVisibleState trace')
  console.log('Entered createPopupVisibleState', {
    prevState,
    message,
    header,
    title,
    color,
    background,
  })
  if (!prevState) {
    console.error('createPopupVisibleState called with undefined prevState')
    return // Handle the error as needed
  }
  console.log('createPopupVisibleState: end')
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

//butons:
export function populateButton(
  label = 'default label',
  contextualState,
  move,
  contextualDispatch,
  pal,
  phase = ATK_PHASES.DAMAGE,
  player,
  targets,
) {
  return {
    label: label,
    onClick: () =>
      executeMove(
        // move, 
        // contextualState, 
        // contextualDispatch, 
        // user, 
        // phase,
        {
          state: contextualState,
          dispatch: contextualDispatch,

          pal: pal,
          move: move,
          player: player,
          phase: phase,
          userSlot: 0,

          targets: targets,
          // possessed: false,
        },
        ),
    backgroundColor: '#4b770e',
    color: '#fff',
  }
}

//
