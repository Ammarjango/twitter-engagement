export default function isAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  const token = localStorage.getItem('loginToken')
  return Boolean(token)
}
