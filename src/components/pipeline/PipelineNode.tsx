import type { PipelineNodeData } from './pipelineData'

interface PipelineNodeProps {
  node: PipelineNodeData
  isActive: boolean
  onActivate: () => void
}

export function PipelineNode({ node, isActive, onActivate }: PipelineNodeProps) {
  return (
    <button
      type="button"
      className={`pipeline-node${isActive ? ' active' : ''}`}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      onFocus={onActivate}
      onMouseEnter={onActivate}
      onClick={onActivate}
    >
      {node.label}
    </button>
  )
}
