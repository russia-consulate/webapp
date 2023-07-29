import { $$appointments } from '@entities/appointments'
import { createEvent, createStore, sample } from 'effector'
import { and } from 'patronum'

export const closeStickyPurchaseCurtain = createEvent()

export const $stickyPurchaseOfferActive = and(
  $$appointments.query.$succeeded,
  $$appointments.query.$data.map((appointments) => appointments.length === 0),
)

export const $stickyPurchaseOfferCurtainOpen = createStore(false)

sample({
  source: $stickyPurchaseOfferActive,
  target: $stickyPurchaseOfferCurtainOpen,
})

sample({
  clock: closeStickyPurchaseCurtain,
  fn: () => false,
  target: $stickyPurchaseOfferCurtainOpen,
})
