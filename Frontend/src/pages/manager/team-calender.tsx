import { Card, Page } from '../../components/ui'

const away = [2, 3, 9, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24]

export default function TeamCalendar() {
  return (
    <Page title="Team calendar">
      <Card title="October 2026">
        <div className="grid grid-cols-7 gap-1 text-center text-[13px]">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => 
            <span key={d} className="py-2 text-muted">
              {d}
            </span>
          )}
          {[0, 1, 2].map((i) => <span key={`b${i}`} />)}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
            <span
              key={d}
              className={`rounded-md py-2 ${d === 1 
                ? 'bg-pendBg font-bold text-pend' 
                : away.includes(d) 
                ? 'bg-accentSoft font-bold text-accent' 
                : ''}`}
            >
              {d}
            </span>
          ))}
        </div>
        <p className="mt-3.5 text-sm text-muted">
          Blue: someone on your team is out. Amber: public holiday.
        </p>
      </Card>
    </Page>
  )
}