const scenarioConfig = {
  mahasiswa: {
    label: 'Mahasiswa',
    tone: 'Ritme cepat, hemat biaya, dan mudah dijalankan di sela mobilitas kampus.',
    missionPrefix: 'campus',
    recommendations: ['refill', 'walking', 'shared-ride'],
  },
  pekerja: {
    label: 'Pekerja Kantoran',
    tone: 'Fokus pada commuting, efisiensi energi, dan kebiasaan kerja yang konsisten.',
    missionPrefix: 'office',
    recommendations: ['low-emission', 'smart-energy', 'daily-log'],
  },
  keluarga: {
    label: 'Keluarga',
    tone: 'Prioritas pada dampak rumah tangga, pengelolaan sampah, dan kebiasaan yang mudah diikuti bersama.',
    missionPrefix: 'home',
    recommendations: ['compost', 'home-insight', 'plastic-free'],
  },
}

const missionLibrary = {
  campus: [
    { id: 'campus-refill', title: 'Refill Sprint', description: 'Gunakan botol isi ulang selama 5 hari minggu ini.', reward: '12 eco points', urgency: 'high' },
    { id: 'campus-steps', title: 'Between Classes Walk', description: 'Tempuh minimal 4.000 langkah pada 3 hari aktif.', reward: '18 eco points', urgency: 'medium' },
    { id: 'campus-log', title: 'Notebook Habit Check', description: 'Catat tiga aksi hijau di Daily Action Log.', reward: 'Badge unlock +8%', urgency: 'low' },
  ],
  office: [
    { id: 'office-commute', title: 'Low Emission Commute', description: 'Gunakan moda rendah emisi minimal 3 kali minggu ini.', reward: '20 eco points', urgency: 'high' },
    { id: 'office-energy', title: 'Desk Energy Reset', description: 'Matikan perangkat tidak terpakai sebelum pulang selama 4 hari.', reward: '15 eco points', urgency: 'medium' },
    { id: 'office-air', title: 'Air Risk Planner', description: 'Buka Air Quality Insight dua kali sebelum jam sibuk.', reward: 'Insight boost', urgency: 'low' },
  ],
  home: [
    { id: 'home-compost', title: 'Kitchen Compost Loop', description: 'Pisahkan sampah organik selama 4 hari berturut-turut.', reward: '24 eco points', urgency: 'high' },
    { id: 'home-plastic', title: 'Family Plastic Reset', description: 'Kurangi pembelian plastik sekali pakai pada 3 sesi belanja.', reward: '16 eco points', urgency: 'medium' },
    { id: 'home-energy', title: 'Evening Energy Sweep', description: 'Lakukan cek lampu dan charger tiap malam minggu ini.', reward: '7-day streak', urgency: 'low' },
  ],
}

const storyDeck = [
  {
    id: 'story-1',
    title: 'Momentum Hari Ini',
    description: 'Progress kecil yang konsisten lebih kuat untuk demo dibanding lonjakan sekali pakai.',
    tag: 'Insight',
  },
  {
    id: 'story-2',
    title: 'Challenge Paling Efektif',
    description: 'Challenge dengan progress stabil memberi narasi before vs after yang lebih meyakinkan.',
    tag: 'Story',
  },
  {
    id: 'story-3',
    title: 'Kontrol untuk Juri',
    description: 'Gunakan presentation mode untuk mengurangi noise dan fokus pada kartu paling kuat.',
    tag: 'Presentation',
  },
]

export const getScenarioConfig = (scenarioMode = 'mahasiswa') => scenarioConfig[scenarioMode] || scenarioConfig.mahasiswa

export const generateWeeklyMissions = ({
  scenarioMode,
  featureInteraction,
  challengeDetail,
}) => {
  const scenario = getScenarioConfig(scenarioMode)
  const pool = missionLibrary[scenario.missionPrefix] || missionLibrary.campus
  const totalRuns = Object.values(featureInteraction || {}).reduce((sum, value) => sum + (Number(value) || 0), 0)
  const averageProgress = Object.values(challengeDetail || {}).reduce((sum, value) => sum + (value?.progress || 0), 0) / Math.max(Object.keys(challengeDetail || {}).length, 1)

  return pool.slice(0, 3).map((mission, index) => ({
    ...mission,
    progress: Math.min(100, Math.max(12, Math.round((totalRuns * 6 + averageProgress * 0.45 + index * 14) % 101))),
    status:
      index === 0 && averageProgress < 45
        ? 'prioritas'
        : index === 2 && totalRuns > 6
          ? 'siap-klaim'
          : 'berjalan',
  }))
}

export const buildAchievementList = ({
  completedChallenges,
  totalFeatureRuns,
  activeFeatures,
  streakScore,
}) => [
  {
    id: 'first-spark',
    title: 'First Spark',
    rarity: 'Common',
    requirement: 'Aktifkan minimal 2 fitur.',
    progress: Math.min(100, Math.round((activeFeatures / 2) * 100)),
    unlocked: activeFeatures >= 2,
  },
  {
    id: 'eco-rhythm',
    title: 'Eco Rhythm',
    rarity: 'Rare',
    requirement: 'Selesaikan 3 challenge.',
    progress: Math.min(100, Math.round((completedChallenges / 3) * 100)),
    unlocked: completedChallenges >= 3,
  },
  {
    id: 'signal-runner',
    title: 'Signal Runner',
    rarity: 'Epic',
    requirement: 'Jalankan 10 simulasi fitur.',
    progress: Math.min(100, Math.round((totalFeatureRuns / 10) * 100)),
    unlocked: totalFeatureRuns >= 10,
  },
  {
    id: 'planet-keeper',
    title: 'Planet Keeper',
    rarity: 'Legendary',
    requirement: 'Jaga momentum di atas 75%.',
    progress: Math.min(100, streakScore),
    unlocked: streakScore >= 75,
  },
]

export const buildJourneyTimeline = ({ userActivities, missions, challengeList, challengeDetail }) => {
  const challengeMap = Object.fromEntries((challengeList || []).map((challenge) => [challenge.id, challenge]))
  const activityEvents = (userActivities || []).slice(0, 5).map((activity, index) => ({
    id: activity.id,
    title: activity.title,
    description: activity.description,
    meta: new Date(activity.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
    tone: index === 0 ? 'cyan' : activity.type.startsWith('challenge') ? 'emerald' : 'slate',
  }))
  const missionEvents = (missions || []).slice(0, 2).map((mission) => ({
    id: mission.id,
    title: mission.title,
    description: `Status: ${mission.status}. Reward: ${mission.reward}.`,
    meta: `${mission.progress}%`,
    tone: mission.status === 'prioritas' ? 'orange' : 'violet',
  }))
  const challengeEvents = Object.entries(challengeDetail || {})
    .filter(([, value]) => value?.progress > 0)
    .slice(0, 3)
    .map(([challengeId, value]) => ({
      id: challengeId,
      title: challengeMap[challengeId]?.title || challengeId,
      description: value.completed ? 'Challenge sudah selesai dan siap dipamerkan.' : 'Challenge masih bergerak menuju target mingguan.',
      meta: `${value.progress}%`,
      tone: value.completed ? 'emerald' : 'cyan',
    }))

  return [...challengeEvents, ...activityEvents, ...missionEvents].slice(0, 8)
}

export const buildSmartRecommendation = ({
  scenarioMode,
  topFeature,
  focusChallenge,
  totalFeatureRuns,
  completedChallenges,
}) => {
  const scenario = getScenarioConfig(scenarioMode)

  if (totalFeatureRuns < 3) {
    return {
      title: 'Bangun ritme eksplorasi terlebih dulu',
      description: `Sebagai ${scenario.label.toLowerCase()}, mulailah dari 1 modul utama lalu ulangi sampai pola penggunaan terlihat jelas.`,
      cta: 'Buka Feature Lab',
    }
  }

  if (focusChallenge && completedChallenges < 2) {
    return {
      title: `Fokus terbaik minggu ini: ${focusChallenge.title}`,
      description: `Karena pola saat ini belum stabil, challenge fokus ini paling potensial menjadi cerita before vs after yang kuat.`,
      cta: 'Lanjutkan challenge',
    }
  }

  return {
    title: `Dorong modul ${topFeature?.title || 'utama'} sebagai highlight`,
    description: `Aktivitasmu paling kuat di area ini. Jadikan modul tersebut sebagai pembuka demo dan hubungkan dengan scenario ${scenario.label.toLowerCase()}.`,
    cta: 'Sorot modul ini',
  }
}

export const buildImpactCardData = ({
  user,
  scenarioMode,
  completedChallenges,
  streakScore,
  totalFeatureRuns,
  topFeature,
}) => {
  const scenario = getScenarioConfig(scenarioMode)

  return {
    headline: `${user.name.split(' ')[0]} Eco Persona`,
    subtitle: `${scenario.label} mode`,
    stats: [
      { label: 'Eco score', value: `${Math.max(68, streakScore)}%` },
      { label: 'Challenge selesai', value: completedChallenges },
      { label: 'Best habit', value: topFeature?.title || 'Daily green habit' },
      { label: 'Impact estimate', value: `${12 + completedChallenges * 4 + Math.round(totalFeatureRuns / 2)} kg CO2e` },
    ],
  }
}

export const buildImpactComparison = ({
  completedChallenges,
  averageChallengeProgress,
  totalFeatureRuns,
}) => ({
  before: {
    title: 'Sebelum konsisten',
    points: [
      'Aksi hijau tidak terstruktur dan sulit diceritakan.',
      'Challenge sering berhenti di tengah jalan.',
      'Modul aktif belum membentuk pola yang jelas.',
    ],
    metric: `${Math.max(18, 42 - completedChallenges * 4)}% stabilitas`,
  },
  after: {
    title: 'Sesudah memakai EcoSurvive',
    points: [
      `${completedChallenges} challenge sudah punya payoff yang bisa dipresentasikan.`,
      `Rata-rata progres naik menjadi ${averageChallengeProgress}%.`,
      `${totalFeatureRuns} simulasi fitur membentuk ritme penggunaan yang terlihat nyata.`,
    ],
    metric: `${Math.max(55, averageChallengeProgress + 12)}% stabilitas`,
  },
})

export const buildLeaderboard = ({ users, getUserSnapshot }) =>
  (users || [])
    .map((user) => {
      const snapshot = getUserSnapshot(user.email)
      const score = snapshot.completedChallengeCount * 24 + snapshot.activeFeatureCount * 11 + snapshot.recentActivities.length * 4
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        score,
        movement: score > 70 ? '+4' : score > 35 ? '+2' : '+1',
        badge: score > 80 ? 'Legend' : score > 50 ? 'Mover' : 'Starter',
      }
    })
    .sort((left, right) => right.score - left.score)

export const buildAdminInsightSimulation = ({
  users,
  totalFeatureRuns,
  totalCompletedChallenges,
  contentDraft,
}) => {
  const projectedEngagement = Math.min(100, 42 + users.length * 4 + contentDraft.challengeList.length * 2)
  const contentPressure = Math.min(100, 30 + contentDraft.featureList.length * 6)
  const challengeVelocity = Math.min(100, 28 + totalCompletedChallenges * 5)

  return {
    projectedEngagement,
    contentPressure,
    challengeVelocity,
    estimatedLift: `${Math.min(39, 12 + Math.round(totalFeatureRuns / 3))}%`,
  }
}

export const buildPresentationSteps = (role = 'user') =>
  role === 'admin'
    ? [
        { id: 'step-1', title: 'Pulse', description: 'Buka overview untuk first impression control room.' },
        { id: 'step-2', title: 'Users', description: 'Masuk ke drawer user untuk menunjukkan detail perilaku.' },
        { id: 'step-3', title: 'Content', description: 'Tutup dengan content lab dan insight simulator.' },
      ]
    : [
        { id: 'step-1', title: 'Impact', description: 'Mulai dari impact meter dan personal card.' },
        { id: 'step-2', title: 'Mission', description: 'Tunjukkan weekly mission dan recommendation engine.' },
        { id: 'step-3', title: 'Proof', description: 'Tutup dengan timeline, badges, dan leaderboard.' },
      ]

export const getStoryDeck = () => storyDeck
