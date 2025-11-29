import { useState } from 'react'
import PageHeader from '@/components/common/PageHeader.jsx'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { useAuth } from '@/context/AuthContext.jsx'
import { api } from '@/lib/apiClient.js'

export default function AlertsConfigPage(){
  const { token, user } = useAuth()
  const [form, setForm] = useState({ suspiciousThreshold:5, emailRecipients:'security@example.com' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  if(user?.role !== 'admin') return <p className="p-4 text-sm">Access denied.</p>

  const submit = async (e) => {
    e.preventDefault(); setSaving(true); setError(''); setMessage('')
    try { await api.admin.configureAlerts(token, form); setMessage('Alerts configuration saved') } catch(e){ setError(e.message) } finally { setSaving(false) }
  }

  return (
    <div>
      <PageHeader title="Alerts Configuration" />
      <Card>
        <CardHeader><CardTitle>Security & Activity Alerts</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-medium block mb-1">Suspicious Attempts Threshold</label>
              <input type="number" className="border rounded px-2 py-1 w-40" value={form.suspiciousThreshold} onChange={e=>setForm(f=>({...f,suspiciousThreshold:Number(e.target.value)}))} />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1">Alert Email Recipients (comma separated)</label>
              <input className="border rounded px-2 py-1 w-full" value={form.emailRecipients} onChange={e=>setForm(f=>({...f,emailRecipients:e.target.value}))} />
            </div>
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
            {error && <p className="text-xs text-red-600">{error}</p>}
            {message && <p className="text-xs text-green-600">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
