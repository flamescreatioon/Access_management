import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '@/lib/apiClient.js'
import { useAuth } from '@/context/AuthContext.jsx'

const RolesContext = createContext()
export const useRoles = () => useContext(RolesContext)

export function RolesProvider({ children }) {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const fetchRoles = async () => {
    if (!token) { setRoles([]); return }
    setLoading(true); setError(null)
    try {
      const data = await api.roles.listRoles(token)
      setRoles(data.roles || [])
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchRoles() }, [token])

  const createRole = async (payload) => {
    try {
      await api.roles.createRole(token, payload)
      await fetchRoles()
    } catch (err) { setError(err.message); throw err }
  }

  const updateRole = async (id, patch) => {
    const previous = [...roles]
    try {
      setRoles(r => r.map(x => x.id === id ? { ...x, ...patch } : x))
      await api.roles.updateRole(token, id, patch)
    } catch (err) {
      setRoles(previous); throw err
    }
  }

  const deleteRole = async (id) => {
    const previous = [...roles]
    try {
      setRoles(r => r.filter(x => x.id !== id))
      await api.roles.deleteRole(token, id)
    } catch (err) {
      setRoles(previous); throw err
    }
  }

  return (
    <RolesContext.Provider value={{ roles, loading, error, createRole, updateRole, deleteRole, refresh: fetchRoles }}>
      {children}
    </RolesContext.Provider>
  )
}
