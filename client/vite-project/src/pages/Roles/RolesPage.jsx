import PageHeader from '@/components/common/PageHeader.jsx'
import DataTable from '@/components/common/DataTable.jsx'
import { Button } from '@/components/ui/button.jsx'
import { useRoles } from '@/context/RolesContext.jsx'
import { useState } from 'react'

export default function RolesPage(){
  const { roles, createRole, updateRole, deleteRole } = useRoles()
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ name:'', description:'', permissions:[] })

  const submit = async (e) => {
    e.preventDefault()
    await createRole(form)
    setForm({ name:'', description:'', permissions:[] })
    setFormOpen(false)
  }

  const columns = [
    { key: 'name', label: 'Role' },
    { key: 'description', label: 'Description' },
    { key: 'permissions', label: 'Permissions', render: r => r.permissions?.length || 0 },
    { key: 'actions', label: 'Actions', render: (r) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => {
          const description = prompt('Edit description', r.description)
          if(description !== null) updateRole(r.id, { description })
        }}>Edit</Button>
        <Button size="sm" variant="destructive" onClick={() => {
          if(confirm('Delete this role?')) deleteRole(r.id)
        }} disabled={['admin','member'].includes(r.id)}>Delete</Button>
      </div>
    ) }
  ]

  return (
    <div>
      <PageHeader title="Roles" actions={<Button size="sm" onClick={()=>setFormOpen(true)}>Create Role</Button>} />
      {formOpen && (
        <div className="mb-4 border rounded-md p-4">
          <form onSubmit={submit} className="grid md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs block mb-1">Role Name</label>
              <input className="border rounded px-2 py-1 w-full" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
            </div>
            <div>
              <label className="text-xs block mb-1">Description</label>
              <input className="border rounded px-2 py-1 w-full" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
            </div>
            <div className="flex items-end gap-2">
              <Button type="submit" size="sm">Create</Button>
              <Button type="button" size="sm" variant="outline" onClick={()=>setFormOpen(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}
      <DataTable columns={columns} data={roles} />
    </div>
  )
}
