let chartPromise = null

export const loadChart = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Chart.js hanya tersedia di browser'))
  }

  if (window.Chart) {
    return Promise.resolve(window.Chart)
  }

  if (chartPromise) {
    return chartPromise
  }

  chartPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById('chartjs-cdn')

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.Chart))
      existingScript.addEventListener('error', () => reject(new Error('Gagal memuat Chart.js')))
      return
    }

    const script = document.createElement('script')
    script.id = 'chartjs-cdn'
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js'
    script.async = true
    script.onload = () => resolve(window.Chart)
    script.onerror = () => reject(new Error('Gagal memuat Chart.js'))
    document.head.appendChild(script)
  })

  return chartPromise
}
