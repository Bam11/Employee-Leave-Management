import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { homePath } from '../lib/data'
import type { Role } from '../lib/data'

export default function ProtectedRoutes({ allowed }: { allowed: Role[] }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  
  return allowed.includes(user.role) ? <Outlet /> : <Navigate to={homePath[user.role]} replace />
}
