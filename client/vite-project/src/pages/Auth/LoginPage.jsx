import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext.jsx'

export default function LoginPage(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const ok = await login(email, password)
    if(ok) navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader><CardTitle>Login</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm mb-1 block">Email</label>
              <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm mb-1 block">Password</label>
              <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</Button>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <div className="flex justify-between text-xs text-muted-foreground pt-2">
              <Link to="/forgot">Forgot password?</Link>
              <Link to="/register">Register</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
