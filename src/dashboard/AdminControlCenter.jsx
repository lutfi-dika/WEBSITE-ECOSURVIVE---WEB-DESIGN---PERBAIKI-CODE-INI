import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Activity, BarChart3, Command, LayoutPanelTop, Settings2, Users } from 'lucide-react'
import DashboardSidebar from '../components/DashboardSidebar'
import WorkspaceHero from '../components/WorkspaceHero'
import CommandPalette from '../components/CommandPalette'
import FloatingInsightWidget from '../components/FloatingInsightWidget'
import SpotlightDrawer from '../components/SpotlightDrawer'
import { tabPanelTransition } from '../utils/animations'
import { getManagedContent } from '../utils/contentManager'
import {
  getAllChallengeProgress,
  getAllFeatureInteraction,
  getAllFeatureUsage,
  getAllUserActivities,
  getUsers,
} from '../utils/storage'
import {
  buildAdminInsightSimulation,
  buildLeaderboard,
  buildPresentationSteps,
} from '../utils/dashboardInsights'
import AdminContentTab from './admin/AdminContentTab'
import AdminOverviewTab from './admin/AdminOverviewTab'
import AdminUsersTab from './admin/AdminUsersTab'

const adminTabs = [
  { id: 'overview', label: 'Overview', icon: LayoutPanelTop },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'content', label: 'Content Lab', icon: Settings2 },
]

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

const AdminControlCenter = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [contentDraft] = useState(() => getManagedContent())
  const [userSearch, setUserSearch] = useState('')
  const [selectedUserEmail, setSelectedUserEmail] = useState('')
  const [previewMode, setPreviewMode] = useState('features')
  const [activityReferenceTime] = useState(() => Date.now())
  const [presentationMode, setPresentationMode] = useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')
  const [spotlightItem, setSpotlightItem] = useState(null)
  const [activePresentationStep, setActivePresentationStep] = useState(0)

  const users = getUsers().filter((user) => user.role !== 'admin')
  const allFeatureUsage = getAllFeatureUsage()
  const allFeatureInteraction = getAllFeatureInteraction()
  const allChallengeProgress = getAllChallengeProgress()
  const allUserActivities = getAllUserActivities()

  const totalFeatureRuns = useMemo(() => Object.values(allFeatureInteraction).reduce((total, perUser) => total + Object.values(perUser).reduce((sum, count) => sum + (Number(count) || 0), 0), 0), [allFeatureInteraction])
  const totalCompletedChallenges = useMemo(() => Object.values(allChallengeProgress).reduce((total, perUserProgress) => total + Object.values(perUserProgress).filter(Boolean).length, 0), [allChallengeProgress])
  const activeUsers = useMemo(() => Object.keys(allUserActivities).filter((email) => (allUserActivities[email] || []).length > 0).length, [allUserActivities])
  const leaderboard = useMemo(() => buildLeaderboard({ users, getUserSnapshot: (email) => {
    const featureUsage = allFeatureUsage[email] || {}
    const challengeProgress = allChallengeProgress[email] || {}
    const activities = allUserActivities[email] || []
    return {
      activeFeatureCount: Object.values(featureUsage).filter(Boolean).length,
      completedChallengeCount: Object.values(challengeProgress).filter(Boolean).length,
      recentActivities: activities.slice(0, 4),
    }
  } }), [allChallengeProgress, allFeatureUsage, allUserActivities, users])

  const flattenedActivities = useMemo(
    () =>
      Object.entries(allUserActivities)
        .flatMap(([email, activities]) => activities.map((activity) => ({ ...activity, email })))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [allUserActivities],
  )

  const filteredUsers = useMemo(() => {
    const query = userSearch.trim().toLowerCase()
    return users.filter((user) => !query || user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query))
  }, [userSearch, users])

  const getUserSnapshot = (email) => {
    const featureUsage = allFeatureUsage[email] || {}
    const challengeProgress = allChallengeProgress[email] || {}
    const activities = allUserActivities[email] || []
    return {
      activeFeatureCount: Object.values(featureUsage).filter(Boolean).length,
      completedChallengeCount: Object.values(challengeProgress).filter(Boolean).length,
      lastActivityAt: activities[0]?.createdAt,
      featureUsage,
      challengeProgress,
      recentActivities: activities.slice(0, 4),
    }
  }

  const selectedUser = filteredUsers.find((user) => user.email === selectedUserEmail) || filteredUsers[0] || null
  const contentMeta = useMemo(() => ({
    featureTitles: Object.fromEntries(contentDraft.featureList.map((feature) => [feature.id, feature.title])),
    challengeTitles: Object.fromEntries(contentDraft.challengeList.map((challenge) => [challenge.id, challenge.title])),
  }), [contentDraft.challengeList, contentDraft.featureList])

  const featureAdoptionChartData = useMemo(() => ({
    labels: contentDraft.featureList.map((feature) => feature.title),
    datasets: [{ data: contentDraft.featureList.map((feature) => Object.values(allFeatureUsage).filter((perUser) => perUser[feature.id]).length), backgroundColor: ['#0ea5e9', '#fb923c', '#22c55e', '#a855f7', '#6366f1'] }],
  }), [allFeatureUsage, contentDraft.featureList])

  const challengeCompletionLevelChartData = useMemo(() => {
    const challengeMap = Object.fromEntries(contentDraft.challengeList.map((challenge) => [challenge.id, challenge]))
    const levels = { Beginner: 0, Healthy: 0, Intermediate: 0, Wellness: 0, Impact: 0 }
    Object.values(allChallengeProgress).forEach((perUserProgress) => {
      Object.entries(perUserProgress).forEach(([challengeId, completed]) => {
        if (!completed || !challengeMap[challengeId]) return
        levels[challengeMap[challengeId].level] = (levels[challengeMap[challengeId].level] || 0) + 1
      })
    })
    return { labels: Object.keys(levels), datasets: [{ data: Object.values(levels), backgroundColor: ['#34d399', '#22d3ee', '#fb923c', '#e879f9', '#a78bfa'] }] }
  }, [allChallengeProgress, contentDraft.challengeList])

  const activityTrendChartData = useMemo(() => {
    const labels = Array.from({ length: 7 }, (_, index) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - index))
      return date.toLocaleDateString('id-ID', { weekday: 'short' })
    })
    const counts = Array.from({ length: 7 }, () => 0)
    flattenedActivities.forEach((activity) => {
      const dayDiff = Math.floor((activityReferenceTime - new Date(activity.createdAt).getTime()) / (1000 * 60 * 60 * 24))
      if (dayDiff >= 0 && dayDiff < 7) counts[6 - dayDiff] += 1
    })
    return { labels, datasets: [{ data: counts, borderColor: '#0284c7', backgroundColor: 'rgba(2,132,199,0.2)', pointBackgroundColor: '#f97316' }] }
  }, [activityReferenceTime, flattenedActivities])

  const summaryCards = [
    { label: 'Total user', value: users.length, hint: 'Jumlah user non-admin yang tercatat.', tone: 'cyan', icon: Users },
    { label: 'User aktif', value: activeUsers, hint: 'User dengan aktivitas minimal satu kali.', tone: 'emerald', icon: Activity },
    { label: 'Run fitur', value: totalFeatureRuns, hint: 'Total simulasi fitur seluruh user.', tone: 'orange', icon: BarChart3 },
    { label: 'Challenge selesai', value: totalCompletedChallenges, hint: 'Seluruh penyelesaian challenge.', tone: 'violet', icon: LayoutPanelTop },
  ]
  const adminInsightSimulation = useMemo(() => buildAdminInsightSimulation({ users, totalFeatureRuns, totalCompletedChallenges, contentDraft }), [contentDraft, totalCompletedChallenges, totalFeatureRuns, users])
  const presentationSteps = useMemo(() => buildPresentationSteps('admin'), [])
  const commands = [
    ...adminTabs.map((tab, index) => ({ id: `admin-tab-${tab.id}`, title: `Buka ${tab.label}`, group: 'Tabs', shortcut: `Alt+${index + 1}`, action: () => setActiveTab(tab.id) })),
    { id: 'admin-presentation', title: presentationMode ? 'Matikan Presentation Mode' : 'Aktifkan Presentation Mode', group: 'View', shortcut: 'Shift+P', action: () => setPresentationMode((prev) => !prev) },
    { id: 'admin-user-spotlight', title: 'Sorot user teratas', group: 'Users', shortcut: 'U', action: () => setSpotlightItem({ title: leaderboard[0]?.name || 'Belum ada user', subtitle: 'Community leader', content: `Skor ${leaderboard[0]?.score || 0} dengan badge ${leaderboard[0]?.badge || 'Starter'}.` }) },
  ]
  const filteredCommands = commands.filter((command) => !commandQuery.trim() || command.title.toLowerCase().includes(commandQuery.toLowerCase()) || command.group.toLowerCase().includes(commandQuery.toLowerCase()))

  const activeTabLabel = adminTabs.find((tab) => tab.id === activeTab)?.label || 'Overview'

  const handleTabChange = (nextTab) => setActiveTab(nextTab)
  const handleCommandSelect = (command) => {
    command.action?.()
    setCommandQuery('')
    setIsCommandPaletteOpen(false)
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsCommandPaletteOpen(true)
      }
      if (event.shiftKey && event.key.toLowerCase() === 'p') {
        event.preventDefault()
        setPresentationMode((prev) => !prev)
      }
      if (event.key === 'Escape') {
        setIsCommandPaletteOpen(false)
        setSpotlightItem(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <section className="pb-10 lg:ml-[320px]">
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        query={commandQuery}
        setQuery={setCommandQuery}
        commands={filteredCommands}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelect={handleCommandSelect}
      />
      <SpotlightDrawer
        isOpen={Boolean(spotlightItem)}
        title={spotlightItem?.title || ''}
        subtitle={spotlightItem?.subtitle || ''}
        onClose={() => setSpotlightItem(null)}
        tone="admin"
      >
        <p className="text-sm leading-relaxed text-slate-600">{spotlightItem?.content}</p>
      </SpotlightDrawer>
      <FloatingInsightWidget
        title="Admin insight simulator"
        description={`Estimated lift ${adminInsightSimulation.estimatedLift}. Projected engagement ${adminInsightSimulation.projectedEngagement}%.`}
        actionLabel="Buka overview"
        onAction={() => setActiveTab('overview')}
      />
      <div className={`min-h-[calc(100vh-5rem)] px-4 pb-6 pt-24 sm:px-6 lg:px-8 lg:pb-8 lg:pt-24 ${presentationMode ? 'bg-white' : 'bg-slate-50'}`}>
          <DashboardSidebar
            label="Panel pengelola"
            title="Admin Control Center"
            subtitle="Insight, user detail, dan content preview."
            tabs={adminTabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            statsTitle="Ringkasan cepat"
            stats={[
              { label: 'Total user', value: users.length },
              { label: 'User aktif', value: activeUsers },
              { label: 'Run fitur', value: totalFeatureRuns },
              { label: 'Challenge selesai', value: totalCompletedChallenges },
            ]}
            onLogout={onLogout}
            logoutLabel="Keluar admin"
            size={{ widthClass: 'lg:w-[320px]', fixedClass: 'lg:fixed lg:bottom-0 lg:left-0 lg:top-0' }}
          />

          <div className="mx-auto max-w-6xl min-w-0 space-y-6">
              <WorkspaceHero
                eyebrow="Authenticated Admin Experience"
                title={`Admin Control Center: ${activeTabLabel}`}
                description="Semua halaman admin setelah login dirancang sebagai control suite yang menonjolkan insight, eksplorasi data, dan preview konten untuk kebutuhan presentasi frontend."
                tone="admin"
                chips={[
                  { label: 'Role', value: 'Admin' },
                  { label: 'Users', value: users.length },
                  { label: 'Features', value: contentDraft.featureList.length },
                  { label: 'Presentation', value: presentationMode ? 'On' : 'Off' },
                ]}
                actions={
                  <>
                    <button
                      type="button"
                      onClick={() => setIsCommandPaletteOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                    >
                      <Command size={16} />
                      Command
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresentationMode((prev) => !prev)}
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                    >
                      {presentationMode ? 'Exit presentation' : 'Presentation mode'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTabChange('overview')}
                      className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Overview
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTabChange('content')}
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                    >
                      Content lab
                    </button>
                  </>
                }
              />
              <AnimatePresence mode="wait">
                <Motion.div key={activeTab} {...tabPanelTransition}>
                  {activeTab === 'overview' && <AdminOverviewTab {...{ summaryCards, featureAdoptionChartData, challengeCompletionLevelChartData, activityTrendChartData, setActiveTab: handleTabChange, contentDraft, adminInsightSimulation, leaderboard, presentationSteps, activePresentationStep, setActivePresentationStep }} />}
                  {activeTab === 'users' && <AdminUsersTab {...{ userSearch, setUserSearch, users: filteredUsers, selectedUser, setSelectedUserEmail, getUserSnapshot, formatDateTime, contentMeta, leaderboard, setSpotlightItem }} />}
                  {activeTab === 'content' && <AdminContentTab {...{ contentDraft, previewMode, setPreviewMode, adminInsightSimulation }} />}
                </Motion.div>
              </AnimatePresence>
          </div>
      </div>
    </section>
  )
}

export default AdminControlCenter
