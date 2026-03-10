import React from 'react'
import { Tooltip } from 'primereact/tooltip'

interface AiHelperButtonProps {
  onClick: () => void
}

const AiHelperButton: React.FC<AiHelperButtonProps> = ({ onClick }) => {
  return (
    <>
      <Tooltip target=".ai-helper-btn" content="AI 小幫手" position="top" />
      <button
        type="button"
        className="ai-helper-btn"
        onClick={onClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 4,
          marginBottom: 8,
          fontSize: 18,
          color: '#791887',
          lineHeight: 1,
        }}
      >
        <i className="fa-solid fa-robot" />
      </button>
    </>
  )
}

export default AiHelperButton
