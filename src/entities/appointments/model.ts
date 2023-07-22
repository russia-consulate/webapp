import { createQuery } from '@farfetched/core'
import { WebAppApi } from '@shared/api'
import { QueryTools } from '@shared/lib/farfetched'

export const query = createQuery({
  name: 'appointments',
  effect: WebAppApi.getAppointmentsFx,
})

QueryTools(query).timeUntilStale(1000 * 60)
