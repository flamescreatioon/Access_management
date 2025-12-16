import { createContext, useContext, useState, useEffect } from 'react'
import { fetchPermissions } from '@/lib/dataFetcher.js'
import { useAuth } from '@/context/AuthContext.jsx'

const PermissionsContext = createContext()
export const usePermissions = () => useContext(PermissionsContext)

const initialPermissions = [
  { id: 'user:create', name: 'Create Users', category: 'User Management' },
  { id: 'user:read', name: 'Read Users', category: 'User Management' },
  { id: 'user:update', name: 'Update Users', category: 'User Management' },
  { id: 'user:delete', name: 'Delete Users', category: 'User Management' },
  { id: 'role:manage', name: 'Manage Roles', category: 'Role Management' },
  { id: 'report:generate', name: 'Generate Reports', category: 'Reports' },
  { id: 'report:view', name: 'View Reports', category: 'Reports' },
  { id: 'access:grant', name: 'Grant Access', category: 'Access Control' },
  { id: 'access:revoke', name: 'Revoke Access', category: 'Access Control' }
]

export function PermissionsProvider({ children }) {
  const [permissions, setPermissions] = useState(initialPermissions)
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()

  const fetchPermissionsFromBackend = async () => {
    if (!token) return
    setLoading(true)
    try {
      const data = await fetchPermissions(token)
      setPermissions(data.permissions || initialPermissions)
    } catch (error) {
      console.error('Failed to fetch permissions:', error)
      setPermissions(initialPermissions)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchPermissionsFromBackend()
    }
  }, [token])

  const addPermission = (data) => setPermissions(p => [...p, { id: data.id, ...data }])
  const updatePermission = (id, patch) => setPermissions(p => p.map(x => x.id === id ? { ...x, ...patch } : x))
  const removePermission = (id) => setPermissions(p => p.filter(x => x.id !== id))

  return (
    <PermissionsContext.Provider value={{ permissions, loading, addPermission, updatePermission, removePermission, refresh: fetchPermissionsFromBackend }}>
      {children}
    </PermissionsContext.Provider>
  )
}
