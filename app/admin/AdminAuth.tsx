import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const AdminAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
      const token = localStorage.getItem('admin_access_token')
      if (token) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        router.push('/admin/login')
      }
    }, [router, isAuthenticated])

    if (isAuthenticated === null) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default AdminAuth
