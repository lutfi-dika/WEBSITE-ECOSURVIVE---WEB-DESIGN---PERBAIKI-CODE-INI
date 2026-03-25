# EcoSurvive

EcoSurvive adalah aplikasi frontend React + Vite bertema sustainability yang menampilkan landing page, autentikasi lokal, dashboard user, dan admin control center. Versi ini sudah diperluas untuk kebutuhan presentasi lomba dengan fokus pada experience design, storytelling, dan komponen dashboard yang lebih memorable.

## Highlight Fitur

- Landing page, auth lokal, user workspace, dan admin control center dalam satu alur demo.
- `Scenario-Based Experience` untuk mode `Mahasiswa`, `Pekerja Kantoran`, dan `Keluarga`.
- `Personal Impact Card`, `Impact Meter Hero`, dan `Before vs After Impact View`.
- `Weekly Mission Generator`, `Smart Recommendation Panel`, dan `Achievement Showcase`.
- `Eco Journey Timeline`, `Community Leaderboard`, dan `Presentation Stepper`.
- `Command Palette`, `Spotlight Drawer`, `Floating Insight Widget`, dan `Presentation Mode`.
- `Admin Insight Simulator` serta `Content Lab` dengan preview yang lebih nyata.

## Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Framer Motion
- Lucide React
- LocalStorage untuk data demo

## Struktur Penting

- `src/App.jsx`: router sederhana berbasis state untuk landing, auth, user, dan admin.
- `src/dashboard/UserDashboard.jsx`: pusat state user dashboard, mission generator, badges, timeline, command palette, presentation mode.
- `src/dashboard/AdminControlCenter.jsx`: pusat state admin dashboard, insight simulator, leaderboard, command palette, presentation mode.
- `src/utils/storage.js`: penyimpanan user, session, challenge, feature usage, dan activity log di localStorage.
- `src/utils/contentManager.js`: content manager lokal untuk fitur, challenge, dan FAQ.
- `src/utils/dashboardInsights.js`: generator misi, badge, recommendation, impact card, timeline, leaderboard, dan simulator insight.

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Akun Demo

- Admin
  - Email: `admin@ecosurvive.id`
  - Password: `admin123`

User biasa bisa dibuat langsung lewat form registrasi.

## Catatan Implementasi

- Semua data demo disimpan lokal di browser menggunakan `localStorage`.
- Dashboard user dan admin dirancang untuk tetap dapat dipresentasikan tanpa backend.
- `Ctrl/Cmd + K` membuka command palette pada dashboard.
- `Shift + P` mengaktifkan atau menonaktifkan presentation mode.
- Flow lomba yang disarankan:
  - Admin: `Overview -> Users -> Content Preview`
  - User: `Overview -> Challenge Hub -> Profile Studio`

## Checklist Perubahan dari `analisis.md`

- Selesai: Eco Journey Timeline
- Selesai: Personal Impact Card
- Selesai: Weekly Mission Generator
- Selesai: Achievement / Badge System visual
- Selesai: Before vs After Impact View
- Selesai: Smart Recommendation Panel
- Selesai: Leaderboard / Community Snapshot
- Selesai: Scenario Mode
- Selesai: Hero Impact Meter
- Selesai: Interactive Command Palette
- Selesai: Story Card Carousel
- Selesai: Empty State Premium
- Selesai: Spotlight Drawer / Slide Panel
- Selesai: Floating Insight Widget
- Selesai: Presentation Toggle / Presentation Mode
- Selesai: Animated Section Header
- Selesai: Admin Insight Simulator

# Link WEBSITE ECOSURVIVE - WEB DESIGN - PERBAIKI CODE INI

https://ecosurvive.netlify.app/