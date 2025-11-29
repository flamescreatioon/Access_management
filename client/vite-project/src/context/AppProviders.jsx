import { UsersProvider } from './UsersContext.jsx'
import { RolesProvider } from './RolesContext.jsx'
import { PermissionsProvider } from './PermissionsContext.jsx'
import { RequestsProvider } from './RequestsContext.jsx'
import { LogsProvider } from './LogsContext.jsx'

export function AppProviders({ children }) {
  return (
    <UsersProvider>
      <RolesProvider>
        <PermissionsProvider>
          <RequestsProvider>
            <LogsProvider>
              {children}
            </LogsProvider>
          </RequestsProvider>
        </PermissionsProvider>
      </RolesProvider>
    </UsersProvider>
  )
}
