import PageHeader from '@/components/common/PageHeader.jsx'
import DataTable from '@/components/common/DataTable.jsx'
import SearchBar from '@/components/common/SearchBar.jsx'
import RoleBadge from '@/components/common/RoleBadge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { useUsers } from '@/context/UsersContext.jsx'
import { useAuth } from '@/context/AuthContext.jsx'
import { useState } from 'react'

export default function UsersPage(){
  const { users, createUser, updateUser, deleteUser } = useUsers()
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'member', status:'pending' })
  const filtered = users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()))

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (r)=> <RoleBadge role={r.role} /> },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions', render: (r) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => {
          const name = prompt('New name', r.name)
          const email = prompt('New email', r.email)
          if(name || email) updateUser(r.id, { ...(name ? { name } : {}), ...(email ? { email } : {}) })
        }}>Edit</Button>
        <Button size="sm" variant="destructive" onClick={() => {
          if(confirm('Delete this user?')) deleteUser(r.id)
        }}>Delete</Button>
      </div>
    ) }
  ]

  const submit = async (e) => {
    e.preventDefault()
    await createUser(form)
    setForm({ name:'', email:'', password:'', role:'member', status:'pending' })
    setFormOpen(false)
  }

  return (
    <div>
      <PageHeader title="Users" actions={user?.role === 'admin' ? <Button size="sm" onClick={()=>setFormOpen(true)}>Add User</Button> : null} />
      <div className="flex items-center gap-4 mb-4">
        <SearchBar value={query} onChange={setQuery} />
      </div>
      {formOpen && (
        <div className="mb-4 border rounded-md p-4">
          <form onSubmit={submit} className="grid md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs block mb-1">Name</label>
              <input className="border rounded px-2 py-1 w-full" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
            </div>
            <div>
              <label className="text-xs block mb-1">Email</label>
              <input type="email" className="border rounded px-2 py-1 w-full" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
            </div>
            <div>
              <label className="text-xs block mb-1">Password</label>
              <input type="password" className="border rounded px-2 py-1 w-full" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} required />
            </div>
            <div>
              <label className="text-xs block mb-1">Role</label>
              <select className="border rounded px-2 py-1 w-full" value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))}>
                <option value="member">member</option>
                <option value="staff">staff</option>
                <option value="admin">admin</option>
                <option value="guest">guest</option>
              </select>
            </div>
            <div>
              <label className="text-xs block mb-1">Status</label>
              <select className="border rounded px-2 py-1 w-full" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
                <option value="pending">pending</option>
                <option value="approved">approved</option>
                <option value="rejected">rejected</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <Button type="submit" size="sm">Create</Button>
              <Button type="button" size="sm" variant="outline" onClick={()=>setFormOpen(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}
      <DataTable columns={columns} data={filtered} />
    </div>
  )
}
