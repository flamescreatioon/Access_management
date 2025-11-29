import PageHeader from '@/components/common/PageHeader.jsx'
import DataTable from '@/components/common/DataTable.jsx'
import { Button } from '@/components/ui/button.jsx'
import { useRoles } from '@/context/RolesContext.jsx'

export default function RolesPage(){
  const { roles, addRole } = useRoles()
  const columns = [
    { key: 'name', label: 'Role' },
    { key: 'permissions', label: 'Permissions', render: r => r.permissions.length }
  ]
  return (
    <div>
      <PageHeader title="Roles" actions={<Button size="sm" onClick={()=>addRole({ name: 'new-role', permissions: [] })}>Create Role</Button>} />
      <DataTable columns={columns} data={roles} />
    </div>
  )
}
