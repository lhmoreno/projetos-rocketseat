import { X } from 'phosphor-react'
import { ToastContainer, Title, Description, CloseButton, Viewport } from './styles'
import { Action, Provider } from '@radix-ui/react-toast'

export interface ToastProps {
  isOpen?: boolean
  onClose?: () => void
  title: string
  description: string
}

export function Toast({ isOpen, onClose, title, description }: ToastProps) {
  return (
    <Provider swipeDirection="right">
      <ToastContainer open={isOpen} onOpenChange={onClose}>
        <Title>{title}</Title>
        <Description>{description}</Description>

        <Action asChild altText="Close message" aria-label="Close message">
          <CloseButton>
            <X />
          </CloseButton>
        </Action>
      </ToastContainer>

      <Viewport />
    </Provider>
  )
}

Toast.displayName = 'Toast'
