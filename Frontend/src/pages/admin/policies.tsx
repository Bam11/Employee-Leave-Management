import { Btn, Card, Page, Table, Td, } from '../../components/ui'
import { leaveTypes } from '../../lib/data'

export function Policies() {
  return (
    <Page title="Leave policies">
      <Card title="Leave types">
        <Table head={['Type', 'Days per year', 'Needs approval', 'Carry over', '']}>
          {leaveTypes.map((t) => (
            <tr key={t.name}>
              <Td>{t.name}</Td>
              <Td>{t.days}</Td>
              <Td>{t.approval}</Td>
              <Td>{t.carry}</Td>
              <Td>
                <Btn variant="ghost">Edit</Btn>
              </Td>
            </tr>
          ))}
        </Table>
        <div className="mt-3.5">
          <Btn>Add leave type</Btn>
        </div>
      </Card>
    </Page>
  )
}
