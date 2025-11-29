import PageHeader from '@/components/common/PageHeader.jsx'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { useState } from 'react'

export default function SettingsPage(){
  const [twoFA, setTwoFA] = useState(false)
  const [timeout, setTimeoutVal] = useState(30)

  return (
    <div>
      <PageHeader title="Settings" />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Organization</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div><strong>Name:</strong> Example Org</div>
            <div><strong>Domain:</strong> example.com</div>
            <Button size="sm" variant="outline">Edit</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Security</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span>Two-Factor Authentication</span>
              <Button size="sm" variant={twoFA? 'destructive':'outline'} onClick={()=>setTwoFA(!twoFA)}>{twoFA? 'Disable':'Enable'}</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Session Timeout (mins)</span>
              <input type="number" value={timeout} onChange={e=>setTimeoutVal(Number(e.target.value))} className="w-20 h-8 rounded border px-2 bg-background" />
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>API Keys</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between border rounded px-3 py-2">
              <span>prod_xxxxxxxxxxxxx</span>
              <Button size="sm" variant="outline">Revoke</Button>
            </div>
            <Button size="sm">Generate New Key</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
