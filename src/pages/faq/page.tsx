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
          Время ожидания зависит от&nbsp;консульства и&nbsp;выбранной вами
          услуги. Например, слоты на&nbsp;получение загранпаспорта появляются
          реже, чем&nbsp;слоты других услуг. А&nbsp;в&nbsp;каких-то консульствах
          слоты в&nbsp;целом появляются реже, чем в&nbsp;остальных. Среднее
          время ожидания до&nbsp;получения слота составляет приблизительно
          2&nbsp;недели. Но для&nbsp;каких-то услуг запись может произойти даже
          в&nbsp;первый день.
          <br />
          <br />
          После оплаты, наша система покажет вам примерное количество оставшихся
          до&nbsp;записи дней. Вы сможете увидеть его в&nbsp;карточке записи
          в&nbsp;разделе "Мои&nbsp;записи". Учитывайте, что это количество дней
          рассчитывается по&nbsp;максимальной планке, и&nbsp;запись может
          произойти намного быстрее.
        </Answer>
      </Container>

      <Container>
        <Question>Можно ли вернуть деньги?</Question>
        <Answer>
          Да, вы можете вернуть полную сумму, пока запись находится
          в&nbsp;очереди. Если запись уже выполнена - деньги за&nbsp;неё вернуть
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
