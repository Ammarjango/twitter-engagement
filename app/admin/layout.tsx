'use client'

import { usePathname } from 'next/navigation'
import ContextProvider from 'app/context-provider'
import HeaderAdmin from '@/components/HeaderAdmin'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = usePathname()

  const showHeader =
    router === '/admin' || router === '/admin/login' || router === '/admin/forgotPassword'
      ? false
      : true

  return (
    <section lang='en'>
      <ContextProvider>
        <section className='m-0'>
          {showHeader && <HeaderAdmin />}
          {children}
        </section>
      </ContextProvider>
    </section>
  )
}
