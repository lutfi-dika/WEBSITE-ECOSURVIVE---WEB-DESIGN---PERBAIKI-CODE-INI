import { useState, useEffect } from 'react' // Tambahkan useEffect
import { AnimatePresence, motion as Motion } from 'framer-motion'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'
import ChallengeShowcase from './components/ChallengeShowcase'
import AuthForm from './components/AuthForm'
import UserDashboard from './dashboard/UserDashboard'
import AdminControlCenter from './dashboard/AdminControlCenter'
import HomePage from './pages/HomePage'
import FaqPage from './pages/FaqPage'
import ImpactStatsPage from './pages/ImpactStatsPage'
import AboutPage from './pages/AboutPage'
import { getSession, clearSession, saveSession } from './utils/storage'
import { pageTransition } from './utils/animations'

const PAGE_HOME = 'beranda'
const PAGE_AUTH = 'auth'
const PAGE_USER_DASHBOARD = 'user-dashboard'
const PAGE_ADMIN_DASHBOARD = 'admin-dashboard'
const dashboardPages = [PAGE_USER_DASHBOARD, PAGE_ADMIN_DASHBOARD]

const getInitialPage = (user) => {
  if (!user) return PAGE_HOME
  return user.role === 'admin' ? PAGE_ADMIN_DASHBOARD : PAGE_USER_DASHBOARD
}

function App() {
  const [currentUser, setCurrentUser] = useState(() => getSession())
  const [page, setPage] = useState(() => getInitialPage(getSession()))

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 900)
    return () => clearTimeout(timer)
  }, [])

  const navigateHomeSection = (sectionId) => {
    if (page !== PAGE_HOME) {
      setPage(PAGE_HOME)
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
      return
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleAuthSuccess = (user) => {
    saveSession(user)
    setCurrentUser(user)
    setPage(getInitialPage(user))
  }

  const handleLogout = () => {
    clearSession()
    setCurrentUser(null)
    setPage(PAGE_HOME)
  }

  if (isLoading) {
    return <SplashScreen />
  }

  const isDashboardPage = dashboardPages.includes(page)

  const renderActivePage = () => {
    // Menggunakan Switch Case agar lebih bersih
    switch (page) {
      case PAGE_AUTH:
        return (
          <Motion.div key={PAGE_AUTH} {...pageTransition}>
            <AuthForm onBack={() => setPage(PAGE_HOME)} onAuthSuccess={handleAuthSuccess} />
          </Motion.div>
        )
      case PAGE_USER_DASHBOARD:
        return currentUser && (
          <Motion.div key={PAGE_USER_DASHBOARD} {...pageTransition}>
            <UserDashboard user={currentUser} onLogout={handleLogout} />
          </Motion.div>
        )
      case PAGE_ADMIN_DASHBOARD:
        return currentUser?.role === 'admin' && (
          <Motion.div key={PAGE_ADMIN_DASHBOARD} {...pageTransition}>
            <AdminControlCenter onLogout={handleLogout} />
          </Motion.div>
        )
      default:
        return (
          <Motion.div key={PAGE_HOME} {...pageTransition}>
            <HomePage
              onExploreFeatures={() => navigateHomeSection('fitur')}
              onExploreChallenges={() => navigateHomeSection('tantangan')}
              onStartNow={() => setPage(PAGE_AUTH)}
            />
            <AboutPage />
            <FeaturesSection />
            <ImpactStatsPage />
            <ChallengeShowcase onPrimaryAction={() => setPage(PAGE_AUTH)} />
            <FaqPage />
            <Footer />
          </Motion.div>
        )
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-50">
      <Navbar
        page={page}
        user={currentUser}
        onGoHome={() => setPage(PAGE_HOME)}
        onOpenAuth={() => setPage(PAGE_AUTH)}
        onOpenUserDashboard={() => setPage(PAGE_USER_DASHBOARD)}
        onOpenAdminDashboard={() => setPage(PAGE_ADMIN_DASHBOARD)}
        onNavigateSection={navigateHomeSection}
        onLogout={handleLogout}
      />

      <main className={isDashboardPage ? 'pt-20 lg:pt-0' : 'pt-20'}>
        <AnimatePresence mode="wait">
          {renderActivePage()}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
