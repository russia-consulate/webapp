import { KeyboardEventHandler } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export const onEnter = {
  moveFocus<T extends FieldValues>(
    form: UseFormReturn<T>,
    name: Path<T>,
  ): KeyboardEventHandler {
    return (event) => {
      if (event.key !== 'Enter') {
        return
      }

      event.preventDefault()
      form.setFocus(name)
    }
  },
  clearFocus(): KeyboardEventHandler {
    return (event) => {
      if (event.key !== 'Enter') {
        return
      }

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }
  },
}
