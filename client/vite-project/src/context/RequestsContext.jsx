import { createContext, useContext, useState } from 'react'
import { nanoid } from 'nanoid'

const RequestsContext = createContext()
export const useRequests = () => useContext(RequestsContext)

const initialRequests = [
  { id: nanoid(), user: 'alice@example.com', resource: 'logs', action: 'read', status: 'pending', justification: 'Need to review access anomalies', date: new Date().toISOString() },
  { id: nanoid(), user: 'bob@example.com', resource: 'roles', action: 'manage', status: 'pending', justification: 'Assist with role updates', date: new Date().toISOString() }
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
