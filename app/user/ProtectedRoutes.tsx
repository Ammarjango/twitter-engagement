import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProtectedRoutes = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
      const token = localStorage.getItem('loginToken')
      if (token) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        router.push('/')
      }
    }, [router, isAuthenticated])

    if (isAuthenticated === null) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default ProtectedRoutes
