import DashboardMetricCard from '../../components/DashboardMetricCard'
import DashboardPanel from '../../components/DashboardPanel'
import ChartCard from '../../components/ChartCard'
import AnimatedSectionHeader from '../../components/AnimatedSectionHeader'
import ImpactMeterHero from '../../components/ImpactMeterHero'
import MissionCardStack from '../../components/MissionCardStack'
import AchievementShowcase from '../../components/AchievementShowcase'
import EcoJourneyTimeline from '../../components/EcoJourneyTimeline'
import ImpactComparisonCard from '../../components/ImpactComparisonCard'
import StoryCardCarousel from '../../components/StoryCardCarousel'
import PresentationStepper from '../../components/PresentationStepper'

const UserOverviewTab = ({
  user,
  nextAction,
  profilePrefs,
  focusChallenge,
  challengeDetail,
  challengeList,
  setFocusChallengeId,
  updateChallengeProgress,
  quickStats,
  topFeature,
  featureTuning,
  featureInteraction,
  featureList,
  featureRunChartData,
  challengeProgressChartData,
  setActiveTab,
  weeklyMissions,
  smartRecommendation,
  achievements,
  journeyTimeline,
  impactCard,
  impactComparison,
  storyDeck,
  scenarioInfo,
  presentationSteps,
  activePresentationStep,
  setActivePresentationStep,
  presentationMode,
  setSpotlightItem,
  streakScore,
  averageChallengeProgress,
}) => {
  const focusOptions = challengeList.slice(0, 5)

  return (
    <div className="space-y-6">
      <ImpactMeterHero
        title={`Impact meter untuk ${user.name.split(' ')[0]}`}
        subtitle="Overview"
        value={streakScore}
        caption={`Scenario ${scenarioInfo.label.toLowerCase()} membuat rekomendasi, misi mingguan, dan storytelling dashboard terasa lebih personal. ${presentationMode ? 'Presentation mode sedang aktif untuk demo yang lebih bersih.' : ''}`}
        sideContent={
          <>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Aksi berikutnya</p>
            <p className="mt-3 text-lg font-semibold">{nextAction}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-slate-300">Target mingguan</p>
                <p className="mt-1 text-2xl font-semibold">{profilePrefs.weeklyTarget}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-slate-300">Mode fokus</p>
                <p className="mt-1 text-2xl font-semibold capitalize">{profilePrefs.focusMode}</p>
              </div>
            </div>
          </>
        }
      />

      <AnimatedSectionHeader
        eyebrow="Personal Story"
        title={`Selamat datang kembali, ${user.name.split(' ')[0]}.`}
        description="Overview sekarang dirancang sebagai cerita: dampak personal, misi mingguan, rekomendasi cerdas, dan bukti progres dalam satu alur."
        tone="user"
        actions={
          <>
            <button
              type="button"
              onClick={() => setActiveTab('challenges')}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Buka challenge hub
            </button>
            <button
              type="button"
              onClick={() => setSpotlightItem({ title: impactCard.headline, subtitle: impactCard.subtitle, content: impactCard.stats.map((item) => `${item.label}: ${item.value}`).join(' | ') })}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Buka impact card
            </button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((item) => (
          <DashboardMetricCard key={item.label} {...item} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <DashboardPanel
          eyebrow="Personal Impact Card"
          title={impactCard.headline}
          description={`${impactCard.subtitle} dengan ringkasan yang mudah dipakai sebagai output presentasi.`}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {impactCard.stats.map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </DashboardPanel>
        <DashboardPanel
          eyebrow="Smart Recommendation"
          title={smartRecommendation.title}
          description={smartRecommendation.description}
          actions={
            <button
              type="button"
              onClick={() => setActiveTab(smartRecommendation.cta.toLowerCase().includes('challenge') ? 'challenges' : 'features')}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              {smartRecommendation.cta}
            </button>
          }
        >
          <PresentationStepper steps={presentationSteps} activeStep={activePresentationStep} onSelect={setActivePresentationStep} />
        </DashboardPanel>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <DashboardPanel
          eyebrow="Weekly Mission Generator"
          title={`Misi mingguan untuk mode ${scenarioInfo.label}`}
          description={scenarioInfo.tone}
        >
          <MissionCardStack
            missions={weeklyMissions}
            onSelect={(mission) => setSpotlightItem({ title: mission.title, subtitle: 'Weekly mission', content: `${mission.description} Reward: ${mission.reward}. Progress saat ini ${mission.progress}%.` })}
          />
        </DashboardPanel>
        <DashboardPanel
          eyebrow="Story Card Carousel"
          title="Narasi cepat untuk presentasi"
          description="Gunakan card ini untuk membangun alur demo yang tidak terasa seperti dashboard template."
        >
          <StoryCardCarousel stories={storyDeck} />
        </DashboardPanel>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <DashboardPanel
          eyebrow="Pusat Fokus"
          title="Challenge prioritas minggu ini"
          description="Pilih satu challenge sebagai fokus agar ritme mingguan terasa lebih jelas."
        >
          <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-2">
              {focusOptions.map((challenge) => {
                const detail = challengeDetail[challenge.id] || { progress: 0, completed: false }
                return (
                  <button
                    key={challenge.id}
                    type="button"
                    onClick={() => setFocusChallengeId(challenge.id)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      focusChallenge?.id === challenge.id
                        ? 'border-cyan-300 bg-cyan-50'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="line-clamp-2 font-semibold text-slate-900">{challenge.title}</span>
                      <span className="text-xs text-slate-500">{detail.progress}%</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{challenge.level}</p>
                  </button>
                )
              })}
              {challengeList.length > focusOptions.length && (
                <button
                  type="button"
                  onClick={() => setActiveTab('challenges')}
                  className="w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-white"
                >
                  Lihat semua challenge di challenge hub
                </button>
              )}
            </div>

            {focusChallenge && (
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{focusChallenge.level}</p>
                    <h3 className="mt-1 text-2xl font-semibold text-slate-900">{focusChallenge.title}</h3>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                    {focusChallenge.duration}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">{focusChallenge.detail}</p>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                    <span>Progres fokus</span>
                    <span>{challengeDetail[focusChallenge.id]?.progress || 0}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                      style={{ width: `${challengeDetail[focusChallenge.id]?.progress || 0}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => updateChallengeProgress(focusChallenge, (challengeDetail[focusChallenge.id]?.progress || 0) + 15)}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Tambah 15%
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('challenges')}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                  >
                    Buka challenge hub
                  </button>
                </div>
              </div>
            )}
          </div>
        </DashboardPanel>

        <DashboardPanel
          eyebrow="Feature Highlight"
          title="Modul paling sering dipakai"
          description="Pantau fitur yang paling membantu ritme aksimu."
        >
          {topFeature ? (
            <div className="space-y-4">
              <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-cyan-50 to-white p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">Top module</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{topFeature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{topFeature.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    Run {topFeature.runCount}
                  </span>
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                    Tuning {featureTuning[topFeature.id] || 55}%
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {featureList.slice(0, 3).map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <div>
                      <p className="font-semibold text-slate-900">{feature.title}</p>
                      <p className="text-xs text-slate-500">{feature.metric}</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-600">{featureInteraction[feature.id] || 0} run</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Belum ada fitur yang dijalankan.</p>
          )}
        </DashboardPanel>
      </div>

      <DashboardPanel
        eyebrow="Before vs After"
        title="Visual storytelling perubahan habit"
        description="Komparasi cepat ini dirancang agar payoff dari penggunaan produk terasa jelas."
      >
        <ImpactComparisonCard before={impactComparison.before} after={impactComparison.after} />
      </DashboardPanel>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <DashboardPanel
          eyebrow="Eco Journey Timeline"
          title="Perjalanan perubahan dari aksi ke hasil"
          description="Timeline interaktif ini menggabungkan challenge, activity log, dan misi mingguan."
        >
          <EcoJourneyTimeline items={journeyTimeline} />
        </DashboardPanel>
        <DashboardPanel
          eyebrow="Achievement Showcase"
          title="Badge system dengan progress unlock"
          description={`Saat ini rata-rata progres challenge kamu ${averageChallengeProgress}% dengan ${achievements.filter((item) => item.unlocked).length} badge terbuka.`}
        >
          <AchievementShowcase achievements={achievements} />
        </DashboardPanel>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <ChartCard
          title="Pola penggunaan fitur"
          description="Visual cepat untuk melihat modul yang paling aktif kamu gunakan."
          type="bar"
          data={featureRunChartData}
          height={260}
        />
        <ChartCard
          title="Pergerakan progres challenge"
          description="Semakin rata progress antar challenge, semakin stabil ritme aksi harianmu."
          type="line"
          data={challengeProgressChartData}
          height={260}
        />
      </div>
    </div>
  )
}

export default UserOverviewTab
