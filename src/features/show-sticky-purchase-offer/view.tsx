import { routes } from '@routing/shared'
import {
  ButtonLink,
  Curtain,
  List,
  ListItem,
  StickyActions,
  Typography,
} from '@shared/ui'
import { useUnit } from 'effector-react'
import {
  $stickyPurchaseOfferActive,
  $stickyPurchaseOfferCurtainOpen,
  closeStickyPurchaseCurtain,
} from './model'

export const StickyPurchaseOffer = () => {
  const active = useUnit($stickyPurchaseOfferActive)

  if (!active) return null

  return (
    <div>
      <PurchaseOfferCurtain />
      <StickyActions>
        <PurchaseButton />
      </StickyActions>
    </div>
  )
}

const PurchaseOfferCurtain = () => {
  const curtainOpen = useUnit($stickyPurchaseOfferCurtainOpen)

  return (
    <Curtain isOpen={curtainOpen} close={closeStickyPurchaseCurtain}>
      <Typography.Heading size="xl">
        Воспользуйтесь нашим сервисом и&nbsp;получите:
      </Typography.Heading>

      <List className="mt-4 mb-6">
        <ListItem>
          Максимально быструю запись в&nbsp;консульство РФ без&nbsp;каких-либо
          усилий - мы сделаем все за&nbsp;вас
        </ListItem>
        <ListItem>
          Возможность удобно отслеживать статус своей записи и&nbsp;место
          в&nbsp;очереди среди других пользователей
        </ListItem>
        <ListItem>
          Примерное количество дней до&nbsp;получения слота, основанное
          на&nbsp;нашей статистике
        </ListItem>
        {/*<ListItem>*/}
        {/*  Гайд по&nbsp;заполнению заявления на&nbsp;получение загранпаспорта*/}
        {/*</ListItem>*/}
      </List>

      <PurchaseButton />
    </Curtain>
  )
}

const PurchaseButton = () => {
  return (
    <ButtonLink
      to={routes.appointmentCreate}
      query={{ fromHome: true }}
      fluid={true}
    >
      Записаться в консульство
    </ButtonLink>
  )
}
