import { useState } from 'react'
import { architectures } from './pipelineData'
import { PipelineNode } from './PipelineNode'

export function PipelineDiagram() {
  const [archIndex, setArchIndex] = useState(0)
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)

  const architecture = architectures[archIndex]
  const activeNode = architecture.nodes.find((node) => node.id === activeNodeId) ?? architecture.nodes[0]

  return (
    <div className="pipeline-diagram">
      <div className="pipeline-toggle" role="tablist" aria-label="Pipeline architecture">
        {architectures.map((arch, index) => (
          <button
            key={arch.id}
            type="button"
            role="tab"
            aria-selected={index === archIndex}
            className={`pipeline-toggle-btn${index === archIndex ? ' active' : ''}`}
            onClick={() => {
              setArchIndex(index)
              setActiveNodeId(null)
            }}
          >
            {arch.name}
          </button>
        ))}
      </div>

      <div className="pipeline-canvas">
        <svg className="pipeline-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {architecture.nodes.slice(0, -1).map((node, i) => {
            const next = architecture.nodes[i + 1]
            return <line key={node.id} x1={node.x} y1={node.y} x2={next.x} y2={next.y} className="pipeline-flow-line" />
          })}
        </svg>

        <div className="pipeline-nodes">
          {architecture.nodes.map((node) => (
            <PipelineNode
              key={node.id}
              node={node}
              isActive={node.id === activeNode.id}
              onActivate={() => setActiveNodeId(node.id)}
            />
          ))}
        </div>
      </div>

      <div className="pipeline-explain" aria-live="polite">
        <p className="module-id-small">{activeNode.label}</p>
        <p className="body-copy">{activeNode.what}</p>
        <p className="body-copy pipeline-decision">
          <strong>Decision: </strong>
          {activeNode.decision}
        </p>
      </div>
    </div>
  )
}
