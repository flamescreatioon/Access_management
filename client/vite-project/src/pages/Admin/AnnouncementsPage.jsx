import { useState } from 'react'
import PageHeader from '@/components/common/PageHeader.jsx'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { useAuth } from '@/context/AuthContext.jsx'
import { api } from '@/lib/apiClient.js'

export default function AnnouncementsPage(){
  const { token, user } = useAuth()
  const [form, setForm] = useState({ subject:'', body:'' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  if(user?.role !== 'admin') return <p className="p-4 text-sm">Access denied.</p>

  const submit = async (e) => {
    e.preventDefault(); setSending(true); setError(''); setMessage('')
    try { const res = await api.admin.sendAnnouncement(token, form); setMessage('Announcement queued'); setForm({ subject:'', body:'' }) } catch(e){ setError(e.message) } finally { setSending(false) }
  }

  return (
    <div>
      <PageHeader title="Announcements" />
      <Card>
        <CardHeader><CardTitle>Send Announcement</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-medium block mb-1">Subject</label>
              <input className="border rounded px-2 py-1 w-full" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} required />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1">Body</label>
              <textarea className="border rounded px-2 py-1 w-full h-40" value={form.body} onChange={e=>setForm(f=>({...f,body:e.target.value}))} required />
            </div>
            <Button type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send'}</Button>
            {error && <p className="text-xs text-red-600">{error}</p>}
            {message && <p className="text-xs text-green-600">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
