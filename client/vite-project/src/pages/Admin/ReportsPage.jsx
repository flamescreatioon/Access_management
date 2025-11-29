import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/PageHeader.jsx'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx'
import { useAuth } from '@/context/AuthContext.jsx'
import { api } from '@/lib/apiClient.js'

export default function ReportsPage(){
  const { token, user } = useAuth()
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(()=>{
    if(user?.role !== 'admin') return
    ;(async()=>{
      setLoading(true); setError('')
      try { const data = await api.admin.accessReport(token); setReport(data) } catch(e){ setError(e.message) } finally { setLoading(false) }
    })()
  },[token, user])

  if(user?.role !== 'admin') return <p className="p-4 text-sm">Access denied.</p>

  return (
    <div>
      <PageHeader title="Access Reports" />
      <Card>
        <CardHeader><CardTitle>Role Distribution</CardTitle></CardHeader>
        <CardContent>
          {loading && <p className="text-sm">Loading...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {report && (
            <div className="space-y-2 text-sm">
              {report.byRole.map(r => (
                <div key={r.role} className="flex justify-between border-b py-1">
                  <span>{r.role}</span>
                  <span className="font-medium">{r._count.id}</span>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-2">Generated at {new Date(report.generatedAt).toLocaleString()}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
