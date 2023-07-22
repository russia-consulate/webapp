import { useBackRoute } from '@features/go-back'
import { routes } from '@routing/shared'
import { Container, Typography } from '@shared/ui'
import { BaseTemplate } from '@templates/base'
import { Header } from '@widgets/header'
import { ReactNode } from 'react'

export const FaqPage = () => {
  useBackRoute(routes.home)

  return (
    <BaseTemplate>
      <Header title="Вопросы и ответы" />
      <Content />
    </BaseTemplate>
  )
}

const Content = () => {
  return (
    <section className="grow py-2 flex flex-col gap-2">
      <Container>
        <Question>Сколько ждать записи?</Question>
        <Answer>
          Среднее время ожидания до&nbsp;получения слота составляет
          приблизительно 3&nbsp;недели, а минимальное - 2&nbsp;недели, если вы
          зарегистрировались на&nbsp;kdmid.ru в&nbsp;тот&nbsp;же день, что и
          создали заявку в&nbsp;боте.
          <br />
          <br />
          После оплаты вы сможете увидеть примерное количество оставшихся дней в
          &nbsp;карточке записи в&nbsp;разделе "Мои&nbsp;записи".
        </Answer>
      </Container>

      <Container>
        <Question>Можно ли вернуть деньги?</Question>
        <Answer>
          Да, вы можете вернуть полную сумму, но только пока запись находится
          в&nbsp;очереди. Если запись уже завершена - деньги за&nbsp;неё вернуть
          не&nbsp;получится.
          <br />
          <br />
          По&nbsp;вопросам возврата денежных средств вы можете обратиться
          в&nbsp;нашу техническую поддержку, нажав на&nbsp;пункт меню
          "Поддержка".
        </Answer>
      </Container>

      <Container>
        <Question>Могут ли заблокировать мою заявку на&nbsp;kdmid.ru?</Question>
        <Answer>
          Это крайне маловероятно. Но если такая ситуация все&nbsp;же
          произойдет, мы вернем все деньги, потраченные на&nbsp;услугу.
        </Answer>
      </Container>

      <Container>
        <Question>Могу ли я вам доверять?</Question>
        <Answer>
          Мы принимаем оплату легально с&nbsp;помощью YooKassa. После покупки
          услуги вы получаете чек об&nbsp;оплате. У YooKassa имеются все наши
          данные и в&nbsp;случае мошенничества юридические риски неизбежны.
          <br />
          <br />
          На&nbsp;основе данной информации вы можете сами решить, стоит&nbsp;ли
          доверять нашей компании.
        </Answer>
      </Container>
    </section>
  )
}

const Question = ({ children }: { children: string }) => {
  return (
    <Typography.Heading className="mb-3" size="base" font="text">
      {children}
    </Typography.Heading>
  )
}

const Answer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-4 bg-gray-200 rounded-tr-[16px] rounded-b-[16px]">
      <Typography.Paragraph color="primary" lineHeight="base">
        {children}
      </Typography.Paragraph>
    </div>
  )
}
