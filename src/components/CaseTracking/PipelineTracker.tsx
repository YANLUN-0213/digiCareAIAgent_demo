import WorkflowStepsIndicator from '@/components/TwpasWorkflow/WorkflowStepsIndicator'
import type { WorkflowStep } from '@/components/TwpasWorkflow/twpas-workflow.types'

interface Props {
  steps: WorkflowStep[]
  onStepClick?: (stepIndex: number) => void
}

const PipelineTracker = ({ steps, onStepClick }: Props) => {
  return <WorkflowStepsIndicator steps={steps} onStepClick={onStepClick} />
}

export default PipelineTracker
