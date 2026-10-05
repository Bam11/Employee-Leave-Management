import { Link } from 'react-router'
import { Badge, Btn, Card, Page, Stat, Stats, Table, Td, btn } from '../../components/ui'
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

export default function EmployeeDashboard() {
  return (
    <Page title="Dashboard">
      <Stats>
        <Stat value="12" label="Annual days left" progress={60} />
        <Stat value="5" label="Sick days left" progress={50} />
        <Stat value="3" label="Personal days left" progress={75} />
        <Stat value="1" label="Request pending" />
      </Stats>
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card title="Recent requests">
          <Table head={['Type', 'Dates', 'Days', 'Status']}>
            <Rows rows={myRequests} />
          </Table>
        </Card>
        <Card title="Next leave">
          <p className="text-[22px] font-bold">12–16 October</p>
          <p className="mb-4 text-muted">Annual leave · waiting for Tunde Bello</p>
          <Link to="/apply" className={btn()}>Apply for leave</Link>
        </Card>
      </div>
    </Page>
  )
}