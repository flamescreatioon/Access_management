import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '@/lib/apiClient.js'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('auth_token') || '')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('auth_user')
    return raw ? JSON.parse(raw) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = async (email, password) => {
    setLoading(true); setError(null)
    try {
      const data = await api.auth.login({ email, password })
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally { setLoading(false) }
  }

  const register = async (payload) => {
    setLoading(true); setError(null)
    try {
      const data = await api.auth.register(payload)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally { setLoading(false) }
  }

  const logout = () => {
    setToken(''); setUser(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}
