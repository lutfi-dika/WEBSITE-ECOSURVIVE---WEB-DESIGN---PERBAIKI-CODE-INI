import { 
  challengeList as defaultChallenges, 
  faqList as defaultFaq, 
  featureList as defaultFeatures 
} from '../data/ecoContent'

const MANAGED_CONTENT_KEY = 'ecosurvive_managed_content'

// Helper untuk deep clone agar tidak merusak data asli
const cloneDeep = (value) => JSON.parse(JSON.stringify(value))

const createDefaultContent = () => ({
  featureList: cloneDeep(defaultFeatures),
  challengeList: cloneDeep(defaultChallenges),
  faqList: cloneDeep(defaultFaq),
  updatedAt: null,
})

const parseJson = (value, fallback) => {
  if (!value) return fallback
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

/**
 * NORMALIZE CONTENT
 * Fungsi ini memastikan bahwa setiap item (seperti challenge) 
 * memiliki properti yang dibutuhkan oleh Pop-up UI.
 */
const normalizeContent = (content) => {
  const defaults = createDefaultContent()

  return {
    featureList: Array.isArray(content?.featureList) && content.featureList.length > 0
      ? content.featureList
      : defaults.featureList,
    
    // Pastikan challengeList punya field: title, description, detail, impact untuk Pop-up
    challengeList: Array.isArray(content?.challengeList) && content.challengeList.length > 0
      ? content.challengeList
      : defaults.challengeList,
      
    faqList: Array.isArray(content?.faqList) && content.faqList.length > 0
      ? content.faqList
      : defaults.faqList,
    updatedAt: content?.updatedAt ?? defaults.updatedAt,
  }
}

export const getDefaultContent = () => createDefaultContent()

export const getManagedContent = () => {
  // Cegah error saat SSR (Server Side Rendering)
  if (typeof window === 'undefined') return createDefaultContent()

  const storedContent = parseJson(localStorage.getItem(MANAGED_CONTENT_KEY), null)

  if (!storedContent) {
    const defaults = createDefaultContent()
    localStorage.setItem(MANAGED_CONTENT_KEY, JSON.stringify(defaults))
    return defaults
  }

  const normalized = normalizeContent(storedContent)

  // Sinkronisasi ulang jika struktur data berubah
  if (JSON.stringify(storedContent) !== JSON.stringify(normalized)) {
    localStorage.setItem(MANAGED_CONTENT_KEY, JSON.stringify(normalized))
  }

  return normalized
}

export const saveManagedContent = (content) => {
  const normalized = normalizeContent(content)
  const nextContent = {
    ...normalized,
    updatedAt: new Date().toISOString(),
  }

  localStorage.setItem(MANAGED_CONTENT_KEY, JSON.stringify(nextContent))
  
  // Custom Event agar UI tahu data berubah (opsional, berguna untuk update otomatis)
  window.dispatchEvent(new Event('contentUpdate'))
  
  return nextContent
}

export const resetManagedContent = () => {
  const defaults = createDefaultContent()
  localStorage.setItem(MANAGED_CONTENT_KEY, JSON.stringify(defaults))
  window.dispatchEvent(new Event('contentUpdate'))
  return defaults
}
