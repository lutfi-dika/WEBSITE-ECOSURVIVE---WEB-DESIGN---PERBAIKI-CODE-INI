import { BadgeCheck, Compass, Flame } from 'lucide-react'
import DashboardMetricCard from '../../components/DashboardMetricCard'
import DashboardPanel from '../../components/DashboardPanel'
import AchievementShowcase from '../../components/AchievementShowcase'
import AnimatedSectionHeader from '../../components/AnimatedSectionHeader'

const UserProfileStudioTab = ({
  user,
  profilePrefs,
  setProfilePrefs,
  completedChallenges,
  streakScore,
  activeFeatures,
  totalFeatureRuns,
  achievements,
  impactCard,
  scenarioInfo,
}) => {
  const reminderPreviewMap = {
    ringkas: 'Fokus pada satu aksi kecil hari ini dan cek progres sebelum malam.',
    motivatif: 'Kamu sudah membangun ritme yang bagus. Satu challenge lagi akan memperkuat ceritamu.',
    tegas: 'Jangan biarkan challenge fokus berhenti. Tambahkan progres hari ini juga.',
  }

  return (
    <div className="space-y-5">
      <AnimatedSectionHeader
        eyebrow="Profile Studio"
        title="Personalisasi visual agar user merasa ini benar-benar akunnya"
        description={`Scenario aktif saat ini adalah ${scenarioInfo.label}. Preferensi ini mengubah misi, rekomendasi, dan tone narasi dashboard.`}
        tone="user"
      />

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
      <DashboardPanel
        eyebrow="Profile Studio"
        title="Atur preferensi aksi pribadimu"
        description="Semua preferensi ini disimpan lokal untuk menjaga pengalaman demo tetap personal dan interaktif."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-slate-600">
            Target challenge mingguan
            <input
              type="number"
              min="1"
              max="12"
              value={profilePrefs.weeklyTarget}
              onChange={(event) =>
                setProfilePrefs((prev) => ({ ...prev, weeklyTarget: Number(event.target.value) || 1 }))
              }
              className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="text-sm text-slate-600">
            Focus mode
            <select
              value={profilePrefs.focusMode}
              onChange={(event) => setProfilePrefs((prev) => ({ ...prev, focusMode: event.target.value }))}
              className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
            >
              <option value="impact">Impact</option>
              <option value="consistency">Consistency</option>
              <option value="exploration">Exploration</option>
            </select>
          </label>
          <label className="text-sm text-slate-600">
            Scenario mode
            <select
              value={profilePrefs.scenarioMode}
              onChange={(event) => setProfilePrefs((prev) => ({ ...prev, scenarioMode: event.target.value }))}
              className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="pekerja">Pekerja Kantoran</option>
              <option value="keluarga">Keluarga</option>
            </select>
          </label>
          <label className="text-sm text-slate-600 sm:col-span-2">
            Reminder style
            <div className="mt-2 flex flex-wrap gap-2">
              {['ringkas', 'motivatif', 'tegas'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setProfilePrefs((prev) => ({ ...prev, reminderStyle: item }))}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    profilePrefs.reminderStyle === item
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </label>
          <label className="text-sm text-slate-600 sm:col-span-2">
            Catatan pribadi
            <textarea
              value={profilePrefs.profileNote}
              onChange={(event) => setProfilePrefs((prev) => ({ ...prev, profileNote: event.target.value }))}
              rows={4}
              className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
            />
          </label>
        </div>
      </DashboardPanel>

      <div className="space-y-5">
        <DashboardPanel
          eyebrow="Profile Snapshot"
          title="Ringkasan akun"
          description="Kesan personal yang lebih hidup untuk membuat dashboard tidak terasa kaku."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Nama</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{user.name}</p>
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Email</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{user.email}</p>
            </div>
            <div className="rounded-[1.5rem] bg-cyan-50 p-5 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.16em] text-cyan-700">Catatan fokus</p>
              <p className="mt-2 text-sm leading-relaxed text-cyan-900">{profilePrefs.profileNote}</p>
            </div>
            <div className="rounded-[1.5rem] bg-slate-900 p-5 text-white sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">{impactCard.subtitle}</p>
              <p className="mt-2 text-xl font-semibold">{impactCard.headline}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {impactCard.stats.slice(0, 2).map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs text-white/60">{item.label}</p>
                    <p className="mt-1 font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel
          eyebrow="Reminder Preview"
          title="Preview gaya pengingat"
          description="Microcopy ini membantu role user terasa lebih personal saat dipresentasikan."
        >
          <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-900 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Current tone</p>
              <p className="mt-2 text-2xl font-semibold capitalize">{profilePrefs.reminderStyle}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{reminderPreviewMap[profilePrefs.reminderStyle]}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Fitur aktif</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{activeFeatures}</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Total run</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{totalFeatureRuns}</p>
              </div>
            </div>
          </div>
        </DashboardPanel>

        <div className="grid gap-4 sm:grid-cols-3">
          <DashboardMetricCard
            label="Badge"
            value={completedChallenges >= 3 ? 'Eco Pro' : 'Starter'}
            hint="Badge berubah mengikuti progres challenge."
            tone="emerald"
            icon={BadgeCheck}
          />
          <DashboardMetricCard
            label="Rekomendasi"
            value={profilePrefs.focusMode}
            hint={`Gaya pengingat: ${profilePrefs.reminderStyle}`}
            tone="violet"
            icon={Compass}
          />
          <DashboardMetricCard
            label="Momentum"
            value={`${streakScore}%`}
            hint="Pertahankan progres rata-rata di atas 70%."
            tone="orange"
            icon={Flame}
          />
        </div>
      </div>
      </div>

      <DashboardPanel
        eyebrow="Achievement System"
        title="Showcase badge dengan rarity dan unlock progress"
        description="Sistem reward ini menjadi payoff visual utama untuk profile studio."
      >
        <AchievementShowcase achievements={achievements} />
      </DashboardPanel>
    </div>
  )
}

export default UserProfileStudioTab
