import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Link } from 'react-router-dom'

export default function ForgotPasswordPage(){
  const [email,setEmail] = useState('')

  const submit = (e) => {
    e.preventDefault()
    alert('Password reset requested (mock)')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader><CardTitle>Reset Password</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm mb-1 block">Email</label>
              <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">Send Reset Link</Button>
            <div className="text-xs text-muted-foreground pt-2 text-center">
              <Link to="/login">Back to login</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
