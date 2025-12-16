import { createContext, useContext, useState } from 'react'
import { nanoid } from 'nanoid'

const RequestsContext = createContext()
export const useRequests = () => useContext(RequestsContext)

const initialRequests = [
  { id: nanoid(), user: 'alice@example.com', resource: 'logs', action: 'read', status: 'pending', justification: 'Need to review access anomalies', date: new Date().toISOString() },
  { id: nanoid(), user: 'bob@example.com', resource: 'roles', action: 'manage', status: 'pending', justification: 'Assist with role updates', date: new Date().toISOString() },
  { id: nanoid(), user: 'charlie@example.com', resource: 'reports', action: 'generate', status: 'approved', justification: 'Monthly reporting task', date: new Date(Date.now() - 86400000).toISOString() },
  { id: nanoid(), user: 'diana@example.com', resource: 'users', action: 'update', status: 'approved', justification: 'Update team member profiles', date: new Date(Date.now() - 172800000).toISOString() },
  { id: nanoid(), user: 'eve@example.com', resource: 'backups', action: 'restore', status: 'rejected', justification: 'Test restore procedure', date: new Date(Date.now() - 259200000).toISOString() },
  { id: nanoid(), user: 'frank@example.com', resource: 'system', action: 'config', status: 'pending', justification: 'Adjust notification settings', date: new Date(Date.now() - 43200000).toISOString() },
  { id: nanoid(), user: 'grace@example.com', resource: 'announcements', action: 'send', status: 'approved', justification: 'Weekly team update', date: new Date(Date.now() - 345600000).toISOString() },
  { id: nanoid(), user: 'henry@example.com', resource: 'access_codes', action: 'generate', status: 'rejected', justification: 'Insufficient justification', date: new Date(Date.now() - 432000000).toISOString() }
]

export function RequestsProvider({ children }) {
  const [requests, setRequests] = useState(initialRequests)
  const updateRequest = (id, patch) => setRequests(r => r.map(req => req.id === id ? { ...req, ...patch } : req))

  return (
    <RequestsContext.Provider value={{ requests, updateRequest }}>
      {children}
    </RequestsContext.Provider>
  )
}
