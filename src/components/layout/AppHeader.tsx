import brandLogo from '@/assets/brand.png'
import { COPY } from '@/constants/copy'

export function AppHeader() {
  return (
    <header className="bg-[#0043A9]">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
        <div className="flex items-center gap-5">
          <img
            src={brandLogo}
            alt={COPY.common.companyName}
            className="h-10 w-auto object-contain"
          />

          <div className="hidden h-8 w-px bg-white/30 sm:block" />

          <p className="text-m font-medium text-blue-100">{COPY.common.appName}</p>
        </div>
      </div>
    </header>
  )
}
