import React from 'react'

const Header = () => {
  return (
    /* Minimal header bar — typography only, no heavy backgrounds */
    <div className="border-b border-surface/50 px-8 py-4">
      <h1 className="font-display text-lg font-semibold text-textdark tracking-tight">
        Prompt<span className="text-primary">Forge</span>
      </h1>
    </div>
  )
}

export default Header
