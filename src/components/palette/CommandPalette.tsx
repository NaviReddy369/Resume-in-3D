import { Command } from 'cmdk'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { useCommandPalette } from '@/hooks/useCommandPalette'
import { navigateActions, projectActions, commandActions, type PaletteAction } from './commandPaletteActions'

const groups: { label: string; actions: PaletteAction[] }[] = [
  { label: 'Navigate', actions: navigateActions },
  { label: 'Projects', actions: projectActions },
  { label: 'Actions', actions: commandActions },
]

export function CommandPalette() {
  useCommandPalette()
  const paletteOpen = useAppStore((s) => s.paletteOpen)
  const setPaletteOpen = useAppStore((s) => s.setPaletteOpen)
  const navigate = useNavigate()
  const location = useLocation()

  function run(action: PaletteAction) {
    action.perform({ navigate, pathname: location.pathname })
    setPaletteOpen(false)
  }

  return (
    <Command.Dialog
      open={paletteOpen}
      onOpenChange={setPaletteOpen}
      label="Command palette"
      className="command-palette"
    >
      <Command.Input placeholder="Jump to a section, project, or action…" />
      <Command.List>
        <Command.Empty>No matches.</Command.Empty>
        {groups.map((group) => (
          <Command.Group key={group.label} heading={group.label}>
            {group.actions.map((action) => (
              <Command.Item
                key={action.id}
                value={`${action.label} ${action.hint ?? ''}`}
                onSelect={() => run(action)}
              >
                <span>{action.label}</span>
                {action.hint && <span className="palette-hint">{action.hint}</span>}
              </Command.Item>
            ))}
          </Command.Group>
        ))}
      </Command.List>
    </Command.Dialog>
  )
}
