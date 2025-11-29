import PageHeader from '@/components/common/PageHeader.jsx'
import DataTable from '@/components/common/DataTable.jsx'
import { useLogs } from '@/context/LogsContext.jsx'

export default function LogsPage(){
  const { logs } = useLogs()
  const columns = [
    { key: 'timestamp', label: 'Time', render: l => new Date(l.timestamp).toLocaleString() },
    { key: 'user', label: 'User' },
    { key: 'event', label: 'Event' },
    { key: 'description', label: 'Description' },
    { key: 'ip', label: 'IP' }
  ]
  return (
    <div>
      <PageHeader title="Audit Logs" />
      <DataTable columns={columns} data={logs} pageSize={10} />
    </div>
  )
}
