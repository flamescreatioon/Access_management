import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button.jsx'

export default function DataTable({ columns, data, pageSize=5 }) {
  const [page, setPage] = useState(0)
  const [sort, setSort] = useState({ key: null, dir: 'asc' })

  const sorted = useMemo(() => {
    if (!sort.key) return data
    return [...data].sort((a,b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      if (av === bv) return 0
      if (sort.dir === 'asc') return av > bv ? 1 : -1
      return av < bv ? 1 : -1
    })
  }, [data, sort])

  const paged = sorted.slice(page*pageSize, (page+1)*pageSize)

  const toggleSort = (key) => {
    setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' })
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="text-left px-3 py-2 font-medium cursor-pointer select-none" onClick={() => toggleSort(col.key)}>
                {col.label}
                {sort.key === col.key && (sort.dir === 'asc' ? ' ▲' : ' ▼')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paged.map(row => (
            <tr key={row.id} className="border-t">
              {columns.map(col => (
                <td key={col.key} className="px-3 py-2">{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
          {paged.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-3 py-6 text-center text-muted-foreground">No data</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between px-3 py-2 bg-muted/50">
        <span className="text-xs">Page {page+1} / {Math.max(1, Math.ceil(data.length / pageSize))}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page===0} onClick={()=>setPage(p=>p-1)}>Prev</Button>
          <Button variant="outline" size="sm" disabled={(page+1)*pageSize>=data.length} onClick={()=>setPage(p=>p+1)}>Next</Button>
        </div>
      </div>
    </div>
  )
}
