const USERS_KEY = 'ecosurvive_users'
const SESSION_KEY = 'ecosurvive_session'
const CHALLENGE_PROGRESS_KEY = 'ecosurvive_challenge_progress'
const FEATURE_USAGE_KEY = 'ecosurvive_feature_usage'
const CHALLENGE_DETAIL_KEY = 'ecosurvive_challenge_detail'
const FEATURE_INTERACTION_KEY = 'ecosurvive_feature_interaction'
const USER_ACTIVITY_KEY = 'ecosurvive_user_activity'

const DEFAULT_ADMIN = {
  id: 'admin-ecosurvive',
  name: 'Admin EcoSurvive',
  email: 'admin@ecosurvive.id',
  password: 'admin123',
  role: 'admin',
  createdAt: '2026-01-01T00:00:00.000Z',
}

const DEFAULT_DEMO_USER = {
  id: 'user-demo-ecosurvive',
  name: 'Raka Demo',
  email: 'user@ecosurvive.id',
  password: 'user123',
  role: 'user',
  createdAt: '2026-01-02T00:00:00.000Z',
}

const parseJson = (value, fallback) => {
  if (!value) return fallback

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

const normalizeUsers = (users = []) => {
  return users.map((item) => ({
    id: item.id,
    name: item.name ?? item.nama ?? '',
    email: String(item.email ?? '').trim().toLowerCase(),
    password: item.password ?? item.kataSandi ?? '',
    role: item.role ?? item.peran ?? 'user',
    createdAt: item.createdAt ?? item.dibuatPada ?? new Date().toISOString(),
  }))
}

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

const ensureDefaultAdmin = (users) => {
  const hasAdmin = users.some((user) => user.email === DEFAULT_ADMIN.email)
  const hasDemoUser = users.some((user) => user.email === DEFAULT_DEMO_USER.email)
  const nextUsers = [...users]
  if (!hasAdmin) nextUsers.push(DEFAULT_ADMIN)
  if (!hasDemoUser) nextUsers.push(DEFAULT_DEMO_USER)
  return nextUsers
}

const getCollectionByEmail = (key) => {
  return parseJson(localStorage.getItem(key), {})
}

const saveCollectionByEmail = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const normalizeChallengeDetailEntry = (value) => {
  if (typeof value === 'boolean') {
    return {
      progress: value ? 100 : 0,
      completed: value,
      updatedAt: null,
    }
  }

  if (value && typeof value === 'object') {
    const progress = Number.isFinite(value.progress) ? Math.max(0, Math.min(100, value.progress)) : 0
    const completed = Boolean(value.completed ?? progress >= 100)

    return {
      progress,
      completed,
      updatedAt: value.updatedAt ?? null,
    }
  }

  return {
    progress: 0,
    completed: false,
    updatedAt: null,
  }
}

const toIsoNow = () => new Date().toISOString()

export const getUsers = () => {
  const rawUsers = parseJson(localStorage.getItem(USERS_KEY), [])
  const users = normalizeUsers(rawUsers)
  const withAdmin = ensureDefaultAdmin(users)

  if (withAdmin.length !== users.length || JSON.stringify(rawUsers) !== JSON.stringify(withAdmin)) {
    saveUsers(withAdmin)
  }

  return withAdmin
}

export const registerUser = ({ name, email, password }) => {
  const users = getUsers()
  const normalizedEmail = String(email).trim().toLowerCase()

  const existingUser = users.find((item) => item.email === normalizedEmail)
  if (existingUser) {
    return {
      ok: false,
      message: 'Email sudah terdaftar. Silakan masuk atau gunakan email lain.',
    }
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: String(name).trim(),
    email: normalizedEmail,
    password,
    role: 'user',
    createdAt: toIsoNow(),
  }

  saveUsers([...users, newUser])

  return {
    ok: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    },
  }
}

export const loginUser = ({ email, password }) => {
  const users = getUsers()
  const normalizedEmail = String(email).trim().toLowerCase()

  const foundUser = users.find((item) => item.email === normalizedEmail)
  if (!foundUser || foundUser.password !== password) {
    return {
      ok: false,
      message: 'Email atau kata sandi tidak sesuai.',
    }
  }

  return {
    ok: true,
    user: {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      createdAt: foundUser.createdAt,
    },
  }
}

export const saveSession = (user) => {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      ...user,
      loggedInAt: toIsoNow(),
    }),
  )
}

export const getSession = () => {
  return parseJson(localStorage.getItem(SESSION_KEY), null)
}

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY)
}

export const getChallengeProgress = (email) => {
  const data = getCollectionByEmail(CHALLENGE_PROGRESS_KEY)
  return data[email] || {}
}

export const saveChallengeProgress = (email, progress) => {
  const data = getCollectionByEmail(CHALLENGE_PROGRESS_KEY)
  data[email] = progress
  saveCollectionByEmail(CHALLENGE_PROGRESS_KEY, data)
}

export const getFeatureUsage = (email) => {
  const data = getCollectionByEmail(FEATURE_USAGE_KEY)
  return data[email] || {}
}

export const saveFeatureUsage = (email, usage) => {
  const data = getCollectionByEmail(FEATURE_USAGE_KEY)
  data[email] = usage
  saveCollectionByEmail(FEATURE_USAGE_KEY, data)
}

export const getChallengeDetail = (email) => {
  const detailByEmail = getCollectionByEmail(CHALLENGE_DETAIL_KEY)
  const rawDetail = detailByEmail[email] || {}

  return Object.fromEntries(
    Object.entries(rawDetail).map(([challengeId, value]) => [challengeId, normalizeChallengeDetailEntry(value)]),
  )
}

export const saveChallengeDetail = (email, detail) => {
  const detailByEmail = getCollectionByEmail(CHALLENGE_DETAIL_KEY)
  detailByEmail[email] = Object.fromEntries(
    Object.entries(detail).map(([challengeId, value]) => [challengeId, normalizeChallengeDetailEntry(value)]),
  )
  saveCollectionByEmail(CHALLENGE_DETAIL_KEY, detailByEmail)
}

export const getFeatureInteraction = (email) => {
  const interactionByEmail = getCollectionByEmail(FEATURE_INTERACTION_KEY)
  return interactionByEmail[email] || {}
}

export const saveFeatureInteraction = (email, interaction) => {
  const interactionByEmail = getCollectionByEmail(FEATURE_INTERACTION_KEY)
  interactionByEmail[email] = interaction
  saveCollectionByEmail(FEATURE_INTERACTION_KEY, interactionByEmail)
}

export const logUserActivity = ({ email, type, title, description, metadata = {} }) => {
  const activityByEmail = getCollectionByEmail(USER_ACTIVITY_KEY)
  const list = activityByEmail[email] || []

  list.unshift({
    id: crypto.randomUUID(),
    type,
    title,
    description,
    metadata,
    createdAt: toIsoNow(),
  })

  activityByEmail[email] = list.slice(0, 120)
  saveCollectionByEmail(USER_ACTIVITY_KEY, activityByEmail)
}

export const getUserActivities = (email) => {
  const activityByEmail = getCollectionByEmail(USER_ACTIVITY_KEY)
  return activityByEmail[email] || []
}

export const getAllUserActivities = () => {
  return getCollectionByEmail(USER_ACTIVITY_KEY)
}

export const getAllChallengeProgress = () => {
  return getCollectionByEmail(CHALLENGE_PROGRESS_KEY)
}

export const getAllFeatureUsage = () => {
  return getCollectionByEmail(FEATURE_USAGE_KEY)
}

export const getAllChallengeDetail = () => {
  return getCollectionByEmail(CHALLENGE_DETAIL_KEY)
}

export const getAllFeatureInteraction = () => {
  return getCollectionByEmail(FEATURE_INTERACTION_KEY)
}
