import { useState } from "react"
import { Button } from "@/components/ui/button.jsx"
import { cn } from "@/lib/utils"

export default function Topbar({ onSidebarToggle }) {
  const [dark, setDark] = useState(false)

  const toggleTheme = () => {
    setDark(!dark)
    if (!dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onSidebarToggle}>Toggle</Button>
        <div className="relative">
          <input
            placeholder="Search..."
            className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">Notifications</Button>
        <Button variant="outline" size="sm" onClick={toggleTheme}>{dark ? "Light" : "Dark"}</Button>
        <div className={cn("h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold")}>AD</div>
      </div>
    </header>
  )
}
