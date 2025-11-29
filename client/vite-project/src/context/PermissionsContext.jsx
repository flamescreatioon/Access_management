import { createContext, useContext, useState } from 'react'
import { nanoid } from 'nanoid'

const PermissionsContext = createContext()
export const usePermissions = () => useContext(PermissionsContext)

const initialPermissions = [
  { id: nanoid(), resource: 'users', action: 'read', description: 'View users list' },
  { id: nanoid(), resource: 'users', action: 'write', description: 'Create or edit users' },
  { id: nanoid(), resource: 'roles', action: 'manage', description: 'Manage roles & permissions' },
  { id: nanoid(), resource: 'logs', action: 'read', description: 'View audit logs' }
]

export function PermissionsProvider({ children }) {
  const [permissions, setPermissions] = useState(initialPermissions)
  const addPermission = (data) => setPermissions(p => [...p, { id: nanoid(), ...data }])
  const updatePermission = (id, patch) => setPermissions(p => p.map(x => x.id === id ? { ...x, ...patch } : x))
  const removePermission = (id) => setPermissions(p => p.filter(x => x.id !== id))

  return (
    <PermissionsContext.Provider value={{ permissions, addPermission, updatePermission, removePermission }}>
      {children}
    </PermissionsContext.Provider>
  )
}
