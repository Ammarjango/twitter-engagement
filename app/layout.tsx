'use client'
import './globals.css'

import { usePathname } from 'next/navigation'
import hexImage from '../public/hexBg.png'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import ContextProvider from './context-provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  const router = usePathname()

  return (
    <html lang='en'>
      <head>
        <title>Pollen Finance</title>
        <meta name='description' content='Where Engagement Grows' />
        <link rel='icon' href='/favicon.ico' />
      </head>

      <ContextProvider>
        <body className='m-0'>
          <ToastContainer />
          <div className='relative'>
            <div className='absolute top-0 right-0'>
              <Image src={hexImage} width={560} height={700} alt='hex' className='w-full h-auto' />
            </div>
          </div>
          {children}
        </body>
      </ContextProvider>
    </html>
  )
}
