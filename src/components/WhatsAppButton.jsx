import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'
import { hoverLift, tapPress } from '../utils/animations'

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('Halo tim EcoSurvive, saya ingin bertanya tentang program challenge.')

  const sendMessage = (event) => {
    event.preventDefault()

    const phoneNumber = '6281295431853'
    const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    window.open(link, '_blank')
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/20"
          >
            <div className="mb-3">
              <p className="font-semibold text-slate-900">Hubungi Tim EcoSurvive</p>
              <p className="text-sm text-slate-500">Kirim pertanyaanmu langsung lewat WhatsApp.</p>
            </div>
            <form className="space-y-3" onSubmit={sendMessage}>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tulis pesan di sini..."
                required
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
              <Motion.button
                type="submit"
                whileHover={hoverLift}
                whileTap={tapPress}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:from-cyan-700 hover:to-blue-700"
              >
                <Send size={15} />
                Kirim ke WhatsApp
              </Motion.button>
            </form>
          </Motion.div>
        )}
      </AnimatePresence>

      <Motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Buka chat WhatsApp"
        whileHover={hoverLift}
        whileTap={tapPress}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-600 text-white shadow-xl shadow-cyan-900/30 transition hover:from-emerald-600 hover:to-cyan-700"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </Motion.button>
    </div>
  )
}

export default WhatsAppButton
