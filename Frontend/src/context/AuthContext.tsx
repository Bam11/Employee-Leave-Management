import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"
import type { Role } from '../lib/data'

export interface Account {
  name: string
  email: string
  password: string
  role: Role
}

export const initials = (name: string): string =>
  name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()


const seed: Account[] = [
  { name: 'Amara Okafor', email: 'amara@leavedesk.com', password: 'amara123', role: 'employee' },
  { name: 'Tunde Bello', email: 'tunde@leavedesk.com', password: 'tunde123', role: 'manager' },
  { name: 'Ifeoma Nwosu', email: 'ifeoma@leavedesk.com', password: 'ifeoma123', role: 'admin' },
]
const KEY = 'leavedesk-accounts'

function load(): Account[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : seed
  } catch {
    return seed
  }
}

interface Auth {
  user: Account | null
  signup: (a: Account) => string | null
  login: (email: string, password: string) => Account | string
  logout: () => void
}

const AuthContext = createContext<Auth | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>(load)
  const [user, setUser] = useState<Account | null>(null)

  const signup = (a: Account) => {
    const email = a.email.trim().toLowerCase()
    if (accounts.some((x) => x.email === email)) return 'An account with this email already exists.'
    const next = [...accounts, { ...a, email }]
    setAccounts(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* ignore */ }
    return null
  }

  const login = (email: string, password: string) => {
    const found = accounts.find((x) => x.email === email.trim().toLowerCase() && x.password === password)
    if (!found) return 'Email or password is not correct.'
    setUser(found)
    return found
  }

  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}