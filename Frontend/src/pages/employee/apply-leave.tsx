import { useState } from 'react'
import { Btn, Card, Field, Page, btn, inputCls } from '../../components/ui'


function workingDays(from: string, to: string) {
  if (!from || !to) return 0
  let n = 0
  for (const d = new Date(from); d <= new Date(to); d.setDate(d.getDate() + 1)) {
    if (d.getDay() !== 0 && d.getDay() !== 6) n++
  }
  return n
}

export default function ApplyLeave() {
  const balance = 12
  const [type, setType] = useState('Annual leave')
  const [start, setStart] = useState('2026-10-12')
  const [end, setEnd] = useState('2026-10-16')
  const [reason, setReason] = useState('')
  const [sent, setSent] = useState(false)
  const days = workingDays(start, end)
  const error = end < start ? 'End date must be on or after the start date.' : days > balance ? `You only have ${balance} days available.` : ''
  return (
    <Page title="Apply for leave">
      <Card>
        {sent ? (
          <p role="status">Request submitted. Your manager will be notified.</p>
        ) : (
          <form
            className="grid gap-3.5 sm:grid-cols-2"
            onSubmit={(e) => { e.preventDefault(); if (!error) setSent(true) }}
          >
            <Field label="Leave type" id="type">
              <select 
                id="type" 
                className={inputCls} 
                value={type} 
                onChange={(e) => setType(e.target.value)}
              >
                <option>Annual leave</option>
                <option>Sick leave</option>
                <option>Personal leave</option>
              </select>
            </Field>
            <Field label="Balance" id="bal">
              <input 
                id="bal" 
                className={inputCls} 
                value={`${balance} days available`} 
                disabled 
              />
            </Field>
            <Field label="Start date" id="start">
              <input 
                id="start" 
                type="date" 
                className={inputCls} 
                value={start} 
                onChange={(e) => setStart(e.target.value)} 
              />
            </Field>
            <Field label="End date" id="end">
              <input 
                id="end" 
                type="date" 
                className={inputCls} 
                value={end} 
                onChange={(e) => setEnd(e.target.value)} 
              />
            </Field>
            <div className="rounded-[10px] bg-accentSoft p-3.5 text-sm sm:col-span-2">
              {error ? (
                <span className="text-no">{error}</span>
              ) : (
                <>
                  Working days requested:
                  <b className="text-accent">{days}</b>
                  (weekends excluded). Balance after approval:
                  <b className="text-accent">{balance - days} days</b>.</>
              )}
            </div>
            <Field label="Reason" id="reason" full>
              <textarea 
                id="reason" 
                rows={3} 
                className={inputCls} 
                placeholder="Add a short note for your manager" 
                value={reason} 
                onChange={(e) => setReason(e.target.value)} 
              />
            </Field>
            <div className="flex gap-2.5 sm:col-span-2">
              <button 
                className={`${btn()} disabled:opacity-50`} 
                disabled={!!error}
              >
                Submit request
              </button>
              <Btn variant="ghost">Save draft</Btn>
            </div>
          </form>
        )}
      </Card>
    </Page>
  )
}
