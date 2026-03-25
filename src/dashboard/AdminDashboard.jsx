import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import {
  BarChart3,
  LayoutPanelTop,
  RefreshCw,
  Settings2,
  Users,
} from 'lucide-react'
import ChartCard from '../components/ChartCard'
import DashboardSidebar from '../components/DashboardSidebar'
import { getManagedContent, resetManagedContent, saveManagedContent } from '../utils/contentManager'
import {
  getAllChallengeProgress,
  getAllFeatureInteraction,
  getAllFeatureUsage,
  getAllUserActivities,
  getUsers,
} from '../utils/storage'

const adminTabs = [
  { id: 'overview', label: 'Overview', icon: LayoutPanelTop },
  { id: 'activity', label: 'User Activity', icon: BarChart3 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'content', label: 'Content Manager', icon: Settings2 },
]

const adminSidebarSize = {
  widthClass: 'lg:w-[300px]',
  stickyTopClass: 'lg:top-6',
  stickyHeightClass: 'lg:h-[calc(100vh-10rem)]',
}

const formatDateTime = (isoString) => {
  if (!isoString) return '-'

  return new Date(isoString).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const toSlug = (value) => {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

const createFeatureDraft = () => ({
  id: `feature-${Date.now().toString(36)}`,
  title: 'Fitur Baru',
  description: 'Deskripsi fitur baru.',
  metric: 'Metrik fitur',
  accent: 'from-cyan-500 to-blue-500',
})

const createChallengeDraft = () => ({
  id: `challenge-${Date.now().toString(36)}`,
  title: 'Challenge Baru',
  description: 'Deskripsi challenge baru.',
  level: 'Beginner',
  duration: '7 hari',
  impact: 'Dampak challenge',
  detail: 'Detail challenge.',
})

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [activityReferenceTime, setActivityReferenceTime] = useState(() => new Date().getTime())
  const [contentDraft, setContentDraft] = useState(() => getManagedContent())
  const [savedMessage, setSavedMessage] = useState('')
  const [selectedEmail, setSelectedEmail] = useState('semua')

  const users = getUsers()
  const nonAdminUsers = useMemo(() => users.filter((user) => user.role !== 'admin'), [users])

  const allFeatureUsage = getAllFeatureUsage()
  const allFeatureInteraction = getAllFeatureInteraction()
  const allChallengeProgress = getAllChallengeProgress()
  const allUserActivities = getAllUserActivities()

  const activeUsersSevenDays = useMemo(() => {
    const active = new Set()
    const now = activityReferenceTime

    Object.entries(allUserActivities).forEach(([email, activities]) => {
      const hasRecentActivity = activities.some((activity) => {
        const dayDiff = Math.floor((now - new Date(activity.createdAt).getTime()) / (1000 * 60 * 60 * 24))
        return dayDiff >= 0 && dayDiff < 7
      })

      if (hasRecentActivity) {
        active.add(email)
      }
    })

    return active.size
  }, [activityReferenceTime, allUserActivities])

  const totalFeatureRuns = useMemo(() => {
    return Object.values(allFeatureInteraction).reduce((total, perUser) => {
      return total + Object.values(perUser).reduce((sum, count) => sum + (Number(count) || 0), 0)
    }, 0)
  }, [allFeatureInteraction])

  const totalCompletedChallenges = useMemo(() => {
    return Object.values(allChallengeProgress).reduce((total, perUserProgress) => {
      return total + Object.values(perUserProgress).filter(Boolean).length
    }, 0)
  }, [allChallengeProgress])

  const flattenedActivities = useMemo(() => {
    return Object.entries(allUserActivities)
      .flatMap(([email, activities]) =>
        activities.map((activity) => ({
          ...activity,
          email,
        })),
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [allUserActivities])

  const filteredActivities = useMemo(() => {
    if (selectedEmail === 'semua') return flattenedActivities
    return flattenedActivities.filter((activity) => activity.email === selectedEmail)
  }, [flattenedActivities, selectedEmail])

  const featureAdoptionChartData = useMemo(
    () => ({
      labels: contentDraft.featureList.map((feature) => feature.title),
      datasets: [
        {
          label: 'Jumlah user mengaktifkan fitur',
          data: contentDraft.featureList.map((feature) =>
            Object.values(allFeatureUsage).filter((perUserUsage) => perUserUsage[feature.id]).length,
          ),
          backgroundColor: ['#0ea5e9', '#fb923c', '#22c55e', '#a855f7', '#e879f9', '#6366f1'],
          borderRadius: 10,
          maxBarThickness: 36,
        },
      ],
    }),
    [allFeatureUsage, contentDraft.featureList],
  )

  const challengeCompletionLevelChartData = useMemo(() => {
    const challengeMap = Object.fromEntries(contentDraft.challengeList.map((challenge) => [challenge.id, challenge]))

    const levelCounts = {
      Beginner: 0,
      Healthy: 0,
      Intermediate: 0,
      Wellness: 0,
      Impact: 0,
    }

    Object.values(allChallengeProgress).forEach((perUserProgress) => {
      Object.entries(perUserProgress).forEach(([challengeId, completed]) => {
        if (!completed) return

        const challenge = challengeMap[challengeId]
        if (!challenge) return

        levelCounts[challenge.level] = (levelCounts[challenge.level] || 0) + 1
      })
    })

    return {
      labels: Object.keys(levelCounts),
      datasets: [
        {
          label: 'Challenge selesai',
          data: Object.values(levelCounts),
          backgroundColor: ['#34d399', '#22d3ee', '#fb923c', '#e879f9', '#a78bfa'],
          borderWidth: 0,
        },
      ],
    }
  }, [allChallengeProgress, contentDraft.challengeList])

  const activityTrendChartData = useMemo(() => {
    const labels = Array.from({ length: 7 }, (_, index) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - index))
      return date.toLocaleDateString('id-ID', { weekday: 'short' })
    })

    const counts = Array.from({ length: 7 }, () => 0)

    flattenedActivities.forEach((activity) => {
      const activityDate = new Date(activity.createdAt)
      const dayDiff = Math.floor((activityReferenceTime - activityDate.getTime()) / (1000 * 60 * 60 * 24))

      if (dayDiff >= 0 && dayDiff < 7) {
        counts[6 - dayDiff] += 1
      }
    })

    return {
      labels,
      datasets: [
        {
          label: 'Aktivitas user',
          data: counts,
          borderColor: '#0284c7',
          backgroundColor: 'rgba(2,132,199,0.2)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#f97316',
          pointRadius: 4,
        },
      ],
    }
  }, [activityReferenceTime, flattenedActivities])

  const axisOptions = useMemo(
    () => ({
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(148,163,184,0.25)' },
          ticks: { color: '#475569' },
        },
        x: {
          grid: { display: false },
          ticks: { color: '#475569' },
        },
      },
    }),
    [],
  )

  const updateFeatureField = (index, field, value) => {
    setContentDraft((prev) => {
      const nextList = [...prev.featureList]
      const current = nextList[index]
      nextList[index] = {
        ...current,
        [field]: value,
      }

      if (field === 'title') {
        nextList[index].id = current.id?.startsWith('feature-') ? `feature-${toSlug(value) || Date.now().toString(36)}` : current.id
      }

      return {
        ...prev,
        featureList: nextList,
      }
    })
  }

  const updateChallengeField = (index, field, value) => {
    setContentDraft((prev) => {
      const nextList = [...prev.challengeList]
      const current = nextList[index]
      nextList[index] = {
        ...current,
        [field]: value,
      }

      if (field === 'title') {
        nextList[index].id = current.id?.startsWith('challenge-') ? `challenge-${toSlug(value) || Date.now().toString(36)}` : current.id
      }

      return {
        ...prev,
        challengeList: nextList,
      }
    })
  }

  const removeFeature = (index) => {
    setContentDraft((prev) => ({
      ...prev,
      featureList: prev.featureList.filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const removeChallenge = (index) => {
    setContentDraft((prev) => ({
      ...prev,
      challengeList: prev.challengeList.filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const addFeature = () => {
    setContentDraft((prev) => ({
      ...prev,
      featureList: [...prev.featureList, createFeatureDraft()],
    }))
  }

  const addChallenge = () => {
    setContentDraft((prev) => ({
      ...prev,
      challengeList: [...prev.challengeList, createChallengeDraft()],
    }))
  }

  const handleSaveContent = () => {
    const saved = saveManagedContent(contentDraft)
    setContentDraft(saved)
    setSavedMessage(`Konten tersimpan (${formatDateTime(saved.updatedAt)}).`)
  }

  const handleResetContent = () => {
    const reset = resetManagedContent()
    setContentDraft(reset)
    setSavedMessage('Konten direset ke default.')
  }

  const refreshDashboardData = () => {
    setActivityReferenceTime(new Date().getTime())
    setContentDraft(getManagedContent())
    setSavedMessage('Ringkasan data diperbarui.')
  }

  const sidebarStats = [
    { label: 'Total user', value: nonAdminUsers.length },
    { label: 'User aktif 7 hari', value: activeUsersSevenDays },
    { label: 'Total run fitur', value: totalFeatureRuns },
    { label: 'Challenge selesai', value: totalCompletedChallenges },
  ]

  return (
    <section className="px-4 pb-8 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_90px_-60px_rgba(15,23,42,0.75)]">
        <div className="min-h-[72vh] lg:flex">
          <DashboardSidebar
            label="Panel pengelola"
            title="Admin Dashboard"
            subtitle="Monitor aktivitas user dan kelola konten."
            tabs={adminTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            statsTitle="Ringkasan cepat"
            stats={sidebarStats}
            onLogout={onLogout}
            logoutLabel="Keluar admin"
            size={adminSidebarSize}
          />

          <div className="min-w-0 flex-1 bg-gradient-to-b from-slate-50 to-white p-5 sm:p-8">
            <Motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Admin Workspace</p>
                  <h1 className="mt-1 text-3xl font-semibold text-slate-900">Kelola data platform EcoSurvive</h1>
                </div>
                <button
                  type="button"
                  onClick={refreshDashboardData}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  <RefreshCw size={15} />
                  Refresh data
                </button>
              </div>

              {savedMessage && (
                <p className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-700">
                  {savedMessage}
                </p>
              )}

              {activeTab === 'overview' && (
                <>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <p className="text-sm text-slate-500">Total user</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-900">{nonAdminUsers.length}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <p className="text-sm text-slate-500">User aktif 7 hari</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-900">{activeUsersSevenDays}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <p className="text-sm text-slate-500">Total run fitur</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-900">{totalFeatureRuns}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <p className="text-sm text-slate-500">Challenge selesai</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-900">{totalCompletedChallenges}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 xl:grid-cols-2">
                    <ChartCard
                      title="Adopsi fitur per modul"
                      description="Jumlah user yang mengaktifkan masing-masing fitur."
                      type="bar"
                      data={featureAdoptionChartData}
                      options={axisOptions}
                      height={260}
                    />
                    <ChartCard
                      title="Distribusi challenge selesai"
                      description="Sebaran penyelesaian challenge berdasarkan level."
                      type="doughnut"
                      data={challengeCompletionLevelChartData}
                      options={{ plugins: { legend: { position: 'bottom' } } }}
                      height={260}
                    />
                  </div>

                  <ChartCard
                    title="Tren aktivitas 7 hari"
                    description="Frekuensi aktivitas yang dilakukan user di seluruh platform."
                    type="line"
                    data={activityTrendChartData}
                    options={axisOptions}
                    height={220}
                  />
                </>
              )}

              {activeTab === 'activity' && (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-2xl font-semibold text-slate-900">Aktivitas user terbaru</h2>
                    <select
                      value={selectedEmail}
                      onChange={(event) => setSelectedEmail(event.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                    >
                      <option value="semua">Semua user</option>
                      {nonAdminUsers.map((user) => (
                        <option key={user.email} value={user.email}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white">
                    {filteredActivities.length === 0 ? (
                      <p className="px-5 py-6 text-sm text-slate-500">Belum ada aktivitas untuk filter yang dipilih.</p>
                    ) : (
                      <ul className="divide-y divide-slate-200">
                        {filteredActivities.slice(0, 40).map((activity) => (
                          <li key={activity.id} className="px-5 py-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                                <p className="mt-1 text-sm text-slate-600">{activity.description}</p>
                                <p className="mt-1 text-xs text-slate-500">{activity.email}</p>
                              </div>
                              <span className="text-xs text-slate-500">{formatDateTime(activity.createdAt)}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'users' && (
                <>
                  <h2 className="text-2xl font-semibold text-slate-900">Ringkasan per user</h2>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table className="min-w-full text-sm">
                      <thead className="bg-slate-50 text-left text-slate-600">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Nama</th>
                          <th className="px-4 py-3 font-semibold">Email</th>
                          <th className="px-4 py-3 font-semibold">Fitur aktif</th>
                          <th className="px-4 py-3 font-semibold">Challenge selesai</th>
                          <th className="px-4 py-3 font-semibold">Aktivitas terakhir</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {nonAdminUsers.map((user) => {
                          const featureUsage = allFeatureUsage[user.email] || {}
                          const challengeProgress = allChallengeProgress[user.email] || {}
                          const activities = allUserActivities[user.email] || []

                          const activeFeatureCount = Object.values(featureUsage).filter(Boolean).length
                          const completedChallengeCount = Object.values(challengeProgress).filter(Boolean).length

                          return (
                            <tr key={user.id}>
                              <td className="px-4 py-3 font-medium text-slate-900">{user.name}</td>
                              <td className="px-4 py-3 text-slate-600">{user.email}</td>
                              <td className="px-4 py-3 text-slate-600">{activeFeatureCount}</td>
                              <td className="px-4 py-3 text-slate-600">{completedChallengeCount}</td>
                              <td className="px-4 py-3 text-slate-600">{formatDateTime(activities[0]?.createdAt)}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {activeTab === 'content' && (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-2xl font-semibold text-slate-900">Kelola konten landing dan dashboard</h2>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleSaveContent}
                        className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                      >
                        Simpan konten
                      </button>
                      <button
                        type="button"
                        onClick={handleResetContent}
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        Reset default
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">Daftar Features</h3>
                      <button
                        type="button"
                        onClick={addFeature}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        + Tambah feature
                      </button>
                    </div>

                    <div className="grid gap-4">
                      {contentDraft.featureList.map((feature, index) => (
                        <article key={feature.id} className="rounded-xl border border-slate-200 p-4">
                          <div className="grid gap-3 md:grid-cols-2">
                            <label className="text-sm text-slate-600">
                              Judul
                              <input
                                value={feature.title}
                                onChange={(event) => updateFeatureField(index, 'title', event.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            </label>
                            <label className="text-sm text-slate-600">
                              Metrik
                              <input
                                value={feature.metric}
                                onChange={(event) => updateFeatureField(index, 'metric', event.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            </label>
                            <label className="text-sm text-slate-600 md:col-span-2">
                              Deskripsi
                              <textarea
                                value={feature.description}
                                onChange={(event) => updateFeatureField(index, 'description', event.target.value)}
                                rows={2}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            </label>
                            <label className="text-sm text-slate-600">
                              Accent gradient (Tailwind)
                              <input
                                value={feature.accent}
                                onChange={(event) => updateFeatureField(index, 'accent', event.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            </label>
                            <div className="flex items-end justify-end">
                              <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="rounded-lg border border-rose-300 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                              >
                                Hapus feature
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">Daftar Challenges</h3>
                      <button
                        type="button"
                        onClick={addChallenge}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        + Tambah challenge
                      </button>
                    </div>

                    <div className="grid gap-4">
                      {contentDraft.challengeList.map((challenge, index) => (
                        <article key={challenge.id} className="rounded-xl border border-slate-200 p-4">
                          <div className="grid gap-3 md:grid-cols-2">
                            <label className="text-sm text-slate-600">
                              Judul
                              <input
                                value={challenge.title}
                                onChange={(event) => updateChallengeField(index, 'title', event.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            </label>
                            <label className="text-sm text-slate-600">
                              Level
                              <input
                                value={challenge.level}
                                onChange={(event) => updateChallengeField(index, 'level', event.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            </label>
                            <label className="text-sm text-slate-600">
                              Durasi
                              <input
                                value={challenge.duration}
                                onChange={(event) => updateChallengeField(index, 'duration', event.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            </label>
                            <label className="text-sm text-slate-600">
                              Dampak
                              <input
                                value={challenge.impact}
                                onChange={(event) => updateChallengeField(index, 'impact', event.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            </label>
                            <label className="text-sm text-slate-600 md:col-span-2">
                              Deskripsi
                              <textarea
                                value={challenge.description}
                                onChange={(event) => updateChallengeField(index, 'description', event.target.value)}
                                rows={2}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            </label>
                            <label className="text-sm text-slate-600 md:col-span-2">
                              Detail
                              <textarea
                                value={challenge.detail}
                                onChange={(event) => updateChallengeField(index, 'detail', event.target.value)}
                                rows={2}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            </label>
                            <div className="md:col-span-2 flex justify-end">
                              <button
                                type="button"
                                onClick={() => removeChallenge(index)}
                                className="rounded-lg border border-rose-300 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                              >
                                Hapus challenge
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">Daftar FAQ</h3>
                    </div>

                    <div className="grid gap-4">
                      {contentDraft.faqList.map((faq, index) => (
                        <article key={faq.id} className="rounded-xl border border-slate-200 p-4">
                          <div className="grid gap-3">
                            <label className="text-sm text-slate-600">
                              Pertanyaan
                              <input
                                value={faq.question}
                                onChange={(event) =>
                                  setContentDraft((prev) => {
                                    const nextFaq = [...prev.faqList]
                                    nextFaq[index] = { ...nextFaq[index], question: event.target.value }
                                    return { ...prev, faqList: nextFaq }
                                  })
                                }
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            </label>
                            <label className="text-sm text-slate-600">
                              Jawaban
                              <textarea
                                value={faq.answer}
                                onChange={(event) =>
                                  setContentDraft((prev) => {
                                    const nextFaq = [...prev.faqList]
                                    nextFaq[index] = { ...nextFaq[index], answer: event.target.value }
                                    return { ...prev, faqList: nextFaq }
                                  })
                                }
                                rows={3}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            </label>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </Motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
