/**
 * ECO SURVIVE - Content Managed Data
 * Berisi daftar fitur, tantangan (dengan kalimat persuasif), data grafik, dan FAQ.
 */

export const featureList = [
  {
    id: 'eco-score',
    title: 'Eco Score Calculator 🧮',
    description:
      'Cek seberapa "hijau" hidupmu hari ini. Hitung jejak karbon dari konsumsi harian dan dapatkan skor real-time untuk perbaikan kualitas hidup.',
    metric: 'Akurasi penilaian 96%',
    accent: 'from-cyan-500 to-sky-500',
  },
  {
    id: 'pollution-analyzer',
    title: 'Pollution Risk Analyzer 💨',
    description:
      'Jangan biarkan polusi udara merusak harimu. Pantau kualitas udara di sekitarmu agar aktivitas luar ruangan tetap aman dan sehat.',
    metric: 'Pembaruan setiap 5 menit',
    accent: 'from-orange-500 to-amber-500',
  },
  {
    id: 'daily-action-log',
    title: 'Daily Action Log 📝',
    description:
      'Catat setiap aksi kecilmu—seperti bawa tumblr atau naik sepeda. Lihat bagaimana konsistensimu berubah menjadi dampak besar bagi bumi.',
    metric: 'Pelacakan 30 hari',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'home-insight',
    title: 'Healthy Home Insight 🏠',
    description:
      'Rumahmu mungkin menyimpan risiko tersembunyi. Deteksi mikroplastik, debu halus, dan pemborosan energi dengan indikator cerdas.',
    metric: '12 indikator utama',
    accent: 'from-fuchsia-500 to-violet-500',
  },
];

export const challengeList = [
  {
    id: 'plastic-free-week',
    title: 'War on Plastic! 🛡️',
    description: 'Tantang dirimu hidup tanpa plastik sekali pakai selama 7 hari penuh.',
    level: 'Beginner',
    duration: '7 hari',
    impact: 'Mencegah ±2kg sampah plastik berakhir di lautan.',
    detail:
      'Wajib membawa tas belanja sendiri, gunakan botol minum pakai ulang, dan tolak sedotan plastik saat jajan di luar.',
  },
  {
    id: 'green-steps',
    title: 'Misi Kaki Carbon-Free 👣',
    description: 'Jadikan setiap langkahmu napas bagi bumi. Capai target 5.000 langkah harian.',
    level: 'Healthy',
    duration: '7 hari',
    impact: 'Meningkatkan kebugaran jantung & menekan emisi kendaraan.',
    detail:
      'Pilih berjalan kaki untuk jarak di bawah 1km. Gunakan tangga daripada lift untuk membakar kalori tanpa listrik!',
  },
  {
    id: 'smart-energy-saving',
    title: 'Hemat Energi Cerdas ⚡',
    description: 'Matikan yang tidak perlu. Jadilah master efisiensi listrik di rumahmu.',
    level: 'Intermediate',
    duration: '14 hari',
    impact: 'Potensi hemat tagihan listrik hingga 15% per bulan.',
    detail:
      'Cabut charger saat tidak dipakai, matikan lampu di ruangan kosong, dan manfaatkan cahaya matahari di siang hari.',
  },
  {
    id: 'hydration-refill',
    title: 'Hidrasi Tanpa Sampah 💧',
    description: 'Tetap segar dan sehat tanpa meninggalkan jejak botol plastik di jalanan.',
    level: 'Wellness',
    duration: '10 hari',
    impact: 'Tubuh lebih sehat dengan asupan air 2L/hari tanpa sampah.',
    detail:
      'Isi penuh botol minummu sebelum berangkat. Targetkan minum minimal 8 gelas sehari dan catat di log harian.',
  },
  {
    id: 'low-emission-transport',
    title: 'Eco-Commuter Hero 🚲',
    description: 'Kurangi polusi, mulai gunakan transportasi publik atau sepeda ke tempat kerja.',
    level: 'Impact',
    duration: '14 hari',
    impact: 'Mengurangi emisi karbon harian secara signifikan.',
    detail:
      'Gunakan bus, kereta, atau sepeda minimal 4 kali seminggu. Rasakan sensasi bepergian tanpa macet yang bikin stres.',
  },
  {
    id: 'home-compost',
    title: 'Ubah Sampah Jadi Berkah 🌱',
    description: 'Pisahkan sisa dapur dan buat pupuk organik buatanmu sendiri.',
    level: 'Impact',
    duration: '21 hari',
    impact: 'Mengurangi beban TPA hingga 40% dari limbah rumah tangga.',
    detail:
      'Siapkan wadah komposter sederhana. Pisahkan sisa sayur/buah dari sampah anorganik. Pantau prosesnya setiap akhir pekan.',
  },
];

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
};

export const faqList = [
  {
    id: 'faq-1',
    question: 'Seberapa aman data aksi harian saya? 🔒',
    answer:
      'Keamananmu prioritas kami. Untuk versi demo ini, data disimpan secara lokal di perangkatmu. Kami sarankan tidak menggunakan info sensitif.',
  },
  {
    id: 'faq-2',
    question: 'Gimana cara klaim hadiah setelah tantangan? 🎁',
    answer:
      'Setelah status tantangan berubah menjadi "Completed" di Dashboard, kamu akan mendapatkan badge Eco-Warrior yang bisa dipamerkan di profil.',
  },
  {
    id: 'faq-3',
    question: 'Boleh jadi admin buat coba fitur grafik? 🛠️',
    answer:
      'Tentu! Silakan login dengan email: admin@ecosurvive.id dan password: admin123 untuk akses kontrol penuh.',
  },
  {
    id: 'faq-4',
    question: 'Mengapa visualisasi data itu penting? 📊',
    answer:
      'Melihat angka emisi yang turun secara visual jauh lebih memotivasi daripada sekadar membaca teks. Kami bantu kamu melihat perubahan nyatamu.',
  },
];

/**
 * Helper function untuk mengambil data (opsional jika dibutuhkan di utils)
 */
export const getManagedContent = () => ({
  featureList,
  challengeList,
  impactChartData,
  faqList,
});