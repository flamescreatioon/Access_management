import { useState } from 'react'
import PageHeader from '@/components/common/PageHeader.jsx'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { useAuth } from '@/context/AuthContext.jsx'
import { api } from '@/lib/apiClient.js'

export default function CodesPage(){
  const { token } = useAuth()
  const [textCode, setTextCode] = useState(null)
  const [qrCode, setQrCode] = useState(null)
  const [expires, setExpires] = useState(null)
  const [checkinMsg, setCheckinMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerateText = async () => {
    setLoading(true); setError(''); setCheckinMsg('')
    try {
      const data = await api.access.generateText(token)
      setTextCode(data.code); setExpires(data.expiresAt); setQrCode(null)
    } catch (e){ setError(e.message) } finally { setLoading(false) }
  }
  const handleGenerateQR = async () => {
    setLoading(true); setError(''); setCheckinMsg('')
    try {
      const data = await api.access.generateQR(token)
      setQrCode(data.qr); setExpires(data.expiresAt); setTextCode(null)
    } catch (e){ setError(e.message) } finally { setLoading(false) }
  }
  const handleCheckIn = async () => {
    if(!textCode) return
    setLoading(true); setCheckinMsg(''); setError('')
    try {
      const data = await api.access.checkIn(token, textCode)
      setCheckinMsg(data.message)
    } catch(e){ setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div>
      <PageHeader title="Access Codes" />
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Generate Code</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={handleGenerateText} disabled={loading}>Text Code</Button>
              <Button onClick={handleGenerateQR} variant="outline" disabled={loading}>QR Code</Button>
            </div>
            {loading && <p className="text-sm">Working...</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
            {textCode && (
              <div className="p-3 rounded-md bg-accent text-accent-foreground">
                <p className="text-xs uppercase tracking-wide">Text Code</p>
                <p className="font-mono text-lg">{textCode}</p>
                <p className="text-xs mt-1">Expires: {new Date(expires).toLocaleTimeString()}</p>
                <Button size="sm" className="mt-2" onClick={handleCheckIn}>Simulate Check-In</Button>
              </div>
            )}
            {qrCode && (
              <div>
                <p className="text-xs uppercase tracking-wide mb-2">QR Code</p>
                <img src={qrCode} alt="QR" className="h-40 w-40 border rounded-md" />
                <p className="text-xs mt-1">Expires: {new Date(expires).toLocaleTimeString()}</p>
              </div>
            )}
            {checkinMsg && <p className="text-sm text-green-600">{checkinMsg}</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Usage Tips</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>Codes expire after a short window. Generate only when needed.</p>
            <p>QR codes can be scanned by approved devices at entry points.</p>
            <p>After successful check-in, codes cannot be reused.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
