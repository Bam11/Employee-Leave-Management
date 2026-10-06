import { useState } from 'react'
import { Btn, Card, Page } from '../../components/ui'
import { pendingApprovals } from '../../lib/data'

export default function Approvals() {
  const [items, setItems] = useState(pendingApprovals)
  const [note, setNote] = useState('')

  const decide = (id: number, decision: 'Approved' | 'Rejected') => {
    const item = items.find((i) => i.id === id)
    setItems(items.filter((i) => i.id !== id))
    setNote(`${item?.name}'s request was ${decision.toLowerCase()}.`)
  }

  return (
    <Page title="Approvals">
      <Card title="Waiting for your decision">
        {note && 
          <p role="status" className="mb-2 text-sm text-ok">{note}</p>
        }
        {items.length === 0 && (
          <p className="py-6 text-center text-muted">
            No requests waiting. New requests from your team appear here.
          </p>
        )}
        {items.map((i) => (
          <div 
            key={i.id} 
            className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3.5 last:border-0"
          >
            <div>
              <b>{i.name}</b> · {i.type}
              <small className="block text-muted">
                {i.dates} · {i.days} days · &ldquo;{i.reason}&rdquo;
              </small>
            </div>
            <div className="flex gap-2">
              <Btn variant="ok" onClick={() => decide(i.id, 'Approved')}>Approve</Btn>
              <Btn variant="no" onClick={() => decide(i.id, 'Rejected')}>Reject</Btn>
            </div>
          </div>
        ))}
      </Card>
    </Page>
  )
}