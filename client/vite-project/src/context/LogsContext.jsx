import { createContext, useContext, useState } from 'react'
import { nanoid } from 'nanoid'

const LogsContext = createContext()
export const useLogs = () => useContext(LogsContext)

const initialLogs = [
  { id: nanoid(), timestamp: new Date().toISOString(), user: 'alice@example.com', event: 'LOGIN', description: 'Successful login', ip: '192.168.0.1' },
  { id: nanoid(), timestamp: new Date().toISOString(), user: 'bob@example.com', event: 'REQUEST_SUBMITTED', description: 'Access request created', ip: '192.168.0.2' }
]

export function LogsProvider({ children }) {
  const [logs] = useState(initialLogs)
  return (
    <LogsContext.Provider value={{ logs }}>
      {children}
    </LogsContext.Provider>
  )
}
