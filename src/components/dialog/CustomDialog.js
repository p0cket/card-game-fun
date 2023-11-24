import React from 'react'
import DialogTemplate from '../common/DialogTemplate'

const CustomDialog = ({
  message,
  options,
  header,
  title,
  color,
  background,
  onOptionClick,
}) => {
  const customPopupProps = {
    title: title,
    header: header,
    message: message,
    options: options.map((option) => ({
      ...option,
      onClick: () => onOptionClick(option.label),
    })),
    color: color,
    background: background,
  }

  return <DialogTemplate {...customPopupProps} />
}

export default CustomDialog
