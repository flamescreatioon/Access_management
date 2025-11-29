import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext.jsx'

export default function RegisterPage(){
  const [form, setForm] = useState({ name:'', email:'', password:'', Registration_number:'', Department:'', College:'' })
  const { register, loading, error } = useAuth()
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const data = await register(form)
      setMessage(data.message || 'Registration submitted')
    } catch (err) {
      // error handled in context
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader><CardTitle>Register</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm mb-1 block">Name</label>
              <Input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
            </div>
            <div>
              <label className="text-sm mb-1 block">Email</label>
              <Input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
            </div>
            <div>
              <label className="text-sm mb-1 block">Password</label>
              <Input type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} required />
            </div>
            <div>
              <label className="text-sm mb-1 block">Registration Number</label>
              <Input value={form.Registration_number} onChange={e=>setForm(f=>({...f,Registration_number:e.target.value}))} />
            </div>
            <div>
              <label className="text-sm mb-1 block">Department</label>
              <Input value={form.Department} onChange={e=>setForm(f=>({...f,Department:e.target.value}))} />
            </div>
            <div>
              <label className="text-sm mb-1 block">College</label>
              <Input value={form.College} onChange={e=>setForm(f=>({...f,College:e.target.value}))} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Submitting...' : 'Create Account'}</Button>
            {error && <p className="text-xs text-red-600">{error}</p>}
            {message && <p className="text-xs text-green-600">{message}</p>}
            <div className="text-xs text-muted-foreground pt-2 text-center">
              <Link to="/login">Back to login</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
