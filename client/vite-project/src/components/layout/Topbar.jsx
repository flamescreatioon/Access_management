import { useState } from "react"
import { Button } from "@/components/ui/button.jsx"
import { cn } from "@/lib/utils"
import { Sun } from "lucide-react"

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
        <div className="relative">
          <input
            placeholder="Search..."
            className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div onClick={toggleTheme}>
          <Sun/>
        </div>
        {/* <Button variant="outline" size="sm" className={cn("bg-sky-500 text-accent-foreground hover:bg-sky-700")} >{dark ? "Light" : "Dark"}</Button> */}
        <div className={cn("h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold")}>AD</div>
      </div>
    </header>
  )
}
