import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Command, Flame, LayoutPanelTop, Rocket, Sparkles, Target, UserRound } from 'lucide-react'
import DashboardSidebar from '../components/DashboardSidebar'
import WorkspaceHero from '../components/WorkspaceHero'
import CommandPalette from '../components/CommandPalette'
import FloatingInsightWidget from '../components/FloatingInsightWidget'
import SpotlightDrawer from '../components/SpotlightDrawer'
import { getManagedContent } from '../utils/contentManager'
import { tabPanelTransition } from '../utils/animations'
import {
  getChallengeDetail,
  getChallengeProgress,
  getFeatureInteraction,
  getFeatureUsage,
  getUserActivities,
  logUserActivity,
  saveChallengeDetail,
  saveChallengeProgress,
  saveFeatureInteraction,
  saveFeatureUsage,
} from '../utils/storage'
import {
  buildAchievementList,
  buildImpactCardData,
  buildImpactComparison,
  buildJourneyTimeline,
  buildPresentationSteps,
  buildSmartRecommendation,
  generateWeeklyMissions,
  getScenarioConfig,
  getStoryDeck,
} from '../utils/dashboardInsights'
import UserChallengeHubTab from './user/UserChallengeHubTab'
import UserFeatureLabTab from './user/UserFeatureLabTab'
import UserOverviewTab from './user/UserOverviewTab'
import UserProfileStudioTab from './user/UserProfileStudioTab'

const dashboardTabs = [
  { id: 'overview', label: 'Overview', icon: LayoutPanelTop },
  { id: 'features', label: 'Feature Lab', icon: Sparkles },
  { id: 'challenges', label: 'Challenge Hub', icon: Target },
  { id: 'profile', label: 'Profile Studio', icon: UserRound },
]

const userSidebarSize = {
  widthClass: 'lg:w-[320px]',
  fixedClass: 'lg:fixed lg:bottom-0 lg:left-0 lg:top-0',
}

const getStoredState = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const resolveChallengeDetail = (challengeList, detail, progress) =>
  Object.fromEntries(
    challengeList.map((challenge) => {
      const entryFromDetail = detail[challenge.id]
      if (entryFromDetail) return [challenge.id, entryFromDetail]
      const completed = Boolean(progress[challenge.id])
      return [challenge.id, { progress: completed ? 100 : 0, completed, updatedAt: null }]
    }),
  )

const UserDashboard = ({ user, onLogout }) => {
  const { featureList, challengeList } = useMemo(() => getManagedContent(), [])
  const profileKey = `ecosurvive_profile_prefs_${user.email}`
  const tuningKey = `ecosurvive_feature_tuning_${user.email}`

  const [activeTab, setActiveTab] = useState('overview')
  const [featureUsage, setFeatureUsageState] = useState(() => getFeatureUsage(user.email))
  const [featureInteraction, setFeatureInteractionState] = useState(() => getFeatureInteraction(user.email))
  const [challengeProgress, setChallengeProgressState] = useState(() => getChallengeProgress(user.email))
  const [challengeDetail, setChallengeDetailState] = useState(() =>
    resolveChallengeDetail(challengeList, getChallengeDetail(user.email), getChallengeProgress(user.email)),
  )
  const [userActivities, setUserActivities] = useState(() => getUserActivities(user.email))
  const [featureSearch, setFeatureSearch] = useState('')
  const [challengeFilter, setChallengeFilter] = useState('all')
  const [focusChallengeId, setFocusChallengeId] = useState(() => challengeList[0]?.id || null)
  const [presentationMode, setPresentationMode] = useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')
  const [spotlightItem, setSpotlightItem] = useState(null)
  const [activePresentationStep, setActivePresentationStep] = useState(0)
  const [profilePrefs, setProfilePrefs] = useState(() =>
    getStoredState(profileKey, {
      weeklyTarget: 4,
      focusMode: 'impact',
      reminderStyle: 'ringkas',
      scenarioMode: 'mahasiswa',
      profileNote: 'Mencoba konsisten dengan aksi kecil yang realistis setiap hari.',
    }),
  )
  const [featureTuning, setFeatureTuning] = useState(() =>
    getStoredState(tuningKey, Object.fromEntries(featureList.map((feature) => [feature.id, 55]))),
  )

  useEffect(() => window.localStorage.setItem(profileKey, JSON.stringify(profilePrefs)), [profileKey, profilePrefs])
  useEffect(() => window.localStorage.setItem(tuningKey, JSON.stringify(featureTuning)), [featureTuning, tuningKey])

  const addActivity = (type, title, description, metadata = {}) => {
    logUserActivity({ email: user.email, type, title, description, metadata })
    setUserActivities(getUserActivities(user.email))
  }

  const persistFeatureUsage = (nextUsage) => {
    setFeatureUsageState(nextUsage)
    saveFeatureUsage(user.email, nextUsage)
  }

  const persistFeatureInteraction = (nextInteraction) => {
    setFeatureInteractionState(nextInteraction)
    saveFeatureInteraction(user.email, nextInteraction)
  }

  const persistChallengeState = (nextDetail) => {
    setChallengeDetailState(nextDetail)
    saveChallengeDetail(user.email, nextDetail)
    const nextProgress = Object.fromEntries(Object.entries(nextDetail).map(([id, value]) => [id, Boolean(value.completed)]))
    setChallengeProgressState(nextProgress)
    saveChallengeProgress(user.email, nextProgress)
  }

  const toggleFeatureUsage = (feature) => {
    const nextUsage = { ...featureUsage, [feature.id]: !featureUsage[feature.id] }
    persistFeatureUsage(nextUsage)
    addActivity(
      'feature-toggle',
      nextUsage[feature.id] ? 'Fitur diaktifkan' : 'Fitur dinonaktifkan',
      `${feature.title} ${nextUsage[feature.id] ? 'diaktifkan' : 'dinonaktifkan'}.`,
      { featureId: feature.id, active: nextUsage[feature.id] },
    )
  }

  const runFeature = (feature) => {
    const nextUsage = { ...featureUsage, [feature.id]: true }
    const nextInteraction = { ...featureInteraction, [feature.id]: (featureInteraction[feature.id] || 0) + 1 }
    persistFeatureUsage(nextUsage)
    persistFeatureInteraction(nextInteraction)
    addActivity(
      'feature-run',
      'Fitur dijalankan',
      `${feature.title} dijalankan ${nextInteraction[feature.id]} kali dengan intensitas ${featureTuning[feature.id] || 55}%.`,
      { featureId: feature.id, totalRun: nextInteraction[feature.id] },
    )
  }

  const updateChallengeProgress = (challenge, progressValue) => {
    const nextProgressValue = Math.max(0, Math.min(100, Number(progressValue) || 0))
    const previous = challengeDetail[challenge.id] || { progress: 0, completed: false }
    const nextDetail = {
      ...challengeDetail,
      [challenge.id]: { progress: nextProgressValue, completed: nextProgressValue >= 100, updatedAt: new Date().toISOString() },
    }
    persistChallengeState(nextDetail)
    if (!previous.completed && nextProgressValue >= 100) {
      addActivity('challenge-complete', 'Challenge selesai', `Kamu menyelesaikan challenge "${challenge.title}".`, { challengeId: challenge.id })
    } else if (previous.progress === 0 && nextProgressValue > 0) {
      addActivity('challenge-start', 'Challenge dimulai', `Kamu mulai challenge "${challenge.title}".`, { challengeId: challenge.id, progress: nextProgressValue })
    }
  }

  const completedChallenges = useMemo(() => challengeList.filter((challenge) => challengeProgress[challenge.id]).length, [challengeList, challengeProgress])
  const activeFeatures = useMemo(() => featureList.filter((feature) => featureUsage[feature.id]).length, [featureList, featureUsage])
  const totalFeatureRuns = useMemo(() => Object.values(featureInteraction).reduce((sum, value) => sum + (Number(value) || 0), 0), [featureInteraction])
  const averageChallengeProgress = useMemo(() => Math.round(challengeList.reduce((sum, challenge) => sum + (challengeDetail[challenge.id]?.progress || 0), 0) / Math.max(challengeList.length, 1)), [challengeDetail, challengeList])
  const consistencyScore = useMemo(() => Math.round((completedChallenges / Math.max(challengeList.length, 1)) * 100), [challengeList.length, completedChallenges])
  const inProgressChallenges = useMemo(() => challengeList.filter((challenge) => {
    const progress = challengeDetail[challenge.id]?.progress || 0
    return progress > 0 && progress < 100
  }).length, [challengeDetail, challengeList])
  const focusChallenge = challengeList.find((challenge) => challenge.id === focusChallengeId) || challengeList[0]
  const weeklyProgress = Math.min(100, Math.round((completedChallenges / Math.max(profilePrefs.weeklyTarget, 1)) * 100))
  const streakScore = Math.min(100, Math.round((consistencyScore + averageChallengeProgress) / 2))
  const nextAction = !focusChallenge
    ? 'Pilih challenge fokus mingguan untuk memulai.'
    : !(challengeDetail[focusChallenge.id]?.progress > 0)
      ? `Mulai challenge fokus: ${focusChallenge.title}`
      : challengeDetail[focusChallenge.id]?.completed
        ? `Challenge fokus "${focusChallenge.title}" sudah selesai. Pilih target baru.`
        : `Lanjutkan challenge fokus "${focusChallenge.title}" hingga 100%.`

  const filteredFeatures = useMemo(() => {
    const query = featureSearch.trim().toLowerCase()
    return featureList
      .filter((feature) => !query || feature.title.toLowerCase().includes(query) || feature.description.toLowerCase().includes(query))
      .sort((left, right) => (featureInteraction[right.id] || 0) - (featureInteraction[left.id] || 0))
  }, [featureInteraction, featureList, featureSearch])

  const filteredChallenges = useMemo(() => challengeList.filter((challenge) => {
    const detail = challengeDetail[challenge.id] || { progress: 0, completed: false }
    if (challengeFilter === 'completed') return detail.completed
    if (challengeFilter === 'active') return detail.progress > 0 && !detail.completed
    if (challengeFilter === 'not-started') return detail.progress === 0
    if (challengeFilter === 'impact') return challenge.level === 'Impact'
    return true
  }), [challengeDetail, challengeFilter, challengeList])

  const topFeature = useMemo(() => featureList.map((feature) => ({ ...feature, runCount: featureInteraction[feature.id] || 0 })).sort((left, right) => right.runCount - left.runCount)[0], [featureInteraction, featureList])
  const scenarioInfo = useMemo(() => getScenarioConfig(profilePrefs.scenarioMode), [profilePrefs.scenarioMode])
  const weeklyMissions = useMemo(() => generateWeeklyMissions({ scenarioMode: profilePrefs.scenarioMode, featureInteraction, challengeDetail }), [challengeDetail, featureInteraction, profilePrefs.scenarioMode])
  const achievements = useMemo(() => buildAchievementList({ completedChallenges, totalFeatureRuns, activeFeatures, streakScore }), [activeFeatures, completedChallenges, streakScore, totalFeatureRuns])
  const journeyTimeline = useMemo(() => buildJourneyTimeline({ userActivities, missions: weeklyMissions, challengeList, challengeDetail }), [challengeDetail, challengeList, userActivities, weeklyMissions])
  const smartRecommendation = useMemo(() => buildSmartRecommendation({ scenarioMode: profilePrefs.scenarioMode, topFeature, focusChallenge, totalFeatureRuns, completedChallenges }), [completedChallenges, focusChallenge, profilePrefs.scenarioMode, topFeature, totalFeatureRuns])
  const impactCard = useMemo(() => buildImpactCardData({ user, scenarioMode: profilePrefs.scenarioMode, completedChallenges, streakScore, totalFeatureRuns, topFeature }), [completedChallenges, profilePrefs.scenarioMode, streakScore, topFeature, totalFeatureRuns, user])
  const impactComparison = useMemo(() => buildImpactComparison({ completedChallenges, averageChallengeProgress, totalFeatureRuns }), [averageChallengeProgress, completedChallenges, totalFeatureRuns])
  const storyDeck = useMemo(() => getStoryDeck(), [])
  const presentationSteps = useMemo(() => buildPresentationSteps('user'), [])
  const featureRunChartData = useMemo(() => ({ labels: featureList.map((feature) => feature.title), datasets: [{ data: featureList.map((feature) => featureInteraction[feature.id] || 0), backgroundColor: ['#0ea5e9', '#f97316', '#22c55e', '#a855f7'] }] }), [featureInteraction, featureList])
  const challengeProgressChartData = useMemo(() => ({ labels: challengeList.map((challenge) => challenge.title), datasets: [{ data: challengeList.map((challenge) => challengeDetail[challenge.id]?.progress || 0), borderColor: '#0284c7', backgroundColor: 'rgba(2,132,199,0.12)', pointBackgroundColor: '#f97316' }] }), [challengeDetail, challengeList])
  const quickStats = [
    { label: 'Fitur aktif', value: activeFeatures, hint: `${totalFeatureRuns} total simulasi dijalankan`, tone: 'cyan', progress: Math.round((activeFeatures / Math.max(featureList.length, 1)) * 100), icon: Sparkles },
    { label: 'Challenge selesai', value: completedChallenges, hint: `Target mingguan: ${profilePrefs.weeklyTarget} challenge`, tone: 'emerald', progress: weeklyProgress, icon: Target },
    { label: 'Skor momentum', value: `${streakScore}%`, hint: 'Gabungan progres dan konsistensi aksi', tone: 'orange', progress: streakScore, icon: Flame },
    { label: 'Fokus minggu ini', value: focusChallenge ? focusChallenge.level : '-', hint: focusChallenge ? focusChallenge.title : 'Belum ada challenge fokus', tone: 'violet', progress: focusChallenge ? challengeDetail[focusChallenge.id]?.progress || 0 : 0, icon: Rocket },
  ]

  const sidebarStats = [
    { label: 'Fitur aktif', value: activeFeatures },
    { label: 'Challenge selesai', value: completedChallenges },
    { label: 'Rata-rata progres', value: `${averageChallengeProgress}%` },
    { label: 'Total run fitur', value: totalFeatureRuns },
  ]
  const commands = [
    ...dashboardTabs.map((tab, index) => ({ id: `tab-${tab.id}`, title: `Buka ${tab.label}`, group: 'Tabs', shortcut: `Alt+${index + 1}`, action: () => setActiveTab(tab.id) })),
    { id: 'presentation-toggle', title: presentationMode ? 'Matikan Presentation Mode' : 'Aktifkan Presentation Mode', group: 'View', shortcut: 'Shift+P', action: () => setPresentationMode((prev) => !prev) },
    { id: 'mission-focus', title: 'Sorot misi mingguan', group: 'Story', shortcut: 'M', action: () => setSpotlightItem({ title: weeklyMissions[0]?.title || 'Misi mingguan', subtitle: 'Weekly mission generator', content: weeklyMissions[0]?.description || 'Belum ada misi' }) },
  ]
  const filteredCommands = commands.filter((command) => !commandQuery.trim() || command.title.toLowerCase().includes(commandQuery.toLowerCase()) || command.group.toLowerCase().includes(commandQuery.toLowerCase()))

  const activeTabLabel = dashboardTabs.find((tab) => tab.id === activeTab)?.label || 'Overview'

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
        tone="user"
      >
        <p className="text-sm leading-relaxed text-slate-600">{spotlightItem?.content}</p>
      </SpotlightDrawer>
      <FloatingInsightWidget
        title={smartRecommendation.title}
        description={smartRecommendation.description}
        actionLabel={smartRecommendation.cta}
        onAction={() => setActiveTab('overview')}
      />
      <div className={`min-h-[calc(100vh-5rem)] px-4 pb-6 pt-24 sm:px-6 lg:px-8 lg:pb-8 lg:pt-24 ${presentationMode ? 'bg-white' : 'bg-slate-50'}`}>
          <DashboardSidebar
            label="User workspace"
            title="Mission Control"
            subtitle={user.name}
            tabs={dashboardTabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            statsTitle="Quick stats"
            stats={sidebarStats}
            onLogout={onLogout}
            logoutLabel="Keluar"
            size={userSidebarSize}
          />

          <div className="mx-auto max-w-6xl min-w-0 space-y-6">
              <WorkspaceHero
                eyebrow="Authenticated User Experience"
                title={`Mission Control: ${activeTabLabel}`}
                description="Semua halaman setelah login kini dirancang sebagai rangkaian workspace yang konsisten, interaktif, dan layak dipresentasikan di lomba frontend."
                tone="user"
                chips={[
                  { label: 'Role', value: 'User' },
                  { label: 'Focus mode', value: profilePrefs.focusMode },
                  { label: 'Weekly target', value: profilePrefs.weeklyTarget },
                  { label: 'Scenario', value: scenarioInfo.label },
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
                      onClick={() => handleTabChange('profile')}
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                    >
                      Profile studio
                    </button>
                  </>
                }
              />
              <AnimatePresence mode="wait">
                <Motion.div key={activeTab} {...tabPanelTransition}>
                  {activeTab === 'overview' && <UserOverviewTab {...{ user, nextAction, profilePrefs, focusChallenge, challengeDetail, challengeList, setFocusChallengeId, updateChallengeProgress, quickStats, topFeature, featureTuning, featureInteraction, featureList, featureRunChartData, challengeProgressChartData, setActiveTab: handleTabChange, weeklyMissions, smartRecommendation, achievements, journeyTimeline, impactCard, impactComparison, storyDeck, scenarioInfo, presentationSteps, activePresentationStep, setActivePresentationStep, presentationMode, setSpotlightItem, streakScore, averageChallengeProgress }} />}
                  {activeTab === 'features' && <UserFeatureLabTab {...{ featureSearch, setFeatureSearch, filteredFeatures, featureUsage, featureInteraction, featureTuning, setFeatureTuning, toggleFeatureUsage, runFeature, featureList, activeFeatures, totalFeatureRuns, setSpotlightItem, smartRecommendation }} />}
                  {activeTab === 'challenges' && <UserChallengeHubTab {...{ challengeFilter, setChallengeFilter, filteredChallenges, challengeDetail, focusChallengeId, setFocusChallengeId, updateChallengeProgress, averageChallengeProgress, focusChallenge, challengeList, completedChallenges, inProgressChallenges, weeklyMissions, journeyTimeline, setSpotlightItem }} />}
                  {activeTab === 'profile' && <UserProfileStudioTab {...{ user, profilePrefs, setProfilePrefs, completedChallenges, streakScore, activeFeatures, totalFeatureRuns, achievements, impactCard, scenarioInfo }} />}
                </Motion.div>
              </AnimatePresence>
          </div>
      </div>
    </section>
  )
}

export default UserDashboard
