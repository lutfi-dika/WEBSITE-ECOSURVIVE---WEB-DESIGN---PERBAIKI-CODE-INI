import { useMemo, useState } from 'react'
import DashboardMetricCard from '../../components/DashboardMetricCard'
import DashboardPanel from '../../components/DashboardPanel'
import PaginationControls from '../../components/PaginationControls'
import { Target } from 'lucide-react'
import AnimatedSectionHeader from '../../components/AnimatedSectionHeader'
import MissionCardStack from '../../components/MissionCardStack'
import EcoJourneyTimeline from '../../components/EcoJourneyTimeline'
import EmptyStatePremium from '../../components/EmptyStatePremium'

const UserChallengeHubTab = ({
  challengeFilter,
  setChallengeFilter,
  filteredChallenges,
  challengeDetail,
  focusChallengeId,
  setFocusChallengeId,
  updateChallengeProgress,
  averageChallengeProgress,
  focusChallenge,
  challengeList,
  completedChallenges,
  inProgressChallenges,
  weeklyMissions,
  journeyTimeline,
  setSpotlightItem,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(filteredChallenges.length / pageSize))
  const activePage = Math.min(currentPage, totalPages)
  const paginatedChallenges = useMemo(
    () => filteredChallenges.slice((activePage - 1) * pageSize, activePage * pageSize),
    [activePage, filteredChallenges],
  )

  return (
    <div className="space-y-5">
      <AnimatedSectionHeader
        eyebrow="Challenge Hub"
        title="Challenge sekarang terasa seperti sistem reward, bukan list statis"
        description="Filter, focus state, mission stack, dan timeline dipakai untuk menambah payoff visual."
        tone="user"
      />
      <DashboardPanel
        eyebrow="Challenge Hub"
        title="Kelola ritme challenge dengan filter yang lebih hidup"
        description="Pilih view yang kamu butuhkan: semua, aktif, selesai, belum mulai, atau level dampak tinggi."
        actions={
          <>
            {['all', 'active', 'completed', 'not-started', 'impact'].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setChallengeFilter(filter)}
                className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  challengeFilter === filter
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Visible challenges</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{filteredChallenges.length}</p>
            <p className="mt-1 text-sm text-slate-600">Dari total {challengeList.length} challenge yang tersedia.</p>
          </div>
          <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Completed</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{completedChallenges}</p>
            <p className="mt-1 text-sm text-slate-600">Challenge yang sudah kamu tuntaskan sepenuhnya.</p>
          </div>
          <div className="rounded-[1.5rem] border border-amber-100 bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">In progress</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{inProgressChallenges}</p>
            <p className="mt-1 text-sm text-slate-600">Challenge yang sedang bergerak menuju selesai.</p>
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel
        eyebrow="Challenge Flow"
        title="Kelola progres dan fokus mingguan"
        description="Setiap card dirancang sebagai mini page yang bisa didemokan secara mandiri."
      >
        <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4">
            {paginatedChallenges.map((challenge) => {
              const detail = challengeDetail[challenge.id] || { progress: 0, completed: false, updatedAt: null }
              const isFocus = focusChallengeId === challenge.id

              return (
                <article key={challenge.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {challenge.level}
                        </span>
                        {detail.completed && (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Selesai
                          </span>
                        )}
                        {isFocus && (
                          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                            Fokus mingguan
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-slate-900">{challenge.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{challenge.description}</p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{challenge.duration}</p>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                      <span>Progres challenge</span>
                      <span>{detail.progress}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                        style={{ width: `${detail.progress}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={detail.progress}
                      onChange={(event) => updateChallengeProgress(challenge, event.target.value)}
                      className="mt-4 w-full accent-cyan-600"
                    />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => updateChallengeProgress(challenge, detail.progress + 10)}
                      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      +10 progres
                    </button>
                    <button
                      type="button"
                      onClick={() => updateChallengeProgress(challenge, 100)}
                      className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Tandai selesai
                    </button>
                    <button
                      type="button"
                      onClick={() => setFocusChallengeId(challenge.id)}
                      className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Jadikan fokus
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpotlightItem({ title: challenge.title, subtitle: challenge.level, content: `${challenge.detail} Impact: ${challenge.impact}. Progres saat ini ${detail.progress}%.` })}
                      className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100"
                    >
                      Detail
                    </button>
                  </div>
                </article>
              )
            })}
            {paginatedChallenges.length === 0 && (
              <EmptyStatePremium
                title="Tidak ada challenge pada filter ini"
                description="Ganti filter untuk melihat kembali challenge aktif atau challenge yang cocok untuk spotlight mingguan."
              />
            )}
          </div>

          <div className="space-y-4">
            <DashboardMetricCard
              label="Progress rata-rata"
              value={`${averageChallengeProgress}%`}
              hint="Menunjukkan ritme kamu di seluruh challenge."
              tone="cyan"
              progress={averageChallengeProgress}
              icon={Target}
            />
            <DashboardPanel
              eyebrow="Impact notes"
              title="Alasan challenge ini penting"
              description={focusChallenge?.impact || 'Pilih challenge fokus untuk membaca impact note.'}
            >
              <div className="space-y-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Fokus sekarang</p>
                  <p className="mt-1 font-semibold text-slate-900">{focusChallenge?.title || '-'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Rekomendasi</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Pertahankan minimal satu challenge fokus aktif agar dashboard kamu terasa lebih terarah saat dinilai.
                  </p>
                </div>
              </div>
            </DashboardPanel>
            <DashboardPanel
              eyebrow="Mission Stack"
              title="Misi pendamping challenge"
              description="Generator ini menjaga challenge hub tetap terasa aktif walau data masih lokal."
            >
              <MissionCardStack missions={weeklyMissions} onSelect={(mission) => setSpotlightItem({ title: mission.title, subtitle: 'Mission support', content: mission.description })} />
            </DashboardPanel>
          </div>
          <div className="space-y-5 xl:col-span-2">
            <DashboardPanel
              eyebrow="Interactive Timeline"
              title="Jejak progres challenge"
              description="Kronologi ini membantu juri membaca perubahan dari challenge ke aktivitas harian."
            >
              <EcoJourneyTimeline items={journeyTimeline.slice(0, 5)} />
            </DashboardPanel>
            <PaginationControls
              currentPage={activePage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemLabel="challenge"
              totalItems={filteredChallenges.length}
            />
          </div>
        </div>
      </DashboardPanel>
    </div>
  )
}

export default UserChallengeHubTab
