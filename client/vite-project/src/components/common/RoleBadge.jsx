import { cn } from '@/lib/utils'

const colors = {
  admin: 'bg-red-500/10 text-red-600 border-red-400/30',
  staff: 'bg-blue-500/10 text-blue-600 border-blue-400/30',
  member: 'bg-green-500/10 text-green-600 border-green-400/30',
  default: 'bg-muted text-muted-foreground border-border'
}

export default function RoleBadge({ role }) {
  return (
    <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', colors[role] || colors.default)}>
      {role}
    </span>
  )
}
