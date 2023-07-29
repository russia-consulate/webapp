import { Pages } from '@pages'
import { router } from '@routing/shared'
import { NotificationStack } from '@shared/ui'
import { RouterProvider } from 'atomic-router-react'
import { ErrorBoundary } from './error-boundary'

export const App = () => {
  return (
    <RouterProvider router={router}>
      <ErrorBoundary>
        <Pages />
        <NotificationStack />
      </ErrorBoundary>
    </RouterProvider>
  )
}
