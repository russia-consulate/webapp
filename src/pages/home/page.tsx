import { routes } from '@routing/shared'
import { Container } from '@shared/ui'
import { BaseTemplate } from '@templates/base'
import { useUnit } from 'effector-react'
import { ServiceNotWorkingPage } from '../shared'
import { MenuCard } from './components/menu-card'
import calendarImage from './images/calendar.webp'
import papersImage from './images/papers.webp'
import rocketImage from './images/rocket.webp'
import { $view, View } from './model'

export const HomePage = () => {
  const view = useUnit($view)

  if (view === View.TechnicalIssue) {
    return <ServiceNotWorkingPage />
  }

  const skeleton = view === View.ContentLoading

  return (
    <BaseTemplate>
      <Container className="flex flex-col gap-2 my-2">
        <MenuCard
          className="bg-purple-100"
          text="Мои записи"
          image={calendarImage}
          skeleton={skeleton}
          action={{
            type: 'link',
            to: routes.appointments,
          }}
        />
        <MenuCard
          className="bg-green-100"
          text="Вопросы и ответы"
          image={papersImage}
          skeleton={skeleton}
          action={{
            type: 'link',
            to: routes.faq,
          }}
        />
        <MenuCard
          className="bg-purple-100"
          text="Поддержка"
          image={rocketImage}
          skeleton={skeleton}
          action={{
            type: 'external-link',
            href: 'https://t.me/RussiaConsulateBotSupport',
          }}
        />
      </Container>
    </BaseTemplate>
  )
}
