import { createContext, useContext, useState } from 'react'
import { nanoid } from 'nanoid'

const LogsContext = createContext()
export const useLogs = () => useContext(LogsContext)

const initialLogs = [
  { id: nanoid(), timestamp: new Date().toISOString(), user: 'alice@example.com', event: 'LOGIN', description: 'Successful login', ip: '192.168.0.1' },
  { id: nanoid(), timestamp: new Date(Date.now() - 300000).toISOString(), user: 'bob@example.com', event: 'REQUEST_SUBMITTED', description: 'Access request created', ip: '192.168.0.2' },
  { id: nanoid(), timestamp: new Date(Date.now() - 600000).toISOString(), user: 'charlie@example.com', event: 'USER_UPDATED', description: 'Profile information updated', ip: '192.168.0.3' },
  { id: nanoid(), timestamp: new Date(Date.now() - 900000).toISOString(), user: 'diana@example.com', event: 'ROLE_CHANGED', description: 'Role changed from student to staff', ip: '192.168.0.4' },
  { id: nanoid(), timestamp: new Date(Date.now() - 1200000).toISOString(), user: 'admin@example.com', event: 'USER_APPROVED', description: 'New user approved: eve@example.com', ip: '192.168.0.5' },
  { id: nanoid(), timestamp: new Date(Date.now() - 1500000).toISOString(), user: 'frank@example.com', event: 'ACCESS_CODE_GENERATED', description: 'QR code generated', ip: '192.168.0.6' },
  { id: nanoid(), timestamp: new Date(Date.now() - 1800000).toISOString(), user: 'grace@example.com', event: 'LOGOUT', description: 'User logged out', ip: '192.168.0.7' },
  { id: nanoid(), timestamp: new Date(Date.now() - 2100000).toISOString(), user: 'henry@example.com', event: 'LOGIN_FAILED', description: 'Invalid credentials', ip: '192.168.0.8' },
  { id: nanoid(), timestamp: new Date(Date.now() - 2400000).toISOString(), user: 'admin@example.com', event: 'SYSTEM_CONFIG_UPDATED', description: 'Session timeout changed to 30 minutes', ip: '192.168.0.9' },
  { id: nanoid(), timestamp: new Date(Date.now() - 2700000).toISOString(), user: 'alice@example.com', event: 'REPORT_GENERATED', description: 'Access report for November 2025', ip: '192.168.0.1' },
  { id: nanoid(), timestamp: new Date(Date.now() - 3000000).toISOString(), user: 'bob@example.com', event: 'ANNOUNCEMENT_SENT', description: 'Team meeting reminder', ip: '192.168.0.2' },
  { id: nanoid(), timestamp: new Date(Date.now() - 3300000).toISOString(), user: 'charlie@example.com', event: 'PASSWORD_CHANGED', description: 'Password successfully updated', ip: '192.168.0.3' },
  { id: nanoid(), timestamp: new Date(Date.now() - 3600000).toISOString(), user: 'diana@example.com', event: 'LOGIN', description: 'Successful login', ip: '192.168.0.4' },
  { id: nanoid(), timestamp: new Date(Date.now() - 3900000).toISOString(), user: 'eve@example.com', event: 'REGISTRATION', description: 'New user registered', ip: '192.168.0.10' },
  { id: nanoid(), timestamp: new Date(Date.now() - 4200000).toISOString(), user: 'frank@example.com', event: 'ACCESS_DENIED', description: 'Insufficient permissions for action', ip: '192.168.0.6' }
]

export function LogsProvider({ children }) {
  const [logs] = useState(initialLogs)
  return (
    <LogsContext.Provider value={{ logs }}>
      {children}
    </LogsContext.Provider>
  )
}
