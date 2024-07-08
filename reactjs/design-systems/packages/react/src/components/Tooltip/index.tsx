import { ReactNode } from 'react'
import { Content, Arrow } from './styles'
import { Portal, Provider, Root, Trigger } from '@radix-ui/react-tooltip'

export interface TooltipProps {
  children?: ReactNode
  title: string
}

export function Tooltip({ children, title }: TooltipProps) {
  return (
    <Provider>
      <Root delayDuration={300}>
        <Trigger asChild>
          {children}
        </Trigger>

        <Portal>
          <Content side="top" sideOffset={-4}>
            {title}
            <Arrow />
          </Content>
        </Portal>
      </Root>
    </Provider>
  )
}

Tooltip.displayName = 'Tooltip'
