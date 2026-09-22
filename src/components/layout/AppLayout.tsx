import { Outlet } from 'react-router-dom'

import { AppHeader } from '@/components/layout/AppHeader'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#F6FAFF]">
      <AppHeader />

      <Outlet />
    </div>
  )
}
