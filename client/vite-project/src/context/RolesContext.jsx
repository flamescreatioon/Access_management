import { createContext, useContext, useState } from 'react'
import { nanoid } from 'nanoid'

const RolesContext = createContext()
export const useRoles = () => useContext(RolesContext)

const initialRoles = [
  { id: nanoid(), name: 'admin', permissions: ['users.read','users.write','roles.manage'] },
  { id: nanoid(), name: 'staff', permissions: ['users.read','requests.read'] },
  { id: nanoid(), name: 'member', permissions: ['self.read'] }
]

export function RolesProvider({ children }) {
  const [roles, setRoles] = useState(initialRoles)

  const addRole = (data) => setRoles(r => [...r, { id: nanoid(), ...data }])
  const updateRole = (id, patch) => setRoles(r => r.map(role => role.id === id ? { ...role, ...patch } : role))
  const removeRole = (id) => setRoles(r => r.filter(role => role.id !== id))

  return (
    <RolesContext.Provider value={{ roles, addRole, updateRole, removeRole }}>
      {children}
    </RolesContext.Provider>
  )
}
