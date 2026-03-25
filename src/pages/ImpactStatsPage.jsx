import { useMemo } from 'react'
import { motion as Motion } from 'framer-motion'
import { impactChartData } from '../data/ecoContent'
import ChartCard from '../components/ChartCard'
import { hoverLift, revealUp, staggerContainer } from '../utils/animations'

const ImpactStatsPage = () => {
  const emissionTrendData = useMemo(
    () => ({
      labels: impactChartData.emissionTrend.labels,
      datasets: [
        {
          label: impactChartData.emissionTrend.label,
          data: impactChartData.emissionTrend.values,
          borderColor: '#0284c7',
          backgroundColor: 'rgba(2,132,199,0.2)',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointBackgroundColor: '#f97316',
        },
      ],
    }),
    [],
  )

  const actionCompositionData = useMemo(
    () => ({
      labels: impactChartData.actionComposition.labels,
      datasets: [
        {
          label: 'Kontribusi aksi',
          data: impactChartData.actionComposition.values,
          backgroundColor: ['#0ea5e9', '#22c55e', '#f97316', '#a855f7'],
          borderWidth: 0,
        },
      ],
    }),
    [],
  )

  const participationTrendData = useMemo(
    () => ({
      labels: impactChartData.participationTrend.labels,
      datasets: [
        {
          label: 'Partisipasi challenge',
          data: impactChartData.participationTrend.values,
          backgroundColor: '#fb923c',
          borderRadius: 8,
          maxBarThickness: 36,
        },
      ],
    }),
    [],
  )

  const axisOptions = useMemo(
    () => ({
      scales: {
        y: {
          grid: { color: 'rgba(148,163,184,0.2)' },
          ticks: { color: '#475569' },
        },
        x: {
          grid: { display: false },
          ticks: { color: '#475569' },
        },
      },
    }),
    [],
  )

  return (
    <Motion.section
      id="statistik"
      className="px-4 py-8 sm:px-6"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={staggerContainer(0.08, 0.03)}
    >
      <div className="mx-auto max-w-7xl">
        <Motion.div variants={revealUp} className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Statistik Dampak</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Data visual untuk membaca progres lingkungan secara cepat.
          </h2>
        </Motion.div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Motion.div variants={revealUp} whileHover={hoverLift}>
            <ChartCard
              title="Tren penurunan emisi rumah tangga"
              description="Semakin konsisten menjalankan aksi harian, emisi bulanan cenderung turun."
              type="line"
              data={emissionTrendData}
              options={axisOptions}
              height={290}
            />
          </Motion.div>

          <Motion.div variants={revealUp} whileHover={hoverLift}>
            <ChartCard
              title="Komposisi aksi yang paling berpengaruh"
              description="Transportasi dan energi rumah memberi dampak terbesar terhadap jejak karbon."
              type="doughnut"
              data={actionCompositionData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
              height={290}
            />
          </Motion.div>

          <Motion.div variants={revealUp} whileHover={hoverLift} className="xl:col-span-2">
            <ChartCard
              title="Kenaikan partisipasi challenge bulanan"
              description="Visual ini menunjukkan peningkatan jumlah pengguna yang aktif menyelesaikan challenge."
              type="bar"
              data={participationTrendData}
              options={axisOptions}
              height={250}
            />
          </Motion.div>
        </div>
      </div>
    </Motion.section>
  )
}

export default ImpactStatsPage
