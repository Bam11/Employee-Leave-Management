import { useState } from 'react'
import { Badge, Btn, Card, Page, Table, Td, inputCls } from '../../components/ui'
import { type LeaveRequest, myRequests } from "../../lib/data"

const Rows = ({ rows, cancel }: { rows: LeaveRequest[]; cancel?: boolean }) => (
  <>
    {rows.map((r) => (
      <tr key={r.id}>
        <Td>{r.type}</Td>
        <Td>{r.dates}</Td>
        <Td>{r.days}</Td>
        <Td><Badge label={r.status} /></Td>
        {cancel && <Td>{r.status === 'Pending' &&
            <Btn variant="ghost">Cancel</Btn>}
          </Td>
        }
      </tr>
    ))}
  </>
)

export default function History() {
  const [status, setStatus] = useState('All')
  const rows = myRequests.filter((r) => status === 'All' || r.status === status)

  return (
    <Page title="My history">
      <Card>
        <select 
          aria-label="Filter by status" 
          className={`${inputCls} mb-3.5 w-auto`} 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
        >
          {['All', 'Pending', 'Approved', 'Rejected'].map((s) => <option key={s}>{s}</option>)}
        </select>
        <Table head={['Type', 'Dates', 'Days', 'Status', '']}>
          <Rows rows={rows} cancel />
        </Table>
      </Card>
    </Page>
  )
}
