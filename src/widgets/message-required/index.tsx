import { Button, InlineCode, ResultCard } from '@shared/ui'
import { Fragment } from 'react'

export const MessageRequired = () => {
  return (
    <ResultCard
      title="Необходима регистрация"
      description={[
        <Fragment key={1}>
          Чтобы пользоваться функциями приложения, вам необходимо сначала
          отправить сообщение с&nbsp;текстом <InlineCode>/start</InlineCode>{' '}
          в&nbsp;чат с&nbsp;ботом.
        </Fragment>,
      ]}
      actions={
        <Button onClick={() => Telegram.WebApp.close()}>Вернуться в чат</Button>
      }
    />
  )
}
