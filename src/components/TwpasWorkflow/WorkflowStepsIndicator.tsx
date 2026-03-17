import { Tooltip } from 'primereact/tooltip'
import type { WorkflowStep } from './twpas-workflow.types'
import './twpas-workflow.scss'

interface Props {
  steps: WorkflowStep[]
  onStepClick?: (stepIndex: number) => void
}

const WorkflowStepsIndicator = ({ steps, onStepClick }: Props) => {
  const getIcon = (s: WorkflowStep['status']) => {
    switch (s) {
      case 'success': return '\u2713'
      case 'failed': return '\u2717'
      case 'in_progress': return '\u25CF'
      default: return ''
    }
  }

  const getLineClass = (idx: number): string => {
    const cur = steps[idx].status
    const next = steps[idx + 1]?.status
    if (cur === 'success' && next && next !== 'pending') return 'line-done'
    if (cur === 'failed') return 'line-fail'
    return 'line-pending'
  }

  const clickable = (s: WorkflowStep) => s.status === 'success' || s.status === 'failed'

  return (
    <div className="wf-indicator">
      {steps.map((step, idx) => {
        const tid = `wf-${idx}-${Math.random().toString(36).slice(2, 6)}`
        return (
          <div key={idx} className="wf-node">
            <div className="wf-col">
              <Tooltip target={`.${tid}`} content={step.label} position="top" />
              <div
                className={`wf-circle wf-${step.status} ${tid} ${clickable(step) ? 'wf-clickable' : ''}`}
                onClick={() => clickable(step) && onStepClick?.(idx)}
              >
                {getIcon(step.status) || (idx + 1)}
              </div>
              <div className="wf-label">{step.label}</div>
              {step.timestamp && <div className="wf-time">{step.timestamp}</div>}
            </div>
            {idx < steps.length - 1 && (
              <div className={`wf-line ${getLineClass(idx)}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default WorkflowStepsIndicator
