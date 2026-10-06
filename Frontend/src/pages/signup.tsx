import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { type Role, roleLabel } from '../lib/data'
import { btn, Field, inputCls } from '../components/ui'
import Parent from '../components/parent'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('employee')
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const err = password.length < 8 
      ? 'Password must be at least 8 characters.' 
      : signup({ name: name.trim(), email, password, role })

    if (err) return setError(err)
    navigate('/login', { state: { email: email.trim().toLowerCase() } })
  }

  return (
    <Parent 
      title="Create your account" 
      intro="Sign up once, then log in with your email and password."
    >
      <form onSubmit={submit} className="grid gap-3.5">
        <Field label="Full name" id="name">
          <input 
            id="name" 
            required 
            autoComplete="name" 
            className={inputCls} 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </Field>
        <Field label="Work email" id="semail">
          <input 
            id="email" 
            type="email" 
            required 
            autoComplete="email" 
            className={inputCls} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Field>
        <Field label="Password" id="spw">
          <input 
            id="pw" 
            type="password" 
            required 
            minLength={8} 
            autoComplete="new-password" 
            className={inputCls} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Field>
        <fieldset>
          <legend className="mb-1 text-sm font-semibold">I am signing up as</legend>
          <div className="grid grid-cols-2 gap-2.5">
            {(['employee', 'manager'] as Role[]).map((r) => (
              <label 
                key={r} 
                className={`cursor-pointer rounded-[10px] border p-3 
                  ${role === r ? 'border-accent bg-accentSoft' : 'border-line'}`}
              >
                <input 
                  type="radio" 
                  name="role" 
                  className="mr-2" 
                  checked={role === r} 
                  onChange={() => setRole(r)} 
                />
                <span className="font-semibold">{roleLabel[r]}</span>
                <small 
                  className="block text-muted"
                >
                  {r === 'employee' ? 'I request leave' : 'I also approve my team\u2019s leave'}
                </small>
              </label>
            ))}
          </div>
        </fieldset>
        {error && <p role="alert" className="text-sm text-no">{error}</p>}
        <button className={btn()}>Create account</button>
      </form>
      <p className="mt-4 text-sm text-muted">
        Already have an account? 
        <Link 
          to="/login" 
          className="font-semibold text-accent"
        >
          Log in
        </Link>
      </p>
      <p className="mt-2 text-[13px] text-muted">
        Admin accounts are created by HR, so they are not available here.
      </p>
    </Parent>
  )
}