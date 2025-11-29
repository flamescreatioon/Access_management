export default function SearchBar({ value, onChange, placeholder='Search...' }){
  return (
    <input
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      placeholder={placeholder}
      className="h-9 w-full md:w-64 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    />
  )
}
