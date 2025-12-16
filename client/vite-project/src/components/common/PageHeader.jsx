export default function PageHeader({ title, actions }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-xl font-bold tracking-tight">{title}</h1>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  )
}
