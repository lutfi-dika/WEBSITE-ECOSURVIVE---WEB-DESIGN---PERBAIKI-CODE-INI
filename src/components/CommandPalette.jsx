import { Search } from 'lucide-react'

const CommandPalette = ({ isOpen, query, setQuery, commands, onClose, onSelect }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.8)]" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <Search className="text-slate-400" size={18} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari tab, aksi, atau presentasi step..."
            className="w-full bg-transparent text-sm text-slate-900 outline-none"
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-3">
          {commands.length > 0 ? (
            <div className="space-y-2">
              {commands.map((command) => (
                <button
                  key={command.id}
                  type="button"
                  onClick={() => onSelect(command)}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition hover:bg-slate-50"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{command.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{command.group}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{command.shortcut}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="px-3 py-8 text-center text-sm text-slate-500">Tidak ada command yang cocok.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
