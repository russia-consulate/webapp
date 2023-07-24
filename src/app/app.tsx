import { Pages } from '@pages'
import { router } from '@routing/shared'
import { NotificationStack } from '@shared/ui'
import { RouterProvider } from 'atomic-router-react'

export const App = () => {
  return (
    <RouterProvider router={router}>
      <Pages />
      <NotificationStack />
    </RouterProvider>
  )
}
