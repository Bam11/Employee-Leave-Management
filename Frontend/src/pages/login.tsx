import { type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { homePath } from '../lib/data'
import { btn, Field, inputCls } from '../components/ui'
import Parent from '../components/parent'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const created = (useLocation().state as { email?: string } | null)?.email
  const [email, setEmail] = useState(created ?? '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const result = login(email, password)
    if (typeof result === 'string') setError(result)
    else navigate(homePath[result.role])
  }

  return (
    <Parent title="Log in" intro="Welcome back. Log in to open your dashboard.">
      {created && (
        <p
          role="status"
          className="mb-3.5 rounded-lg bg-okBg p-3 text-sm text-ok"
        >
          Account created. Log in to continue.
        </p>
      )}
      <form onSubmit={submit} className="grid gap-3.5">
        <Field label="Work email" id="email">
          <input
            id="email"
            type="email"
            required
            autoComplete="username"
            className={inputCls}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Password" id="pw">
          <input
            id="pw"
            type="password"
            required
            autoComplete="current-password"
            className={inputCls}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        {error && <p role="alert" className="text-sm text-no">{error}</p>}
        <button className={btn()}>Log in</button>
      </form>
      <p className="mt-4 text-sm text-muted">
        New here?
        <Link
          to="/signup"
          className="font-semibold text-accent"
        >
          Create an account
        </Link>
      </p>
      <p className="mt-4 rounded-lg bg-bg p-3 text-xs text-muted">
        Demo accounts: amara@leavedesk.com / amara123 (employee), tunde@leavedesk.com / tunde123 (manager),
        ifeoma@leavedesk.com / ifeoma123 (admin).
      </p>
    </Parent>
  )
}