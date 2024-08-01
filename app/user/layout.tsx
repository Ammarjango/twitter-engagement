'use client'

import { usePathname } from 'next/navigation'
import ContextProvider from 'app/context-provider'
import Header from '@/components/Header'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = usePathname()

  const showHeader = router === '/user/login' ? false : true

  return (
    <section>
      <ContextProvider>
        <section className='m-0'>
          {showHeader && <Header />}
          {children}
        </section>
      </ContextProvider>
    </section>
  )
}
