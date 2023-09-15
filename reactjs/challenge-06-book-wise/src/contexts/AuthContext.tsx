'use client'

import { createContext, useContext, useState } from 'react'

interface AuthContextProps {
  user?: tUser
}

const AuthContext = createContext({} as AuthContextProps)

export function useAuth() {
  const ctx = useContext(AuthContext)

  return ctx
}

export function AuthProvider({children}: React.PropsWithChildren) {
  const [user, setUser] = useState<tUser>(
    {
      "id": "6624df61-5947-4f8c-9c7e-39c8c40fa158",
      "name": "Luiz Henrique",
      "avatar_url": "https://github.com/lhmoreno.png",
      "pages_read": 0,
      "ratings_amount": 0,
      "authors_read": 0
    }
  )

  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}
