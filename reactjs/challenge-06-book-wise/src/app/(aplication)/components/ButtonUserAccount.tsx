'use client'

import Avatar from '@/components/server/Avatar'
import DialogLogin from '@/components/client/DialogLogin'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Action,
  Cancel,
  Content, 
  Overlay, 
  Portal, 
  Root, 
  Title, 
  Trigger 
} from '@radix-ui/react-alert-dialog'

export default function ButtonUserAccount() {
  const { user } = useAuth()

  if (!user) {
    return (
      <DialogLogin>
        <button className="mt-auto mb-4 p-2 flex items-center gap-3 text-gray-200 font-bold transition-opacity hover:opacity-80">
          Fazer login
          <i className="ph ph-sign-in text-green-100 text-xl" />
        </button>
      </DialogLogin>
    )
  }

  return (
    <Root>
      <Trigger asChild>
        <button className="group mt-auto mb-4 p-2 flex items-center gap-3 text-gray-200 transition-opacity">
          <Avatar 
            src={user.avatar_url} 
            alt="Sua foto de perfil" 
            size="sm"
          />
          <p className="group-hover:opacity-80">{user.name}</p>
          <i className="ph ph-sign-out text-red-100 text-xl group-hover:opacity-80" />
        </button>
      </Trigger>

      <Portal>
        <Overlay className="bg-black/60 fixed inset-0 animate-dialogOverlay" />

        <Content className="w-full max-w-lg bg-gray-700 rounded-xl fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 animate-dialogContent shadow-lg p-8">
          <Title className="text-lg font-bold text-gray-200">Tem certeza que deseja sair?</Title>

          <div className="mt-10 flex gap-3 justify-end">
            <Cancel asChild>
              <button className="px-6 py-3 bg-gray-600 rounded-lg text-gray-200 font-bold transition-colors hover:bg-gray-500">
                Cancelar
              </button>
            </Cancel>
            <Action asChild>
              <button className="px-6 py-3 bg-red-600 rounded-lg text-gray-200 font-bold transition-colors hover:bg-red-500">
                Sim, quero sair
              </button>
            </Action>
          </div>
        </Content>
      </Portal>
    </Root>
  )
}
