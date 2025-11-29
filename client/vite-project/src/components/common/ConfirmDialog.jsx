import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'

export default function ConfirmDialog({ triggerLabel='Open', title='Confirm', description='Are you sure?', onConfirm }) {
  const [open, setOpen] = useState(false)

  const confirm = () => {
    onConfirm?.();
    setOpen(false)
  }
  return (
    <div>
      <Button variant="outline" size="sm" onClick={()=>setOpen(true)}>{triggerLabel}</Button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-card border rounded-md w-full max-w-sm p-4 space-y-3">
            <h2 className="text-sm font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={()=>setOpen(false)}>Cancel</Button>
              <Button variant="destructive" size="sm" onClick={confirm}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
