import type { Dispatch, SetStateAction } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, CalendarClock, Sparkles, LogOut } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/accounts', label: 'Accounts', icon: Users },
  { to: '/scheduler', label: 'Scheduler', icon: CalendarClock },
  { to: '/ai-composer', label: 'AI Composer', icon: Sparkles },
]

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate()

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform md:static md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* logo */}
      <div className="flex items-center gap-2 p-6 pb-4">
        <img src="/logo.svg" alt="Logo" className="size-7" />
        <span className="text-xl font-semibold text-slate-800">Scheduler</span>
      </div>

      {/* nav section label */}
      <div className="px-6 py-2">
        <span className="text-xs uppercase tracking-wider text-slate-400">Menu</span>
      </div>

      {/* nav links */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-red-50 text-red-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="size-5" />
                {label}
                {isActive && (
                  <span className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-full bg-red-500" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* user footer */}
      <div className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-red-400 text-sm font-semibold text-white">
            J
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-800">John Doe</p>
            <p className="truncate text-xs text-slate-500">johndoe@example.com</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-red-600"
        >
          <LogOut className="size-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Sidebar;
