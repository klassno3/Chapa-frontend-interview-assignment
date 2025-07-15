// contexts/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { logoutAction } from '@/lib/actions/actions'
import { useRouter } from 'next/navigation'

type Role = 'user' | 'admin' | 'super-admin' | null

const AuthContext = createContext<{
  role: Role
  setRole: (r: Role) => void
  logout: () => void
}>({
  role: null,
  setRole: () => { },
  logout: () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRoleState] = useState<Role>(null)

  const router = useRouter()

  const setRole = (newRole: Role) => {
    localStorage.setItem('role', newRole ?? '')
    setRoleState(newRole)
  }

  const logout = async () => {
    // Delete cookie on server
    await logoutAction()
    // Remove from browser
    localStorage.removeItem('role')
    // Clear role State
    setRoleState(null)
    // Redirect to login
    router.push('/login')
  }

  useEffect(() => {
    const saved = localStorage.getItem('role') as Role
    if (saved) setRoleState(saved)
  }, [])

  return (
    <AuthContext.Provider value={ { role, setRole, logout } }>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
