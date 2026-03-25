import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, KeyRound, Mail } from 'lucide-react'
import { loginUser } from '../utils/storage'
import { hoverLift, revealScale, revealUp, staggerContainer, tapPress } from '../utils/animations'

const defaultForm = {
  name: '',
  email: '',
  password: '',
}

const AuthForm = ({ onBack, onAuthSuccess }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const title = useMemo(
    () => 'Masuk ke EcoSurvive',
    [],
  )

  const subtitle = useMemo(
    () =>
      'Login demo dipusatkan untuk mempercepat alur presentasi juri ke workspace user atau admin.',
    [],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(defaultForm)
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    if (form.password.length < 6) {
      setError('Kata sandi minimal 6 karakter.')
      setIsSubmitting(false)
      return
    }

    const result = loginUser({ email: form.email, password: form.password })

    if (!result.ok) {
      setError(result.message)
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    resetForm()
    onAuthSuccess(result.user)
  }

  return (
    <section className="px-4 pb-16 pt-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.08, 0.03)}
          className="kartu-lembut relative overflow-hidden border border-slate-200/80 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.96))] p-6 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.8)] sm:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-200/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-orange-200/50 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-2">
            <Motion.div variants={revealUp}>
              <Motion.button
                type="button"
                onClick={onBack}
                whileHover={hoverLift}
                whileTap={tapPress}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <ArrowLeft size={16} />
                Kembali ke beranda
              </Motion.button>

              <p className="mb-3 inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                Auth Gateway
              </p>
              <h1 className="mb-3 text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h1>
              <p className="max-w-xl text-slate-600">{subtitle}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-slate-200 bg-white/85 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">2 Role</p>
                  <p className="mt-1 text-sm text-slate-600">Admin control center dan user mission control.</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white/85 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Interaction</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">Live Demo</p>
                  <p className="mt-1 text-sm text-slate-600">Progress, feed, chart, dan content preview aktif.</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white/85 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Storyline</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">Competition Ready</p>
                  <p className="mt-1 text-sm text-slate-600">Dirancang untuk alur presentasi yang cepat dipahami juri.</p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 text-sm text-slate-600">
                <p className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                  Data akun tersimpan di local storage browser agar sesi tetap aktif saat halaman dimuat ulang.
                </p>
                <p className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                  Akun admin demo: <span className="font-semibold">admin@ecosurvive.id</span> dengan kata sandi
                  <span className="font-semibold"> admin123</span>.
                </p>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-900 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Jury demo path</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Step 1</p>
                    <p className="mt-2 font-semibold">Login admin</p>
                    <p className="mt-1 text-sm text-slate-300">Buka control center dan content lab.</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Step 2</p>
                    <p className="mt-2 font-semibold">Login user</p>
                    <p className="mt-1 text-sm text-slate-300">Tunjukkan feature lab dan challenge flow.</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Step 3</p>
                    <p className="mt-2 font-semibold">Show activity</p>
                    <p className="mt-1 text-sm text-slate-300">Tutup dengan bukti interaksi yang terekam.</p>
                  </div>
                </div>
              </div>
            </Motion.div>

            <Motion.div variants={revealScale} className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-8">
              <div className="mb-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Akses cepat demo</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ name: '', email: 'admin@ecosurvive.id', password: 'admin123' })
                      setError('')
                    }}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-cyan-300 hover:bg-cyan-50"
                  >
                    <p className="text-sm font-semibold text-slate-900">Isi akun admin demo</p>
                    <p className="mt-1 text-xs text-slate-500">Masuk cepat ke admin control center.</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ name: '', email: 'user@ecosurvive.id', password: 'user123' })
                      setError('')
                    }}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    <p className="text-sm font-semibold text-slate-900">Isi akun user demo</p>
                    <p className="mt-1 text-xs text-slate-500">Masuk cepat ke mission control user.</p>
                  </button>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Email</span>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-10 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Kata sandi</span>
                  <div className="relative">
                    <KeyRound
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Minimal 6 karakter"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-10 py-3 pr-11 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                    <Motion.button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      whileTap={tapPress}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      aria-label="Tampilkan kata sandi"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </Motion.button>
                  </div>
                </label>

                {error && (
                  <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
                    {error}
                  </p>
                )}

                <Motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={hoverLift}
                  whileTap={tapPress}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-cyan-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? 'Memproses...'
                    : 'Masuk sekarang'}
                </Motion.button>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  Masuk sebagai admin untuk presentasi pengelolaan sistem, atau gunakan akun user demo untuk menunjukkan interaksi personal.
                </div>

                <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Alur presentasi lomba</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Admin demo</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">Overview → Users → Content Preview</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">User demo</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">Overview → Challenge Hub → Profile Studio</p>
                    </div>
                  </div>
                </div>
              </form>
            </Motion.div>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}

export default AuthForm
