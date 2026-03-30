import classNames from 'classnames'

interface Props {
  remainingMinutes: number
  status: string
}

function formatTime(totalMinutes: number): string {
  if (totalMinutes <= 0) return '00:00:00'
  const h = Math.floor(totalMinutes / 60)
  const m = Math.floor(totalMinutes % 60)
  const s = Math.floor((totalMinutes % 1) * 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function getColorClass(remainingMinutes: number, status: string): string {
  if (status === 'completed' || status === 'paused') return 'iv-countdown-done'
  if (remainingMinutes <= 5) return 'iv-countdown-danger'
  if (remainingMinutes <= 15) return 'iv-countdown-warning'
  return 'iv-countdown-normal'
}

const CountdownTimer = ({ remainingMinutes, status }: Props) => {
  return (
    <span className={classNames('iv-countdown', getColorClass(remainingMinutes, status))}>
      {status === 'completed' ? '已完成' : status === 'paused' ? '已暫停' : formatTime(remainingMinutes)}
    </span>
  )
}

export default CountdownTimer
