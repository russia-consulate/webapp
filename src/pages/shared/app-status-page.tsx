import { $$user } from '@entities/user'
import { Loader } from '@shared/ui'
import { useUnit } from 'effector-react'
import { ServiceNotWorkingPage } from './service-not-working'
import { UserNotInitializedPage } from './user-not-initialized'

export const AppStatusPage = () => {
  const user = useUnit($$user.query)

  if (user.pending) {
    return <Loader style={{ height: 'var(--tg-viewport-stable-height)' }} />
  }

  if (user.error) {
    return <ServiceNotWorkingPage />
  }

  if (!user.data?.initialized) {
    return <UserNotInitializedPage />
  }

  return null
}
