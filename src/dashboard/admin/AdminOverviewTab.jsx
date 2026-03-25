import DashboardMetricCard from '../../components/DashboardMetricCard'
import DashboardPanel from '../../components/DashboardPanel'
import ChartCard from '../../components/ChartCard'
import AnimatedSectionHeader from '../../components/AnimatedSectionHeader'
import ImpactMeterHero from '../../components/ImpactMeterHero'
import PresentationStepper from '../../components/PresentationStepper'
import LeaderboardPodium from '../../components/LeaderboardPodium'

const AdminOverviewTab = ({
  summaryCards,
  featureAdoptionChartData,
  challengeCompletionLevelChartData,
  activityTrendChartData,
  setActiveTab,
  contentDraft,
  adminInsightSimulation,
  leaderboard,
  presentationSteps,
  activePresentationStep,
  setActivePresentationStep,
}) => {
  return (
    <div className="space-y-6">
      <ImpactMeterHero
        title="Control room untuk memantau performa demo secara cepat"
        subtitle="Admin overview"
        value={adminInsightSimulation.projectedEngagement}
        tone="admin"
        caption="Overview admin kini mendorong narasi control room: projected engagement, community pulse, insight simulator, dan langkah presentasi."
        sideContent={
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-slate-300">Features</p>
              <p className="mt-1 text-2xl font-semibold">{contentDraft.featureList.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-slate-300">Challenges</p>
              <p className="mt-1 text-2xl font-semibold">{contentDraft.challengeList.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-slate-300">Estimated lift</p>
              <p className="mt-1 text-2xl font-semibold">{adminInsightSimulation.estimatedLift}</p>
            </div>
          </div>
        }
      />

      <AnimatedSectionHeader
        eyebrow="Admin Overview"
        title="Panel ini bukan sekadar editor, tapi pusat kontrol presentasi"
        description="Gunakan overview untuk menunjukkan bahwa admin bisa membaca perilaku, mensimulasikan strategi, dan mengarahkan narasi demo."
        tone="admin"
        actions={
          <>
            <button
              type="button"
              onClick={() => setActiveTab('users')}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Lihat user detail
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Buka content lab
            </button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <DashboardMetricCard key={item.label} {...item} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <ChartCard
          title="Adopsi fitur per modul"
          description="Jumlah user yang mengaktifkan masing-masing fitur."
          type="bar"
          data={featureAdoptionChartData}
          height={260}
        />
        <ChartCard
          title="Distribusi challenge selesai"
          description="Sebaran penyelesaian challenge berdasarkan level."
          type="doughnut"
          data={challengeCompletionLevelChartData}
          height={260}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <DashboardPanel
          eyebrow="Insight Simulator"
          title="Simulasi perubahan terhadap engagement"
          description="Kontrol room ini memperlihatkan payoff strategis dari perubahan konten dan aktivitas user."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <DashboardMetricCard label="Projected engagement" value={`${adminInsightSimulation.projectedEngagement}%`} tone="cyan" />
            <DashboardMetricCard label="Content pressure" value={`${adminInsightSimulation.contentPressure}%`} tone="orange" />
            <DashboardMetricCard label="Challenge velocity" value={`${adminInsightSimulation.challengeVelocity}%`} tone="violet" />
          </div>
        </DashboardPanel>
        <DashboardPanel
          eyebrow="Presentation Stepper"
          title="Alur demo admin yang lebih tajam"
          description="Stepper ini mengunci flow presentasi agar tidak melebar."
        >
          <PresentationStepper steps={presentationSteps} activeStep={activePresentationStep} onSelect={setActivePresentationStep} />
        </DashboardPanel>
      </div>

      <DashboardPanel
        eyebrow="Weekly pulse"
        title="Tren aktivitas 7 hari"
        description="Frekuensi aktivitas yang dilakukan user di seluruh platform."
      >
        <ChartCard title="Weekly pulse" type="line" data={activityTrendChartData} height={240} />
      </DashboardPanel>

      <DashboardPanel
        eyebrow="Community Snapshot"
        title="Leaderboard dan podium user"
        description="Walau berbasis data lokal, komponen ini menambah rasa kompetisi dan komunitas."
      >
        <LeaderboardPodium leaders={leaderboard} />
      </DashboardPanel>
    </div>
  )
}

export default AdminOverviewTab
