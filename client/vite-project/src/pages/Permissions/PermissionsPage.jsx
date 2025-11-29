import PageHeader from '@/components/common/PageHeader.jsx'
import DataTable from '@/components/common/DataTable.jsx'
import { Button } from '@/components/ui/button.jsx'
import { usePermissions } from '@/context/PermissionsContext.jsx'

export default function PermissionsPage(){
  const { permissions, addPermission } = usePermissions()
  const columns = [
    { key: 'resource', label: 'Resource' },
    { key: 'action', label: 'Action' },
    { key: 'description', label: 'Description' }
  ]
  return (
    <div>
      <PageHeader title="Permissions" actions={<Button size="sm" onClick={()=>addPermission({ resource:'new', action:'read', description:'New permission' })}>Add Permission</Button>} />
      <DataTable columns={columns} data={permissions} />
    </div>
  )
}
