'use client'

import { 
  Root, 
  Trigger, 
  Portal, 
  Overlay, 
  Content, 
  Title, 
  Description, 
  Close 
} from '@radix-ui/react-dialog'
import ButtonLogin from './ButtonLogin'

interface DialogLoginProps {
  description?: string
  children: React.ReactNode
}

export default function DialogLogin({ description, children }: DialogLoginProps) {
  return (
    <Root>
      <Trigger asChild>
        {children}
      </Trigger>
      <Portal>
        <Overlay className="bg-black/60 fixed inset-0 animate-dialogOverlay" />
        <Content className="w-[32rem] bg-gray-700 rounded-xl fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 animate-dialogContent shadow-lg flex flex-col items-center p-16">
          <Title className="text-xl font-bold text-gray-200">Faça login</Title>
          <Description className="mt-1 text-gray-300">
            {description ?? 'E aproveite o melhor de nosso app'}
          </Description>
          <div className="mt-10 w-full flex flex-col gap-3">
            <ButtonLogin provider="google" />
            <ButtonLogin provider="github" />
          </div>
          <Close asChild>
            <button className="absolute top-0 right-0 m-6 text-gray-400 transition-colors hover:text-gray-200" aria-label="Fechar">
              <i className="ph ph-x text-2xl" />
            </button>
          </Close>
        </Content>
      </Portal>
    </Root>
  )
}
