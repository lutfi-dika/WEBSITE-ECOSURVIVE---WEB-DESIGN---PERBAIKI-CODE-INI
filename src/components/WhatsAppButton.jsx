import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'
import { hoverLift, tapPress } from '../utils/animations'

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('Halo tim EcoSurvive, saya ingin bertanya tentang program challenge.')

  const sendMessage = (event) => {
    event.preventDefault()

    // FIX: Format nomor WA harus angka saja tanpa '+', '-', atau spasi
    const phoneNumber = '6281295431853'
    const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    window.open(link, '_blank')
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50"> {/* Naikkan z-index ke 50 */}
      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, originX: '90%', originY: 'bottom' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="mb-4 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20"
          >
            {/* Header Modal - Biar makin cantik */}
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-600 p-4 text-white">
              <p className="font-bold">Hubungi Tim EcoSurvive</p>
              <p className="text-[12px] opacity-90">Biasanya membalas dalam beberapa menit</p>
            </div>

            <form className="p-4 space-y-3" onSubmit={sendMessage}>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tulis pesan di sini..."
                required
                rows={3}
                className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
              />
              <Motion.button
                type="submit"
                whileHover={hoverLift}
                whileTap={tapPress}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Send size={15} />
                Kirim via WhatsApp
              </Motion.button>
            </form>
          </Motion.div>
        )}
      </AnimatePresence>

      <Motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Buka chat WhatsApp"
        whileHover={hoverLift}
        whileTap={tapPress}
        // Animasi floating hanya jalan kalau 'open' adalah false
        animate={!open ? { y: [0, -6, 0] } : { y: 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className={`inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 ${open
            ? 'bg-slate-800 rotate-90'
            : 'bg-gradient-to-r from-emerald-500 to-cyan-600 shadow-emerald-500/30'
          }`}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </Motion.button>
    </div>
  )
}

export default WhatsAppButton