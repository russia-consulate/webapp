import { useBackRoute } from '@features/go-back'
import { routes } from '@routing/shared'
import { ButtonLink, ResultCard } from '@shared/ui'
import { BaseTemplate } from '@templates/base'
import { Header } from '@widgets/header'
import { useUnit } from 'effector-react'
import { Fragment } from 'react'
import { ServiceNotWorkingPage } from '../shared'
import { $view, View } from './model'

export const GuidePage = () => {
  useBackRoute(routes.home)

  const view = useUnit($view)

  if (view === View.TechnicalIssue) {
    return <ServiceNotWorkingPage />
  }

  return (
    <BaseTemplate>
      <Header title="Частые вопросы" />
      <section className="grow py-2 flex flex-col gap-2">
        <Content />
      </section>
    </BaseTemplate>
  )
}

const Content = () => {
  const view = useUnit($view)

  if (view === View.Loading) {
    return 'Loading...'
  }

  if (view === View.NoAccess)
    return (
      <ResultCard
        title="Нет доступа"
        description={[
          <Fragment key={1}>
            После покупки записи здесь будет гайд по&nbsp;заполнению заявления
            на&nbsp;получение загранпаспорта
          </Fragment>,
        ]}
        actions={
          <ButtonLink to={routes.appointmentCreate} fluid={true}>
            Записаться в консульство
          </ButtonLink>
        }
      />
    )

  return null
}
