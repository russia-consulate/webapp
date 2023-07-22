import { Pages } from '@pages'
import { router } from '@routing/shared'
import { RouterProvider } from 'atomic-router-react'
import { Toaster } from 'react-hot-toast'

export const App = () => {
  return (
    <RouterProvider router={router}>
      <Pages />
      <Toaster />
    </RouterProvider>
  )
}
