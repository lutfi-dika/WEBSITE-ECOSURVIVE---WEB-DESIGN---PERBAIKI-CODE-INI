export const featureList = [
  {
    id: 'eco-score',
    title: 'Eco Score Calculator',
    description:
      'Hitung kualitas kebiasaan ramah lingkunganmu dari aktivitas harian, lalu lihat area yang paling cepat untuk ditingkatkan.',
    metric: 'Skor personal harian',
    accent: 'from-cyan-500 to-sky-500',
  },
  {
    id: 'pollution-analyzer',
    title: 'Air Quality Insight',
    description:
      'Bantu pengguna membaca risiko polusi udara di sekitar mereka agar keputusan beraktivitas terasa lebih aman dan relevan.',
    metric: 'Pembaruan ringkas',
    accent: 'from-orange-500 to-amber-500',
  },
  {
    id: 'daily-action-log',
    title: 'Daily Action Log',
    description:
      'Catat aksi kecil seperti membawa botol minum, berjalan kaki, atau mengurangi listrik untuk membangun konsistensi yang nyata.',
    metric: 'Riwayat kebiasaan',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'home-insight',
    title: 'Healthy Home Insight',
    description:
      'Berikan gambaran cepat tentang pola konsumsi energi, kebersihan ruang, dan potensi pemborosan yang sering tidak terlihat.',
    metric: 'Insight rumah tangga',
    accent: 'from-fuchsia-500 to-violet-500',
  },
]

export const challengeList = [
  {
    id: 'plastic-free-week',
    title: 'Zero Plastic Starter',
    description: 'Kurangi plastik sekali pakai selama 7 hari untuk membangun kebiasaan awal yang mudah diikuti.',
    level: 'Beginner',
    duration: '7 hari',
    impact: 'Mengurangi sampah rumah tangga dan membentuk keputusan konsumsi yang lebih sadar.',
    detail:
      'Gunakan tas belanja sendiri, botol minum isi ulang, dan tolak sedotan plastik ketika membeli makanan atau minuman.',
  },
  {
    id: 'green-steps',
    title: 'Green Steps Commute',
    description: 'Naikkan jumlah langkah harian dan kurangi perjalanan jarak dekat dengan kendaraan pribadi.',
    level: 'Healthy',
    duration: '7 hari',
    impact: 'Menjaga kebugaran tubuh sambil menekan emisi dari mobilitas harian.',
    detail:
      'Targetkan 5.000 langkah per hari, pilih berjalan kaki untuk jarak dekat, dan gunakan tangga bila memungkinkan.',
  },
  {
    id: 'smart-energy-saving',
    title: 'Smart Energy Reset',
    description: 'Latih kebiasaan hemat energi di rumah dengan aksi yang sederhana namun konsisten.',
    level: 'Intermediate',
    duration: '14 hari',
    impact: 'Mendorong penurunan konsumsi listrik dan menciptakan rutinitas rumah tangga yang lebih efisien.',
    detail:
      'Matikan lampu di ruang kosong, cabut charger yang tidak dipakai, dan manfaatkan cahaya alami di siang hari.',
  },
  {
    id: 'hydration-refill',
    title: 'Refill and Reuse',
    description: 'Tetap terhidrasi tanpa bergantung pada botol plastik sekali pakai.',
    level: 'Wellness',
    duration: '10 hari',
    impact: 'Meningkatkan kesehatan pribadi sekaligus menekan sampah kemasan harian.',
    detail:
      'Bawa botol minum sendiri setiap hari, isi ulang sebelum berangkat, dan buat target konsumsi air yang konsisten.',
  },
  {
    id: 'low-emission-transport',
    title: 'Low Emission Route',
    description: 'Ganti sebagian perjalanan dengan sepeda, jalan kaki, atau transportasi publik.',
    level: 'Impact',
    duration: '14 hari',
    impact: 'Menurunkan jejak karbon mobilitas harian dan memberi alternatif perjalanan yang lebih sehat.',
    detail:
      'Gunakan moda transportasi rendah emisi minimal empat kali seminggu dan catat perubahan kenyamanan perjalananmu.',
  },
  {
    id: 'home-compost',
    title: 'Home Compost Habit',
    description: 'Pisahkan limbah organik dan mulai membangun kebiasaan kompos skala rumah tangga.',
    level: 'Impact',
    duration: '21 hari',
    impact: 'Mengurangi beban sampah organik ke TPA dan membangun ekosistem rumah yang lebih berkelanjutan.',
    detail:
      'Siapkan wadah kompos sederhana, pisahkan sisa sayur dan buah, lalu evaluasi hasilnya setiap akhir pekan.',
  },
]

export const impactChartData = {
  emissionTrend: {
    label: 'Rata-rata emisi rumah tangga (kg CO2e)',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    values: [124, 119, 112, 105, 97, 91],
  },
  actionComposition: {
    labels: ['Transportasi', 'Energi Rumah', 'Sampah', 'Air'],
    values: [34, 27, 23, 16],
  },
  participationTrend: {
    labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
    values: [210, 265, 319, 402],
  },
}

export const faqList = [
  {
    id: 'faq-1',
    question: 'Apakah data pengguna aman?',
    answer:
      'Untuk versi demo lomba ini, data disimpan secara lokal di browser agar pengalaman tetap cepat dan mandiri tanpa backend.',
  },
  {
    id: 'faq-2',
    question: 'Bagaimana cara mengikuti challenge?',
    answer:
      'Pengguna bisa login, memilih challenge yang menarik, lalu memantau progres penyelesaiannya langsung dari dashboard pribadi.',
  },
  {
    id: 'faq-3',
    question: 'Apa yang membuat EcoSurvive berbeda?',
    answer:
      'EcoSurvive menggabungkan edukasi, tracking perilaku, dan visualisasi progres ke dalam pengalaman yang ringan dan mudah dipahami.',
  },
  {
    id: 'faq-4',
    question: 'Apakah admin dapat mengubah konten demo?',
    answer:
      'Ya. Admin dapat mengelola daftar fitur dan challenge secara lokal untuk kebutuhan presentasi dan simulasi produk.',
  },
]
