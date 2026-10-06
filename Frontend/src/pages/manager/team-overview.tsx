import { Link } from 'react-router'
import { Badge, Card, Page, Stat, Stats, Table, Td, btn } from '../../components/ui'
import { team } from '../../lib/data'

export default function TeamOverview() {
  return (
    <Page title="Team overview">
      <Stats>
        <Stat value="3" label="Requests to review" />
        <Stat value="2" label="Team members out today" />
        <Stat value="8" label="Team size" />
        <Stat value="12" label="Your own annual days left" />
      </Stats>
      <Card title="My team this week">
        <Table head={['Name', 'Status today', 'Next leave', 'Annual left']}>
          {team.map((m) => (
            <tr key={m.name}>
              <Td>{m.name}</Td>
              <Td>
                <Badge label={m.status} />
              </Td>
              <Td>{m.next}</Td>
              <Td>{m.left}</Td>
            </tr>
          ))}
        </Table>
        <Link to="/approvals" className={`${btn()} mt-3.5`}>
          Review requests
        </Link>
      </Card>
    </Page>
  )
}



