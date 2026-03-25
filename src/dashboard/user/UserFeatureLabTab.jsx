import { useMemo, useState } from 'react'
import clsx from 'clsx'
import DashboardPanel from '../../components/DashboardPanel'
import PaginationControls from '../../components/PaginationControls'
import AnimatedSectionHeader from '../../components/AnimatedSectionHeader'
import EmptyStatePremium from '../../components/EmptyStatePremium'

const UserFeatureLabTab = ({
  featureSearch,
  setFeatureSearch,
  filteredFeatures,
  featureUsage,
  featureInteraction,
  featureTuning,
  setFeatureTuning,
  toggleFeatureUsage,
  runFeature,
  featureList,
  activeFeatures,
  totalFeatureRuns,
  setSpotlightItem,
  smartRecommendation,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(filteredFeatures.length / pageSize))
  const activePage = Math.min(currentPage, totalPages)
  const paginatedFeatures = useMemo(
    () => filteredFeatures.slice((activePage - 1) * pageSize, activePage * pageSize),
    [activePage, filteredFeatures],
  )
  const spotlightFeature = filteredFeatures[0]

  return (
    <div className="space-y-5">
      <AnimatedSectionHeader
        eyebrow="Feature Lab"
        title="Setiap feature punya state, spotlight, dan simulasi yang lebih khas"
        description={smartRecommendation.description}
        tone="user"
      />
      <DashboardPanel
        eyebrow="Feature Lab"
        title="Eksplorasi fitur secara lebih hidup"
        description="Setiap modul punya tuning intensity agar demo terasa lebih interaktif daripada sekadar tombol on atau off."
        actions={
          <input
            value={featureSearch}
            onChange={(event) => setFeatureSearch(event.target.value)}
            placeholder="Cari fitur..."
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-cyan-500"
          />
        }
      >
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Active modules</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{activeFeatures}</p>
              <p className="mt-1 text-sm text-slate-600">Dari total {featureList.length} modul interaktif.</p>
            </div>
            <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Simulation runs</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{totalFeatureRuns}</p>
              <p className="mt-1 text-sm text-slate-600">Semakin tinggi, semakin hidup demonya.</p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Search result</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{filteredFeatures.length}</p>
              <p className="mt-1 text-sm text-slate-600">Modul yang cocok dengan filter saat ini.</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-900 p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Spotlight module</p>
            <h3 className="mt-2 text-2xl font-semibold">{spotlightFeature?.title || 'Belum ada hasil pencarian'}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {spotlightFeature?.description || 'Ubah pencarian untuk menampilkan fitur yang ingin kamu sorot saat presentasi.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                Runs {spotlightFeature ? featureInteraction[spotlightFeature.id] || 0 : 0}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                Tuning {spotlightFeature ? featureTuning[spotlightFeature.id] || 55 : 0}%
              </span>
            </div>
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel
        eyebrow="Simulation Grid"
        title="Cards interaktif untuk seluruh modul"
        description="Gunakan boost, toggle, dan simulasi untuk membangun ritme demo yang lebih meyakinkan."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {paginatedFeatures.map((feature) => {
          const isActive = Boolean(featureUsage[feature.id])
          const runCount = featureInteraction[feature.id] || 0
          const tuning = featureTuning[feature.id] || 55

          return (
            <article key={feature.id} className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
                </div>
                <span className={clsx(
                  'rounded-full px-3 py-1 text-xs font-semibold',
                  isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700',
                )}>
                  {isActive ? 'Aktif' : 'Standby'}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Runs</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{runCount}</p>
                </div>
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Tuning</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{tuning}%</p>
                </div>
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Metric</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{feature.metric}</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Intensity simulator</span>
                  <span>{tuning}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={tuning}
                  onChange={(event) =>
                    setFeatureTuning((prev) => ({
                      ...prev,
                      [feature.id]: Number(event.target.value),
                    }))
                  }
                  className="w-full accent-cyan-600"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => toggleFeatureUsage(feature)}
                  className={clsx(
                    'rounded-full px-4 py-2 text-sm font-semibold transition',
                    isActive ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'bg-slate-900 text-white hover:bg-slate-800',
                  )}
                >
                  {isActive ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
                <button
                  type="button"
                  onClick={() => runFeature(feature)}
                  className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                >
                  Simulasikan
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSpotlightItem({
                      title: feature.title,
                      subtitle: 'Feature spotlight',
                      content: `${feature.description} Metric: ${feature.metric}. Total run: ${runCount}. Tuning: ${tuning}%.`,
                    })}
                  className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100"
                >
                  Spotlight
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFeatureTuning((prev) => ({
                      ...prev,
                      [feature.id]: Math.min(100, (prev[feature.id] || 55) + 10),
                    }))
                  }
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                  Boost +10
                </button>
              </div>
            </article>
          )
          })}
          {filteredFeatures.length === 0 && (
            <div className="xl:col-span-2">
              <EmptyStatePremium
                title="Belum ada modul yang cocok"
                description="Ubah kata kunci pencarian atau buka kembali semua feature untuk meneruskan demo."
              />
            </div>
          )}
        </div>
        <PaginationControls
          currentPage={activePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemLabel="fitur"
          totalItems={filteredFeatures.length}
        />
      </DashboardPanel>
    </div>
  )
}

export default UserFeatureLabTab
