import { createEvent, createStore } from 'effector'

export const heightChanged = createEvent<number>()

export const $height = createStore(0).on(heightChanged, (_, height) => height)
