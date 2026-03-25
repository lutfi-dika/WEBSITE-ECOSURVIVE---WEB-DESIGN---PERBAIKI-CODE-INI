import { useEffect, useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'

const SplashScreen = () => {
  const [progress, setProgress] = useState(0)

  const particles = useMemo(
    () => [
      { left: '8%', duration: 7.2, delay: 0.2 },
      { left: '22%', duration: 8.4, delay: 1.4 },
      { left: '38%', duration: 6.8, delay: 0.8 },
      { left: '56%', duration: 7.7, delay: 1.9 },
      { left: '73%', duration: 8.8, delay: 0.5 },
      { left: '89%', duration: 6.9, delay: 1.1 },
    ],
    [],
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) return 100
        const increment = current < 45 ? 8 : current < 80 ? 6 : 4
        return Math.min(current + increment, 100)
      })
    }, 120)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#07111a]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-12%] h-[40%] w-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-8%] h-[36%] w-[36%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="absolute inset-0 opacity-30">
        {particles.map((particle, index) => (
          <Motion.div
            key={index}
            className="absolute h-1 w-1 rounded-full bg-emerald-300"
            style={{ left: particle.left }}
            initial={{ y: '100vh' }}
            animate={{ y: '-10vh' }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <Motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full border border-emerald-400/25 animate-ping" />
            <div className="grid h-16 w-16 place-items-center rounded-full border border-emerald-400/40 bg-slate-900/60 text-lg font-bold text-emerald-200 backdrop-blur-sm">
              ES
            </div>
          </div>
        </Motion.div>

        <Motion.h1
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'circOut' }}
          className="text-4xl font-black uppercase tracking-[0.12em] text-white sm:text-6xl"
        >
          Eco<span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Survive</span>
        </Motion.h1>

        <p className="mt-3 max-w-md text-sm text-slate-400">
          Menyiapkan dashboard aksi hijau, insight perilaku, dan visual dampak untuk pengalaman yang lebih halus.
        </p>

        <div className="mt-8 w-72 sm:w-96">
          <div className="mb-2 flex items-center justify-between px-1 text-[11px] uppercase tracking-[0.28em] text-emerald-300/75">
            <span>Memuat pengalaman</span>
            <span className="font-mono tracking-normal text-white/80">{progress}%</span>
          </div>

          <div className="overflow-hidden rounded-full border border-white/10 bg-white/5 p-[2px]">
            <Motion.div
              className="h-2 rounded-full bg-gradient-to-r from-emerald-500 via-lime-400 to-cyan-500 shadow-[0_0_18px_rgba(16,185,129,0.38)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', damping: 18, stiffness: 90 }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 h-1 w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
    </div>
  )
}

export default SplashScreen
