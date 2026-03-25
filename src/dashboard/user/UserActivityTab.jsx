import { useMemo, useState } from 'react'
import clsx from 'clsx'
import ChartCard from '../../components/ChartCard'
import DashboardPanel from '../../components/DashboardPanel'
import PaginationControls from '../../components/PaginationControls'
import AnimatedSectionHeader from '../../components/AnimatedSectionHeader'
import EcoJourneyTimeline from '../../components/EcoJourneyTimeline'
import EmptyStatePremium from '../../components/EmptyStatePremium'

const UserActivityTab = ({
  activityFilter,
  setActivityFilter,
  selectedActivityType,
  setSelectedActivityType,
  recentActivityChartData,
  filteredActivities,
  formatDateTime,
  userActivities,
  journeyTimeline,
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
  const featureActivities = userActivities.filter((activity) => activity.type.startsWith('feature')).length
  const challengeActivities = userActivities.filter((activity) => activity.type.startsWith('challenge')).length

  return (
    <div className="space-y-5">
      <AnimatedSectionHeader
        eyebrow="Activity Feed"
        title="Feed dibuat lebih hidup dengan grouping, highlight, dan timeline"
        description="Tab ini sekarang tidak hanya menampilkan log, tetapi juga ritme perilaku dan kronologi perubahan."
        tone="user"
      />
      <DashboardPanel
        eyebrow="Activity Feed"
        title="Riwayat aksi dengan filter yang lebih tajam"
        description="Pisahkan aktivitas berdasarkan sumbernya untuk membaca perilaku akun dengan cepat."
        actions={
          <>
            {['all', 'recent', 'feature', 'challenge'].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActivityFilter(filter)}
                className={clsx(
                  'rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition',
                  activityFilter === filter ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                )}
              >
                {filter}
              </button>
            ))}
          </>
        }
      >
        <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Total logs</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{userActivities.length}</p>
              <p className="mt-1 text-sm text-slate-600">Seluruh aktivitas yang tersimpan di workspace kamu.</p>
            </div>
            <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Feature logs</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{featureActivities}</p>
              <p className="mt-1 text-sm text-slate-600">Interaksi dari feature lab dan simulasi modul.</p>
            </div>
            <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Challenge logs</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{challengeActivities}</p>
              <p className="mt-1 text-sm text-slate-600">Pergerakan progres dari challenge hub.</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-900 p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Latest spotlight</p>
            <h3 className="mt-2 text-2xl font-semibold">{latestActivity?.title || 'Belum ada aktivitas'}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {latestActivity?.description || 'Jalankan fitur atau mulai challenge agar feed aktivitas mulai terisi.'}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-400">
              {latestActivity ? formatDateTime(latestActivity.createdAt) : 'No activity yet'}
            </p>
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel
        eyebrow="Activity Stream"
        title="Feed harian dan filter perilaku"
        description="Dirancang agar user journey setelah login terasa aktif, bukan diam."
      >
        <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-4">
          <ChartCard
            title="Aktivitas 7 hari terakhir"
            description="Jumlah aksi yang kamu lakukan setiap hari."
            type="bar"
            data={recentActivityChartData}
            height={220}
          />

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'feature', label: 'Feature' },
              { id: 'challenge', label: 'Challenge' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedActivityType(item.id)}
                className={clsx(
                  'rounded-2xl border px-4 py-3 text-sm font-semibold transition',
                  selectedActivityType === item.id
                    ? 'border-cyan-300 bg-cyan-50 text-cyan-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white">
          {filteredActivities.length === 0 ? (
            <div className="p-5">
              <EmptyStatePremium
                title="Belum ada aktivitas untuk filter ini"
                description="Coba jalankan fitur atau mulai challenge baru agar feed kembali aktif."
              />
            </div>
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
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{activity.description}</p>
                    </div>
                    <span className="text-xs text-slate-500">{formatDateTime(activity.createdAt)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="xl:col-span-2">
          <DashboardPanel
            eyebrow="Timeline View"
            title="Journey highlight"
            description="Peristiwa terbaru dikelompokkan ulang menjadi narasi yang lebih mudah dipresentasikan."
            className="mb-5"
          >
            <EcoJourneyTimeline items={journeyTimeline.slice(0, 6)} />
          </DashboardPanel>
          <PaginationControls
            currentPage={activePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemLabel="aktivitas"
            totalItems={filteredActivities.length}
          />
        </div>
        </div>
      </DashboardPanel>
    </div>
  )
}

export default UserActivityTab
