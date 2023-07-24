import { createEffect, createEvent, sample } from 'effector'
import toast, { ToastType } from 'react-hot-toast'
import { createNotificationComponent } from './notification'

interface Options {
  type: ToastType
  message: string
}

const notifyFx = createEffect((options: Options) => {
  const { type, message } = options
  const Component = createNotificationComponent(type, message)
  toast.custom(Component, { position: 'top-center' })
})

export const success = createEvent<string>()
export const failure = createEvent<string>()
export const loading = createEvent<string>()

sample({
  clock: success,
  fn: (message) => ({ type: 'success' as const, message }),
  target: notifyFx,
})

sample({
  clock: failure,
  fn: (message) => ({ type: 'error' as const, message }),
  target: notifyFx,
})

sample({
  clock: loading,
  fn: (message) => ({ type: 'loading' as const, message }),
  target: notifyFx,
})
