import { useMemo, useState } from 'react'
import clsx from 'clsx'
import DashboardPanel from '../../components/DashboardPanel'
import PaginationControls from '../../components/PaginationControls'

const AdminActivityTab = ({
  selectedEmail,
  setSelectedEmail,
  users,
  activityTypeFilter,
  setActivityTypeFilter,
  filteredActivities,
  formatDateTime,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / pageSize))
  const activePage = Math.min(currentPage, totalPages)
  const paginatedActivities = useMemo(
    () => filteredActivities.slice((activePage - 1) * pageSize, activePage * pageSize),
    [activePage, filteredActivities],
  )
  const latestActivity = filteredActivities[0]
  const featureCount = filteredActivities.filter((activity) => activity.type.startsWith('feature')).length
  const challengeCount = filteredActivities.filter((activity) => activity.type.startsWith('challenge')).length

  return (
    <div className="space-y-5">
      <DashboardPanel
        eyebrow="User Activity"
        title="Aktivitas user terbaru"
        description="Filter aktivitas berdasarkan user dan tipe interaksi untuk membaca perilaku dengan lebih terarah."
        actions={
          <>
            <select
              value={selectedEmail}
              onChange={(event) => setSelectedEmail(event.target.value)}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
            >
              <option value="semua">Semua user</option>
              {users.map((user) => (
                <option key={user.email} value={user.email}>
                  {user.name}
                </option>
              ))}
            </select>
            {['all', 'feature', 'challenge'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActivityTypeFilter(type)}
                className={clsx(
                  'rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition',
                  activityTypeFilter === type
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                )}
              >
                {type}
              </button>
            ))}
          </>
        }
      >
        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Filtered logs</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{filteredActivities.length}</p>
            </div>
            <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Feature logs</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{featureCount}</p>
            </div>
            <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Challenge logs</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{challengeCount}</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-900 p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">Activity spotlight</p>
            <h3 className="mt-2 text-2xl font-semibold">{latestActivity?.title || 'Belum ada aktivitas'}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {latestActivity?.description || 'Aktivitas user akan tampil di sini setelah ada interaksi di dashboard.'}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-400">
              {latestActivity ? `${latestActivity.email} | ${formatDateTime(latestActivity.createdAt)}` : 'No spotlight'}
            </p>
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel
        eyebrow="Activity Stream"
        title="Timeline eksplorasi pengguna"
        description="Membantu admin menunjukkan bahwa dashboard punya lapisan monitoring, bukan hanya visual statis."
      >
        <div className="rounded-[1.5rem] border border-slate-200 bg-white">
        {filteredActivities.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-500">Belum ada aktivitas untuk filter yang dipilih.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {paginatedActivities.map((activity) => (
              <li key={activity.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                        {activity.type}
                      </span>
                      <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{activity.description}</p>
                    <p className="mt-1 text-xs text-slate-500">{activity.email}</p>
                  </div>
                  <span className="text-xs text-slate-500">{formatDateTime(activity.createdAt)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        </div>
        <PaginationControls
          currentPage={activePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemLabel="aktivitas"
          totalItems={filteredActivities.length}
        />
      </DashboardPanel>
    </div>
  )
}

export default AdminActivityTab
