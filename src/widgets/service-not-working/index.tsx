import { ButtonLink, ResultCard } from '@shared/ui'
import { Fragment } from 'react'

export const ServiceNotWorking = () => {
  return (
    <ResultCard
      title="Сервис не работает"
      description={[
        <Fragment key={1}>
          Пожалуйста, попробуйте зайти через 5&nbsp;минут. Если всё равно
          не&nbsp;работает — напишите в&nbsp;нашу поддержку, мы&nbsp;разберёмся
        </Fragment>,
      ]}
      actions={
        <Fragment>
          <ButtonLink to="/">Вернуться на главную</ButtonLink>
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
  )
}
