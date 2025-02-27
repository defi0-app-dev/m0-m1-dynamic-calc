import { toggleMode } from '../utils/toggleMode'

export const ModeToggle = () => {
  return (
    <div className="mode-toggles">
      <button
        type="button"
        onClick={() => toggleMode('simple')}
        className="mode-toggle"
      >
        Simple Mode
      </button>
      <button
        type="button"
        onClick={() => toggleMode('expert')}
        className="mode-toggle"
      >
        Expert Mode
      </button>
    </div>
  )
}
