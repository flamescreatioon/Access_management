import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout.jsx'
import ProtectedRoute from '@/components/auth/ProtectedRoute.jsx'
import DashboardPage from '@/pages/Dashboard/DashboardPage.jsx'
import UsersPage from '@/pages/Users/UsersPage.jsx'
import RolesPage from '@/pages/Roles/RolesPage.jsx'
import PermissionsPage from '@/pages/Permissions/PermissionsPage.jsx'
import RequestsPage from '@/pages/Requests/RequestsPage.jsx'
import LogsPage from '@/pages/Logs/LogsPage.jsx'
import SettingsPage from '@/pages/Settings/SettingsPage.jsx'
import LoginPage from '@/pages/Auth/LoginPage.jsx'
import RegisterPage from '@/pages/Auth/RegisterPage.jsx'
import ForgotPasswordPage from '@/pages/Auth/ForgotPasswordPage.jsx'
import PendingApprovalsPage from '@/pages/Admin/PendingApprovalsPage.jsx'
import SystemConfigPage from '@/pages/Admin/SystemConfigPage.jsx'
import AnnouncementsPage from '@/pages/Admin/AnnouncementsPage.jsx'
import AlertsConfigPage from '@/pages/Admin/AlertsConfigPage.jsx'
import ReportsPage from '@/pages/Admin/ReportsPage.jsx'
import CodesPage from '@/pages/Access/CodesPage.jsx'
import { AppProviders } from '@/context/AppProviders.jsx'
import { AuthProvider } from '@/context/AuthContext.jsx'

export default function App(){
  return (
    <BrowserRouter>
      <AuthProvider>
      <AppProviders>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route element={<ProtectedRoute />}> 
            <Route path="/" element={<Layout />}> 
              <Route index element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="roles" element={<RolesPage />} />
            <Route path="permissions" element={<PermissionsPage />} />
            <Route path="requests" element={<RequestsPage />} />
            <Route path="logs" element={<LogsPage />} />
            <Route path="settings" element={<SettingsPage />} />
              <Route path="access/codes" element={<CodesPage />} />
              <Route path="admin/pending-approvals" element={<PendingApprovalsPage />} />
              <Route path="admin/system-config" element={<SystemConfigPage />} />
              <Route path="admin/announcements" element={<AnnouncementsPage />} />
              <Route path="admin/alerts-config" element={<AlertsConfigPage />} />
              <Route path="admin/reports" element={<ReportsPage />} />
            </Route>
          </Route>
        </Routes>
      </AppProviders>
      </AuthProvider>
    </BrowserRouter>
  )
}
