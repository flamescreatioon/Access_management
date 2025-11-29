import { useState, useEffect } from 'react'
import PageHeader from '@/components/common/PageHeader.jsx'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { useAuth } from '@/context/AuthContext.jsx'
import { api } from '@/lib/apiClient.js'

export default function SystemConfigPage(){
  const { token, user } = useAuth()
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(()=>{
    if(!token || user?.role !== 'admin') return
    ;(async()=>{
      setLoading(true); setError('')
      try { const data = await api.admin.systemConfigGet(token); setConfig(data) } catch(e){ setError(e.message) } finally { setLoading(false) }
    })()
  },[token, user])

  const updateField = (section, key, value) => {
    setConfig(c => ({ ...c, [section]: { ...c[section], [key]: value } }))
  }

  const save = async () => {
    setSaving(true); setError(''); setMessage('')
    try { await api.admin.systemConfigUpdate(token, config); setMessage('Configuration saved') } catch(e){ setError(e.message) } finally { setSaving(false) }
  }

  if(user?.role !== 'admin') return <p className="p-4 text-sm">Access denied.</p>

  return (
    <div>
      <PageHeader title="System Configuration" />
      <Card>
        <CardHeader><CardTitle>Authentication & Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {loading && <p className="text-sm">Loading...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          {config && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium block mb-1">Password Min Length</label>
                <input type="number" className="border rounded px-2 py-1 w-32" value={config.authPolicies.passwordMinLength} onChange={e=>updateField('authPolicies','passwordMinLength', Number(e.target.value))} />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Email Notifications Enabled</label>
                <select className="border rounded px-2 py-1" value={config.notifications.emailEnabled ? 'yes':'no'} onChange={e=>updateField('notifications','emailEnabled', e.target.value === 'yes')}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <Button onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
