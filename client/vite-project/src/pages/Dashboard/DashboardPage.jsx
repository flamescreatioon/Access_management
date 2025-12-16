import PageHeader from '@/components/common/PageHeader.jsx'
import { useUsers } from '@/context/UsersContext.jsx'
import { useRoles } from '@/context/RolesContext.jsx'
import { usePermissions } from '@/context/PermissionsContext.jsx'
import { useRequests } from '@/context/RequestsContext.jsx'
import { useLogs } from '@/context/LogsContext.jsx'
import { useAuth } from '@/context/AuthContext.jsx'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx'
import { Users, Shield, KeyRound, MailQuestion, RefreshCw } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { refreshDashboardData } from '@/lib/dataFetcher.js'
import { useEffect, useState } from 'react'

export default function DashboardPage(){
  const { users, refresh: refreshUsers } = useUsers()
  const { roles, refresh: refreshRoles } = useRoles()
  const { permissions, refresh: refreshPermissions } = usePermissions()
  const { requests } = useRequests()
  const { logs } = useLogs()
  const { token } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Auto-refresh data when component mounts or token changes
  useEffect(() => {
    if (token) {
      handleRefreshDashboard()
    }
  }, [token])

  const handleRefreshDashboard = async () => {
    setIsRefreshing(true)
    try {
      await refreshDashboardData(token, {
        onUsersUpdate: refreshUsers,
        onRolesUpdate: refreshRoles,
        onPermissionsUpdate: refreshPermissions,
        onError: (error) => console.error('Dashboard refresh error:', error)
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const roleDistribution = roles.map(r => ({ name: r.name, value: users.filter(u => u.role === r.name).length }))
  const requestStatusData = ['pending','approved','rejected'].map(s => ({ name: s, value: requests.filter(r => r.status === s).length }))
  const requestColors = { pending: '#f59e0b', approved: '#10b981', rejected: '#ef4444' }

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="Dashboard" />
        <button
          onClick={handleRefreshDashboard}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{users.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Across {roles.length} roles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{roles.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Role-based access</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permissions</CardTitle>
            <KeyRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{permissions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Granular actions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <MailQuestion className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{requests.filter(r=>r.status==='pending').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm max-h-64 overflow-y-auto">
            {logs.slice(0,10).map(l => (
              <div key={l.id} className="flex justify-between border-b pb-1"><span>{l.event}</span><span className="text-muted-foreground">{new Date(l.timestamp).toLocaleTimeString()}</span></div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Role Distribution</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleDistribution}>
                <XAxis dataKey="name" stroke="#888" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} stroke="#888" />
                <Tooltip cursor={{ fill: 'hsl(var(--accent)/0.15)' }} />
                <Bar dataKey="value" fill="#6366f1" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Request Status</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie data={requestStatusData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                  {requestStatusData.map(entry => (
                    <Cell key={entry.name} fill={requestColors[entry.name]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4 text-xs">
              {requestStatusData.map(r => (
                <div key={r.name} className="flex items-center gap-1">
                  <span className="inline-block h-3 w-3 rounded-sm" style={{ background: requestColors[r.name] }} />
                  {r.name}: {r.value}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
