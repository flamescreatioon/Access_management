import PageHeader from '@/components/common/PageHeader.jsx'
import DataTable from '@/components/common/DataTable.jsx'
import { Button } from '@/components/ui/button.jsx'
import { useRequests } from '@/context/RequestsContext.jsx'

export default function RequestsPage(){
  const { requests, updateRequest } = useRequests()
  const columns = [
    { key: 'user', label: 'User' },
    { key: 'resource', label: 'Resource' },
    { key: 'action', label: 'Action' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date', render: r => new Date(r.date).toLocaleDateString() },
    { key: 'actions', label: 'Actions', render: r => (
      <div className="flex gap-1">
        <Button variant="outline" size="sm" disabled={r.status!=='pending'} onClick={()=>updateRequest(r.id,{ status:'approved'})}>Approve</Button>
        <Button variant="destructive" size="sm" disabled={r.status!=='pending'} onClick={()=>updateRequest(r.id,{ status:'rejected'})}>Reject</Button>
      </div>
    ) }
  ]
  return (
    <div>
      <PageHeader title="Access Requests" />
      <DataTable columns={columns} data={requests} />
    </div>
  )
}
