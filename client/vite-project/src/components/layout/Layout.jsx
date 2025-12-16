import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar.jsx";
import Topbar from "@/components/layout/Topbar.jsx";



// Layout wrapper now delegates navigation & top bar to dedicated components

export default function Layout() {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div className="flex h-screen bg-white text-foreground">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
            <div className="flex flex-col flex-1 min-w-0">
                <Topbar onSidebarToggle={() => setCollapsed(!collapsed)} />
                <main className="flex-1 overflow-y-auto p-6 space-y-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}