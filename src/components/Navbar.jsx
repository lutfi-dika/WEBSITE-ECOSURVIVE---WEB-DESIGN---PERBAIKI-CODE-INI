import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Clock3, Leaf, LogIn, LogOut, Menu, ShieldCheck, UserRound, X } from 'lucide-react'
import { hoverLift, tapPress } from '../utils/animations'

const landingLinks = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang Kami' },
  { id: 'fitur', label: 'Fitur' },
  { id: 'statistik', label: 'Statistik' },
  { id: 'tantangan', label: 'Tantangan' },
  { id: 'faq', label: 'FAQ' },
]

const Navbar = ({
  page,
  user,
  onGoHome,
  onOpenAuth,
  onOpenUserDashboard,
  onOpenAdminDashboard,
  onNavigateSection,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [clock, setClock] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      )
    }

    updateClock()

    const timer = setInterval(updateClock, 1000)
    const onScroll = () => setScrolled(window.scrollY > 18)

    window.addEventListener('scroll', onScroll)

    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const isLanding = page === 'beranda'
  const isDashboard = page === 'user-dashboard' || page === 'admin-dashboard'
  const isLoggedIn = Boolean(user)
  const isAdmin = user?.role === 'admin'

  const displayName = useMemo(() => {
    if (!user?.name) return ''
    return user.name.split(' ')[0]
  }, [user])

  const handleSectionClick = (sectionId) => {
    onNavigateSection(sectionId)
    setMobileMenuOpen(false)
  }

  return (
    <Motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isDashboard && 'lg:left-[320px]',
        isDashboard ? 'px-0 pt-0' : scrolled ? 'px-2 pt-2 sm:px-4' : 'px-0 pt-0',
      )}
    >
      <div
        className={clsx(
          'border border-transparent bg-white/80 backdrop-blur-xl transition-all duration-300',
          isDashboard ? 'mx-0 max-w-none rounded-none border-b border-slate-200/80' : 'mx-auto max-w-7xl',
          scrolled && !isDashboard && 'rounded-2xl border-cyan-100 shadow-xl shadow-slate-900/10',
        )}
      >
        <div className="flex h-20 items-center justify-between px-4 sm:px-6">
          <button
            className="flex items-center gap-3 text-left"
            type="button"
            onClick={onGoHome}
            aria-label="Buka beranda"
          >
            <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-2.5 text-white shadow-lg shadow-cyan-500/25">
              <Leaf size={18} />
            </div>
            <div>
              <p className="font-heading text-xs font-semibold tracking-[0.32em] text-slate-500">ECO PLATFORM</p>
              <p className="font-heading text-lg font-semibold text-slate-900">EcoSurvive</p>
            </div>
          </button>

          <div className="hidden items-center gap-7 lg:flex">
            {isLanding && !isLoggedIn && (
              <nav className="flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1">
                {landingLinks.map((link) => (
                  <Motion.button
                    key={link.id}
                    type="button"
                    onClick={() => handleSectionClick(link.id)}
                    whileHover={hoverLift}
                    whileTap={tapPress}
                    className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    {link.label}
                  </Motion.button>
                ))}
              </nav>
            )}

            <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600 xl:flex">
              <Clock3 size={16} />
              <span className="font-medium tabular-nums">{clock}</span>
            </div>

            {!isLoggedIn ? (
              <Motion.button
                type="button"
                onClick={onOpenAuth}
                whileHover={hoverLift}
                whileTap={tapPress}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:from-cyan-700 hover:to-blue-700"
              >
                <LogIn size={16} />
                Login / Daftar
              </Motion.button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                  {isAdmin ? 'Admin workspace' : 'User workspace'}
                </div>
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  Halo, {displayName}
                </div>
                <Motion.button
                  type="button"
                  onClick={isAdmin ? onOpenAdminDashboard : onOpenUserDashboard}
                  whileHover={hoverLift}
                  whileTap={tapPress}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {isAdmin ? <ShieldCheck size={16} /> : <UserRound size={16} />}
                  {isAdmin ? 'Control Center' : 'Mission Control'}
                </Motion.button>
                <Motion.button
                  type="button"
                  onClick={onLogout}
                  whileHover={hoverLift}
                  whileTap={tapPress}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <LogOut size={16} />
                  Keluar
                </Motion.button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-3 mt-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 lg:hidden"
          >
            <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2">
                <Clock3 size={14} />
                Waktu sekarang
              </span>
              <span className="font-semibold tabular-nums">{clock}</span>
            </div>

            {isLanding && !isLoggedIn && (
              <div className="mb-4 grid gap-2">
                {landingLinks.map((link) => (
                  <Motion.button
                    key={link.id}
                    type="button"
                    onClick={() => handleSectionClick(link.id)}
                    whileTap={tapPress}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-left text-sm font-semibold text-slate-700"
                  >
                    {link.label}
                  </Motion.button>
                ))}
              </div>
            )}

            {!isLoggedIn ? (
              <Motion.button
                type="button"
                onClick={() => {
                  onOpenAuth()
                  setMobileMenuOpen(false)
                }}
                whileTap={tapPress}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                <LogIn size={16} />
                Login / Daftar
              </Motion.button>
            ) : (
              <div className="grid gap-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {isAdmin ? 'Admin workspace aktif' : 'User workspace aktif'}
                </div>
                <Motion.button
                  type="button"
                  onClick={() => {
                    if (isAdmin) onOpenAdminDashboard()
                    else onOpenUserDashboard()
                    setMobileMenuOpen(false)
                  }}
                  whileTap={tapPress}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
                >
                  {isAdmin ? <ShieldCheck size={16} /> : <UserRound size={16} />}
                  {isAdmin ? 'Control Center' : 'Mission Control'}
                </Motion.button>
                <Motion.button
                  type="button"
                  onClick={() => {
                    onLogout()
                    setMobileMenuOpen(false)
                  }}
                  whileTap={tapPress}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <LogOut size={16} />
                  Keluar
                </Motion.button>
              </div>
            )}
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.header>
  )
}

export default Navbar
