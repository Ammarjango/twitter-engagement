import React from 'react'
import Link from 'next/link'
import BreadcrumbsMui from '@mui/material/Breadcrumbs'
import { useTheme } from 'context/ThemeContext'

interface Page {
  title: string
  href: string
}

interface BreadcrumbsProps {
  pages: Page[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ pages }) => {
  const { theme } = useTheme()

  return (
    <BreadcrumbsMui
      aria-label='breadcrumb'
      separator={<span style={{ color: theme.palette.text.primary }}> / </span>}
    >
      {pages.map((page, index) =>
        index === pages.length - 1 ? (
          <span
            key={index}
            className='font-roboto text-[12px]'
            style={{ color: theme.palette.text.primary }}
          >
            {page.title}
          </span>
        ) : (
          <Link href={page.href} key={index} className='no-underline'>
            <span className='font-roboto text-[12px]' style={{ color: theme.palette.text.primary }}>
              {page.title}
            </span>
          </Link>
        ),
      )}
    </BreadcrumbsMui>
  )
}

export default Breadcrumbs
