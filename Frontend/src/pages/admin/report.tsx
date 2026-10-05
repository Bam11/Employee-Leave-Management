import { Btn, Card, Page } from '../../components/ui'
import { departments } from '../../lib/data'

export function Reports() {
  const max = Math.max(...departments.map((d) => d.days))
  return (
    <Page title="Reports">
      <Card title="Days taken this year, by department">
        {departments.map((d) => (
          <div key={d.name} className="mb-2 flex items-center gap-2 text-sm">
            <span className="w-28 text-muted">{d.name}</span>
            <div className="h-3.5 flex-1 overflow-hidden rounded bg-line">
              <div className="h-full bg-accent" style={{ width: `${(d.days / max) * 100}%` }} />
            </div>
            {d.days}
          </div>
        ))}
        <div className="mt-3.5"><Btn variant="ghost">Export CSV</Btn></div>
      </Card>
    </Page>
  )
}