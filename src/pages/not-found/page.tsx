import { routes } from '@routing/shared'
import { ButtonLink, ResultCard } from '@shared/ui'
import { BaseTemplate } from '@templates/base'
import { Fragment } from 'react'

export const NotFoundPage = () => {
  return (
    <BaseTemplate>
      <ResultCard
        title="Страница не найдена"
        description={[
          <Fragment key={1}>Вы попали на несуществующую страницу</Fragment>,
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
