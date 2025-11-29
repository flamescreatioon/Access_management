import { useUsers } from '@/context/UsersContext.jsx'
import { useAuth } from '@/context/AuthContext.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'

export default function PendingApprovalsPage(){
  const { users, approveUser, rejectUser, loading, error } = useUsers()
  const pending = users.filter(u => u.status === 'pending')
  const { user } = useAuth()
  if(user?.role !== 'admin') return <p className="p-4 text-sm">Access denied.</p>

  return (
    <div>
      <PageHeader title="Pending Approvals" />
      <Card>
        <CardHeader><CardTitle>Users Awaiting Review ({pending.length})</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {loading && <p className="text-sm">Loading...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {pending.length === 0 && !loading && <p className="text-sm text-muted-foreground">No pending users.</p>}
          {pending.map(p => (
            <div key={p.id} className="flex items-center justify-between border rounded-md p-3">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.email} · {p.role}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={()=>approveUser(p.id)}>Approve</Button>
                <Button size="sm" variant="outline" onClick={()=>rejectUser(p.id)}>Reject</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
