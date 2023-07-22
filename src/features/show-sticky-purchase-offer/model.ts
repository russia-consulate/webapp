import { $$appointments } from '@entities/appointments'
import { createEvent, createStore, sample } from 'effector'

export const showStickyPurchaseOffer = createEvent()
export const closeStickyPurchaseCurtain = createEvent()

export const $stickyPurchaseOfferActive = createStore(false).on(
  showStickyPurchaseOffer,
  () => true,
)

export const $stickyPurchaseOfferCurtainOpen = createStore(true).on(
  closeStickyPurchaseCurtain,
  () => false,
)

sample({
  clock: $$appointments.query.finished.success,
  source: $$appointments.query.$data,
  filter: (appointments) => {
    if (!appointments) return false
    return appointments.length === 0
  },
  target: showStickyPurchaseOffer,
})
