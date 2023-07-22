import { createHistoryRouter } from 'atomic-router'
import { appointmentCreate, appointments, faq, guide, home } from './routes'

const routes = [
  { path: '/', route: home },
  { path: '/appointments', route: appointments },
  { path: '/appointments/create', route: appointmentCreate },
  { path: '/faq', route: faq },
  { path: '/guide', route: guide },
]

export const router = createHistoryRouter({ routes })
