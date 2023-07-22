import {
  $$appointments,
  AppointmentCard,
  AppointmentCardSkeleton,
} from '@entities/appointments'
import { useBackRoute } from '@features/go-back'
import { routes } from '@routing/shared'
import { Appointment } from '@shared/api/webapp/types'
import {
  ButtonLink,
  Container,
  ResultCard,
  Skeleton,
  StickyActions,
} from '@shared/ui'
import { BaseTemplate } from '@templates/base'
import { Header } from '@widgets/header'
import { useUnit } from 'effector-react'
import { Fragment } from 'react'
import { ServiceNotWorkingPage } from '../shared'
import { $view, View } from './model'

export const AppointmentsPage = () => {
  useBackRoute(routes.home)

  const view = useUnit($view)

  if (view === View.TechnicalIssue) {
    return <ServiceNotWorkingPage />
  }

  return (
    <BaseTemplate>
      <Header title="Мои записи" />
      <section className="grow py-2 flex flex-col gap-2">
        <Content />
      </section>
    </BaseTemplate>
  )
}

const Content = () => {
  const appointments = useUnit($$appointments.query)

  if (appointments.pending)
    return (
      <Container>
        <h2 className="font-bold font-interface text-[20px] leading-none px-4 pt-2 mb-4">
          <Skeleton type="inline" width={170} />
        </h2>
        <div className="flex flex-col gap-2">
          <AppointmentCardSkeleton />
          <AppointmentCardSkeleton />
        </div>
      </Container>
    )

  if (appointments.data?.length === 0)
    return (
      <ResultCard
        title="Записей нет"
        description={[
          <Fragment key={1}>
            После покупки записи здесь можно будет отслеживать текущее место в
            очереди и примерное количество дней до получения слота
          </Fragment>,
        ]}
        actions={
          <ButtonLink to={routes.appointmentCreate} fluid={true}>
            Записаться в консульство
          </ButtonLink>
        }
      />
    )

  const byLocation = appointments.data!.reduce<Record<string, Appointment[]>>(
    (acc, appointment) => {
      const { country, city } = appointment.consulate
      const location = `${country}, ${city}`

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const current = acc[location] ?? []
      acc[location] = current.concat(appointment)

      return acc
    },
    {},
  )

  const appointmentsJsx = Object.entries(byLocation).map(
    ([location, appointments]) => {
      return (
        <Container key={location}>
          <h2 className="font-bold font-interface text-[20px] leading-none px-4 pt-2 mb-4">
            {location}
          </h2>
          <div className="flex flex-col gap-2">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </Container>
      )
    },
  )

  return (
    <>
      {appointmentsJsx}
      <StickyActions>
        <ButtonLink to={routes.appointmentCreate} fluid={true}>
          Добавить запись
        </ButtonLink>
      </StickyActions>
    </>
  )
}
