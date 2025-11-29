import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { LayoutGrid, Users, Shield, KeyRound, MailQuestion, FileClock, Settings, QrCode, Wrench, Bell, Megaphone, BarChart3 } from "lucide-react"
import { useAuth } from '@/context/AuthContext.jsx'

const BASE_ITEMS = [
  { name: "Dashboard", path: "/", icon: LayoutGrid },
  { name: "Users", path: "/users", icon: Users },
  { name: "Roles", path: "/roles", icon: Shield },
  { name: "Permissions", path: "/permissions", icon: KeyRound },
  { name: "Requests", path: "/requests", icon: MailQuestion },
  { name: "Logs", path: "/logs", icon: FileClock },
  { name: "Access Codes", path: "/access/codes", icon: QrCode },
  { name: "Settings", path: "/settings", icon: Settings }
]

const ADMIN_ITEMS = [
  { heading: 'Admin' },
  { name: 'Pending Approvals', path: '/admin/pending-approvals', icon: Wrench },
  { name: 'System Config', path: '/admin/system-config', icon: Wrench },
  { name: 'Announcements', path: '/admin/announcements', icon: Megaphone },
  { name: 'Alerts', path: '/admin/alerts-config', icon: Bell },
  { name: 'Reports', path: '/admin/reports', icon: BarChart3 }
]

export default function Sidebar({ collapsed, onToggle }) {
  const { user } = useAuth()
  const NAV_ITEMS = user?.role === 'admin' ? [...BASE_ITEMS, ...ADMIN_ITEMS] : BASE_ITEMS
  return (
    <aside
      className={cn(
        "border-r bg-card text-card-foreground h-full flex flex-col transition-all duration-300", 
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between px-4 h-14 border-b">
        <span className={cn("font-semibold text-lg", collapsed && "hidden")}>Access Hub</span>
        <button
          onClick={onToggle}
          className="text-sm px-2 py-1 rounded hover:bg-accent"
          aria-label="Toggle sidebar"
        >
          {collapsed ? ">" : "<"}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {NAV_ITEMS.map(item => {
          if(item.heading){
            return (
              <div key={item.heading} className={cn("mt-4 mb-1 text-xs font-semibold text-muted-foreground", collapsed && "hidden")}>{item.heading}</div>
            )
          }
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors", 
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
              <span className={cn(collapsed && "hidden")}>{item.name}</span>
            </NavLink>
          )
        })}
      </nav>
      <div className="p-3 text-xs text-muted-foreground border-t">v0.1.0</div>
    </aside>
  )
}
