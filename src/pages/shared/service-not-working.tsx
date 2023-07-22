import { routes } from '@routing/shared'
import { ButtonLink, ResultCard } from '@shared/ui'
import { BaseTemplate } from '@templates/base'
import { Fragment } from 'react'

export const ServiceNotWorkingPage = () => {
  return (
    <BaseTemplate>
      <ResultCard
        title="Сервис не работает"
        description={[
          <Fragment key={1}>
            Пожалуйста, попробуйте зайти через 5&nbsp;минут. Если всё равно
            не&nbsp;работает — напишите в&nbsp;нашу поддержку,
            мы&nbsp;разберёмся
          </Fragment>,
        ]}
        actions={
          <Fragment>
            <ButtonLink to={routes.home}>Вернуться на главную</ButtonLink>
            <ButtonLink
              to="https://t.me/RussiaConsulateBotSupport"
              variant="outline"
              target="_blank"
            >
              Написать в поддержку
            </ButtonLink>
          </Fragment>
        }
      />
    </BaseTemplate>
  )
}
