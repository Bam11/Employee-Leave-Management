import { Card, Page, Stat, Stats, Table, Td } from '../../components/ui'
import { holidays } from '../../lib/data'

export default function CompanyOverview() {
  return (
    <Page title="Company overview">
      <Stats>
        <Stat value="142" label="Employees" />
        <Stat value="9" label="Out today" />
        <Stat value="17" label="Pending requests" />
        <Stat value="4" label="Departments" />
      </Stats>
      <Card title="Upcoming public holidays">
        <Table head={['Date', 'Holiday']}>
          {holidays.map((h) =>
            <tr key={h.date}>
              <Td>{h.date}</Td>
              <Td>{h.name}</Td>
            </tr>
          )}
        </Table>
      </Card>
    </Page>
  )
}