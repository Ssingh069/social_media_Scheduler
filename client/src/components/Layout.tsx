import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { MenuIcon } from 'lucide-react';
import Sidebar from './Sidebar';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/accounts': 'Social Accounts',
  '/scheduler': 'Post Scheduler',
  '/ai-composer': 'AI Composer',
};

const Layout = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Social AI';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className='flex h-screen bg-slate-100'>
      {/* mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 z-40 bg-slate-900/50 md:hidden'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      <div className='flex flex-1 flex-col overflow-hidden'>
        {/* top bar */}
        <header className='flex items-center gap-3 bg-white px-4 py-4 shadow-sm sm:px-6 md:px-8'>
          <button
            className="p-2 -ml-2 text-slate-500 md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon className="size-6" />
          </button>
          <div>
            <h1 className='text-2xl font-semibold text-slate-800'>{title}</h1>
            <p className='text-sm font-medium text-slate-500'>Manage and automate your social presence</p>
          </div>
        </header>

        <main className='flex-1 overflow-auto p-4 sm:p-6 md:p-8 xl:p-12'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout;
