import { useState } from 'react'
import { Btn, Card, Page, Table, Td, inputCls } from '../../components/ui'
import { users } from '../../lib/data'

export default function Users() {
  const [q, setQ] = useState('');
  const rows = users.filter((u) => 
    u.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Page title="Users">
      <Card>
        <div className="mb-3.5 flex flex-wrap justify-between gap-2.5">
          <input 
            aria-label="Search users" 
            className={`${inputCls} max-w-65`} 
            placeholder="Search by name or email" 
            value={q} 
            onChange={(e) => setQ(e.target.value)} 
          />
          <Btn>Add user</Btn>
        </div>
        <Table head={['Name', 'Role', 'Department', 'Manager', '']}>
          {rows.map((u) => (
            <tr key={u.name}>
              <Td>{u.name}</Td>
              <Td>{u.role}</Td>
              <Td>{u.dept}</Td>
              <Td>{u.manager}</Td>
              <Td>
                <Btn variant="ghost">Edit</Btn>
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
    </Page>
  )
}