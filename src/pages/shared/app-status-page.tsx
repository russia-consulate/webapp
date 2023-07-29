import { $$user } from '@entities/user'
import { Loader } from '@shared/ui'
import { useUnit } from 'effector-react'
import { MessageRequiredPage } from './message-required'
import { ServiceNotWorkingPage } from './service-not-working'

export const AppStatusPage = () => {
  const user = useUnit($$user.query)

  if (user.pending) {
    return <Loader style={{ height: 'var(--tg-viewport-stable-height)' }} />
  }

  if (!user.data?.initialized) {
    return <MessageRequiredPage />
  }

  if (user.error) {
    return <ServiceNotWorkingPage />
  }

  return null
}
